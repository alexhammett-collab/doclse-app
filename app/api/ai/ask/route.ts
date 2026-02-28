import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { searchKB, type KBEntry } from "@/lib/ducati-kb";

/* ─── OpenAI client (lazy init to avoid build-time error) ─────────── */
let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
  }
  return _openai;
}

/* ─── Web search via Google Custom Search JSON API ────────────────── */
interface WebResult {
  title: string;
  snippet: string;
  link: string;
}

async function webSearch(query: string): Promise<WebResult[]> {
  const key = process.env.GOOGLE_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_SEARCH_CX;

  if (!key || !cx) return [];

  try {
    const params = new URLSearchParams({
      key,
      cx,
      q: `Ducati ${query}`,
      num: "5",
    });

    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?${params}`,
      { signal: AbortSignal.timeout(5000) },
    );

    if (!res.ok) return [];

    const data = await res.json();
    return (data.items || []).slice(0, 5).map((item: any) => ({
      title: item.title || "",
      snippet: item.snippet || "",
      link: item.link || "",
    }));
  } catch {
    return [];
  }
}

/* ─── Ducati-specific system prompt ───────────────────────────────── */
function buildSystemPrompt(
  kbEntries: KBEntry[],
  webResults: WebResult[],
  userBike?: string,
): string {
  let prompt = `You are a Ducati technical expert assistant for the official Ducati UK members club (DOCLSE).

CORE RULES:
1. You are an expert on all Ducati motorcycles — models, specifications, service, maintenance, modifications, track setup, insurance, and buying/selling.
2. When you have VERIFIED data from the knowledge base below, cite it confidently.
3. When using web search results, note that they may contain inaccuracies — present them as "according to community sources" or similar.
4. For torque specifications, service intervals, and safety-critical data: ONLY state values from the verified knowledge base. If not available, say "please verify with your workshop manual".
5. Be concise, knowledgeable, and helpful. Use a confident but not arrogant tone.
6. Always consider UK-specific context (insurance, MOT, weather, roads, dealers).
7. Format responses with markdown for readability — use **bold**, bullet points, and headers where helpful.

`;

  if (kbEntries.length > 0) {
    prompt += `VERIFIED KNOWLEDGE BASE (high confidence — cite freely):
`;
    kbEntries.forEach((entry, i) => {
      prompt += `
[KB${i + 1}] ${entry.title}
Model: ${entry.model || "General"} ${entry.yearStart ? `(${entry.yearStart}-${entry.yearEnd || "present"})` : ""}
Category: ${entry.category}
${entry.content}
`;
    });
  }

  if (webResults.length > 0) {
    prompt += `
WEB SEARCH RESULTS (lower confidence — attribute as community/online sources):
`;
    webResults.forEach((result, i) => {
      prompt += `
[Web${i + 1}] ${result.title}
Source: ${result.link}
${result.snippet}
`;
    });
  }

  if (userBike) {
    prompt += `
USER CONTEXT: This member rides a ${userBike}. Tailor your response to their specific bike when relevant, but clarify when giving general vs model-specific advice.
`;
  }

  return prompt;
}

/* ─── Rate limiting (simple in-memory) ────────────────────────────── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

/* ─── POST handler ────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 },
      );
    }

    // Validate API key exists
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI service not configured. Set OPENAI_API_KEY environment variable." },
        { status: 503 },
      );
    }

    // Parse request
    const body = await request.json();
    const query: string = body.query?.trim();
    const userBike: string | undefined = body.userBike;
    const history: { role: "user" | "assistant"; content: string }[] =
      body.history || [];

    if (!query || query.length > 1000) {
      return NextResponse.json(
        { error: "Query must be 1-1000 characters." },
        { status: 400 },
      );
    }

    const startTime = Date.now();

    // 1. Search local knowledge base
    const kbResults = searchKB(query, 5);

    // 2. Search the web (runs in parallel)
    const webResults = await webSearch(query);

    // 3. Build system prompt with all context
    const systemPrompt = buildSystemPrompt(kbResults, webResults, userBike);

    // 4. Build messages array with conversation history
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
    ];

    // Include last 6 messages of history for context
    const recentHistory = history.slice(-6);
    for (const msg of recentHistory) {
      messages.push({ role: msg.role, content: msg.content });
    }

    messages.push({ role: "user", content: query });

    // 5. Call OpenAI
    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.3,
      max_tokens: 800,
    });

    const response = completion.choices[0]?.message?.content || "I was unable to generate a response. Please try again.";
    const responseTime = Date.now() - startTime;

    // 6. Build source citations
    const sources = [
      ...kbResults.map((kb) => ({
        type: "kb" as const,
        title: kb.title,
        category: kb.category,
        id: kb.id,
      })),
      ...webResults.map((web) => ({
        type: "web" as const,
        title: web.title,
        url: web.link,
      })),
    ];

    return NextResponse.json({
      response,
      sources,
      responseTime,
      model: "gpt-4o-mini",
    });
  } catch (error: any) {
    console.error("AI Assistant error:", error);

    if (error?.status === 401 || error?.code === "invalid_api_key") {
      return NextResponse.json(
        { error: "Invalid OpenAI API key configured." },
        { status: 503 },
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "AI service is busy. Please try again in a moment." },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
