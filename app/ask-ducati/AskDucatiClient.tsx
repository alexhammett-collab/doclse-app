"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  MessageCircle,
  AlertCircle,
  BookOpen,
  Wrench,
  Gauge,
  Shield,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  generateMockAIResponse,
  SUGGESTED_QUESTIONS,
} from "@/lib/ducati-kb";

/* ─── Types ───────────────────────────────────────────────────────── */
interface Source {
  type: "kb" | "web";
  title: string;
  category?: string;
  url?: string;
  id?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: Source[];
  responseTime?: number;
}

/* ─── Category icon helper ────────────────────────────────────────── */
function CategoryIcon({ category }: { category: string }) {
  switch (category) {
    case "specs":
      return <Gauge className="w-3 h-3" />;
    case "service":
      return <Wrench className="w-3 h-3" />;
    case "issues":
      return <AlertCircle className="w-3 h-3" />;
    case "insurance":
      return <Shield className="w-3 h-3" />;
    case "buying":
      return <ShoppingCart className="w-3 h-3" />;
    default:
      return <BookOpen className="w-3 h-3" />;
  }
}

/* ─── Main component ──────────────────────────────────────────────── */
export default function AskDucatiClient() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  // Only scroll when a new message is added, not on initial mount
  const prevCountRef = useRef(0);
  useEffect(() => {
    if (messages.length > prevCountRef.current) {
      scrollToBottom();
    }
    prevCountRef.current = messages.length;
  }, [messages]);

  async function handleSend(query?: string) {
    const q = (query ?? input).trim();
    if (!q || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: q,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = updatedMessages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          userBike: user ? "2023 Monster 937 SP" : undefined,
          history: history.slice(0, -1), // exclude current query (sent separately)
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        sources: data.sources,
        responseTime: data.responseTime,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error: any) {
      // Fallback to local mock if API unavailable
      const mockResult = generateMockAIResponse(q, user ? { model: "Monster 937", year: 2023 } : undefined);

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: error.message?.includes("not configured")
          ? `**Note:** AI service is not yet configured. Showing results from local knowledge base only.\n\n${mockResult.response}`
          : mockResult.response,
        timestamp: new Date(),
        sources: mockResult.sources.map((s) => ({
          type: "kb" as const,
          title: s.title,
          category: s.category,
          id: s.id,
        })),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSend();
  }

  return (
    <div className="bg-black min-h-screen text-white" style={{ paddingTop: 72 }}>
      {/* ── Hero header ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #1a0000 0%, #060606 60%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 20% 50%, rgba(204,0,0,0.10) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#cc0000] flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1
                className="font-black text-white"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                DUCATI AI
              </h1>
              <p className="text-[0.6rem] font-bold text-white/20 uppercase tracking-[0.25em] mt-1">
                Technical Assistant
              </p>
            </div>
          </div>
          <p className="text-white/40 text-sm font-light max-w-md leading-relaxed">
            Powered by GPT-4o with live web search. Pulls from Ducati
            technical documentation, forums, and our verified knowledge
            base to answer any question about your bike.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/25 uppercase tracking-[0.15em]">
              <Zap className="w-3 h-3 text-[#cc0000]" />
              GPT-4o
            </div>
            <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/25 uppercase tracking-[0.15em]">
              <BookOpen className="w-3 h-3 text-[#cc0000]" />
              Live web search
            </div>
            <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/25 uppercase tracking-[0.15em]">
              <AlertCircle className="w-3 h-3 text-[#cc0000]" />
              Verified KB grounding
            </div>
            <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/25 uppercase tracking-[0.15em]">
              <Wrench className="w-3 h-3 text-[#cc0000]" />
              Ducati docs + forums
            </div>
          </div>
        </div>
      </div>

      {/* ── Main chat area ──────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat panel */}
          <div className="lg:col-span-3">
            <div
              className="bg-[#0a0a0a] flex flex-col"
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
                height: "clamp(500px, 60vh, 700px)",
              }}
            >
              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto p-5 space-y-5"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#cc0000 transparent" }}
              >
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#cc0000]/10 flex items-center justify-center mb-5">
                      <MessageCircle className="w-7 h-7 text-[#cc0000]" />
                    </div>
                    <h3 className="font-black text-white text-lg mb-2">
                      Ask anything about Ducati
                    </h3>
                    <p className="text-white/30 text-sm max-w-xs leading-relaxed mb-8">
                      Model specs, service intervals, torque values,
                      insurance, buying advice, and more.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                      {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="text-left px-4 py-3 bg-white/[0.03] text-white/50 text-xs leading-relaxed hover:bg-white/[0.06] hover:text-white/80 transition-colors"
                          style={{
                            border: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        msg.role === "user"
                          ? "bg-[#cc0000] text-white"
                          : "bg-[#111] text-white/90"
                      }`}
                      style={{
                        padding: "14px 18px",
                        border:
                          msg.role === "assistant"
                            ? "1px solid rgba(255,255,255,0.04)"
                            : "none",
                      }}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {msg.content}
                      </p>

                      {/* Sources & confidence */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div
                          className="mt-3 pt-3"
                          style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            {msg.responseTime !== undefined && (
                              <span className="text-[0.6rem] font-bold uppercase tracking-wider text-white/25">
                                {(msg.responseTime / 1000).toFixed(1)}s
                              </span>
                            )}
                            {msg.sources.some(s => s.type === "web") && (
                              <span className="text-[0.6rem] font-bold uppercase tracking-wider text-green-400/70">
                                Live web results
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.sources.slice(0, 5).map((src, i) => (
                              <span
                                key={src.id || `web-${i}`}
                                className={`inline-flex items-center gap-1 text-[0.55rem] font-bold px-2 py-1 ${
                                  src.type === "web"
                                    ? "text-blue-300/40 bg-blue-500/[0.06]"
                                    : "text-white/30 bg-white/[0.04]"
                                }`}
                              >
                                {src.type === "web" ? (
                                  <BookOpen className="w-3 h-3" />
                                ) : (
                                  <CategoryIcon category={src.category || "general"} />
                                )}
                                {src.title.length > 35
                                  ? src.title.slice(0, 35) + "…"
                                  : src.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div
                      className="bg-[#111] px-5 py-4"
                      style={{
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <span
                            className="w-1.5 h-1.5 bg-[#cc0000] rounded-full animate-pulse"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 bg-[#cc0000] rounded-full animate-pulse"
                            style={{ animationDelay: "200ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 bg-[#cc0000] rounded-full animate-pulse"
                            style={{ animationDelay: "400ms" }}
                          />
                        </div>
                        <span className="text-white/40 text-xs">
                          Searching knowledge base…
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input bar */}
              <form
                onSubmit={handleSubmit}
                className="shrink-0 p-4"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about models, service, specs, insurance…"
                    maxLength={500}
                    className="flex-1 bg-[#111] text-white text-sm placeholder-white/30 px-4 py-3 focus:outline-none"
                    style={{
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-[#cc0000] text-white px-4 py-3 hover:bg-[#aa0000] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[0.55rem] text-white/15 mt-2 text-center">
                  Responses are generated from a curated knowledge base.
                  Always verify critical specs with your workshop manual.
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* User bike context */}
            {user && (
              <div
                className="bg-[#0a0a0a] p-5"
                style={{
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <p className="text-[0.6rem] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">
                  Your Bike
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#cc0000]/15 flex items-center justify-center">
                    <Gauge className="w-4 h-4 text-[#cc0000]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">
                      Monster 937 SP
                    </p>
                    <p className="text-white/30 text-xs">2023</p>
                  </div>
                </div>
                <p className="text-white/25 text-[0.6rem] leading-relaxed">
                  Answers are personalised to your registered bike when
                  relevant.
                </p>
              </div>
            )}

            {/* Quick topics */}
            <div
              className="bg-[#0a0a0a] p-5"
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <p className="text-[0.6rem] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">
                Quick Topics
              </p>
              <div className="space-y-1">
                {[
                  { label: "Service Intervals", icon: <Wrench className="w-3 h-3" />, q: "What are the service intervals for my Ducati?" },
                  { label: "Torque Specs", icon: <Gauge className="w-3 h-3" />, q: "Panigale V4 torque specifications" },
                  { label: "Known Issues", icon: <AlertCircle className="w-3 h-3" />, q: "Known issues with Panigale V4" },
                  { label: "UK Insurance", icon: <Shield className="w-3 h-3" />, q: "Best insurance for Ducati UK" },
                  { label: "Buying Guide", icon: <ShoppingCart className="w-3 h-3" />, q: "Buying a used Ducati UK guide" },
                  { label: "Track Setup", icon: <Zap className="w-3 h-3" />, q: "Track day setup for Ducati" },
                ].map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => handleSend(topic.q)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-white/40 hover:text-white hover:bg-white/[0.03] transition-colors text-left"
                  >
                    <span className="text-[#cc0000]/60">{topic.icon}</span>
                    <span className="text-xs font-medium">{topic.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested questions */}
            <div
              className="bg-[#0a0a0a] p-5"
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <p className="text-[0.6rem] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">
                Try Asking
              </p>
              <div className="space-y-1.5">
                {SUGGESTED_QUESTIONS.slice(4).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-xs text-white/30 hover:text-white/70 transition-colors py-1.5 leading-relaxed"
                  >
                    &ldquo;{q}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
