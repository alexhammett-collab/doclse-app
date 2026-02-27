"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MapPin, Navigation, TrendingUp, Star, ChevronRight, RotateCcw, ExternalLink, Users, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { rides, type Ride } from "@/lib/rides";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const currentMonth = MONTHS[new Date().getMonth()];

const questions = [
  {
    id: "style",
    question: "What kind of riding are you after today?",
    options: [
      { value: "twisty",  label: "Technical & Twisty", icon: "🔄", desc: "Hairpins, bends, concentration required" },
      { value: "fast",    label: "Fast & Flowing",     icon: "⚡", desc: "Open A-roads, momentum, speed" },
      { value: "scenic",  label: "Scenic & Relaxed",   icon: "🌄", desc: "Views, stops, no pressure" },
      { value: "coastal", label: "Coastal Cruise",     icon: "🌊", desc: "Sea air, harbours, fish & chips" },
    ],
  },
  {
    id: "distance",
    question: "How far do you want to ride?",
    options: [
      { value: "short",  label: "Under 150 miles", icon: "☕",  desc: "Back for lunch" },
      { value: "medium", label: "150–190 miles",   icon: "🏍️", desc: "Full morning out" },
      { value: "long",   label: "190+ miles",      icon: "🗺️", desc: "Full day adventure" },
    ],
  },
  {
    id: "stop",
    question: "Do you want a food or coffee stop?",
    options: [
      { value: "yes-cafe",  label: "Yes — cafe stop",    icon: "☕",  desc: "Mid-ride coffee and cake" },
      { value: "yes-lunch", label: "Yes — proper lunch", icon: "🍽️", desc: "Sit-down meal en route" },
      { value: "no",        label: "No — just ride",     icon: "🏁",  desc: "Fuel only, keep moving" },
    ],
  },
  {
    id: "experience",
    question: "What's your experience level?",
    options: [
      { value: "beginner",     label: "Building confidence", icon: "🌱", desc: "Newer rider, prefer forgiving roads" },
      { value: "intermediate", label: "Comfortable rider",   icon: "🎯", desc: "Happy with most conditions" },
      { value: "advanced",     label: "Experienced & keen",  icon: "🔥", desc: "Bring on the technical stuff" },
    ],
  },
  {
    id: "motorways",
    question: "Happy to use motorways to get there?",
    options: [
      { value: "yes", label: "Yes — get there fast", icon: "🛣️", desc: "Use motorways for access sections" },
      { value: "no",  label: "No — B-roads only",   icon: "🌿", desc: "Keep it interesting all the way" },
    ],
  },
];

type Answers = Record<string, string>;

function scoreRide(ride: Ride, answers: Answers): number {
  let score = 0;
  const { style, distance, stop, experience } = answers;

  if (style === "twisty"  && ride.tags.includes("twisty"))   score += 30;
  if (style === "fast"    && ride.tags.includes("fast"))     score += 30;
  if (style === "scenic"  && ride.tags.includes("scenic"))   score += 30;
  if (style === "coastal" && ride.tags.includes("coastal"))  score += 30;
  if (style === "twisty"  && ride.bendDensity >= 60)         score += 15;
  if (style === "fast"    && ride.bendDensity < 40)          score += 15;
  if (style === "scenic"  && ride.tags.some(t => ["woodland","hills","coastal"].includes(t))) score += 10;

  if (distance === "short"  && ride.distanceMiles < 150)                               score += 20;
  if (distance === "medium" && ride.distanceMiles >= 150 && ride.distanceMiles <= 190) score += 20;
  if (distance === "long"   && ride.distanceMiles > 190)                               score += 20;

  if (stop === "yes-cafe"  && ride.tags.includes("cafe-stop"))  score += 15;
  if (stop === "yes-lunch" && ride.tags.includes("lunch-stop")) score += 15;
  if (stop === "no")                                             score += 5;

  if (experience === "beginner"     && ride.difficulty === "Beginner Friendly") score += 20;
  if (experience === "intermediate" && ride.difficulty === "Intermediate")      score += 20;
  if (experience === "advanced"     && ride.difficulty === "Advanced")          score += 20;
  if (experience === "beginner"     && ride.difficulty === "Advanced")          score -= 20;
  if (experience === "advanced"     && ride.difficulty === "Beginner Friendly") score -= 5;

  if (ride.bestMonths.includes(currentMonth)) score += 10;
  if (ride.avoidMonths.includes(currentMonth)) score -= 15;

  return Math.min(99, Math.max(10, score));
}

function ElevationWaveform({ elevation, isTop }: { elevation: number[]; isTop: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width, h = canvas.height;
    const min = Math.min(...elevation), max = Math.max(...elevation);
    const range = max - min || 1;
    const pad = 4;
    const color = isTop ? "#cc0000" : "#c8a951";

    ctx.clearRect(0, 0, w, h);
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, isTop ? "rgba(204,0,0,0.5)" : "rgba(200,169,81,0.5)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();
    elevation.forEach((val, i) => {
      const x = (i / (elevation.length - 1)) * w;
      const y = h - pad - ((val - min) / range) * (h - pad * 2);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    ctx.fillStyle = gradient; ctx.fill();

    ctx.beginPath();
    elevation.forEach((val, i) => {
      const x = (i / (elevation.length - 1)) * w;
      const y = h - pad - ((val - min) / range) * (h - pad * 2);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
  }, [elevation, isTop]);

  return <canvas ref={canvasRef} width={280} height={55} style={{ width: "100%", height: "55px" }} />;
}

function BendDensityBar({ density }: { density: number }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => { const t = setTimeout(() => setAnimated(density), 100); return () => clearTimeout(t); }, [density]);
  const color = density >= 65 ? "#cc0000" : density >= 40 ? "#c8a951" : "#4caf50";
  const label = density >= 65 ? "Technical" : density >= 40 ? "Mixed" : "Open & flowing";
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Bend Density</span>
        <span style={{ fontWeight: 700, fontSize: "0.75rem", color }}>{label}</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${animated}%`, background: color, borderRadius: 3, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
      <div className="flex justify-between mt-1">
        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)" }}>Straight</span>
        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)" }}>Max Bends</span>
      </div>
    </div>
  );
}

function CompatibilityRing({ score, size = 80 }: { score: number; size?: number }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => { const t = setTimeout(() => setAnimated(score), 200); return () => clearTimeout(t); }, [score]);
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  const progress = (animated / 100) * circ;
  const color = score >= 75 ? "#cc0000" : score >= 55 ? "#c8a951" : "rgba(255,255,255,0.3)";
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={circ - progress} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1), stroke 0.3s" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontWeight: 900, fontSize: size >= 80 ? "1.5rem" : "1.1rem", color: "white", lineHeight: 1 }}>{animated}%</span>
        <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>match</span>
      </div>
    </div>
  );
}

function SeasonBadge({ ride }: { ride: Ride }) {
  const isGood = ride.bestMonths.includes(currentMonth);
  const isWarning = ride.avoidMonths.includes(currentMonth);
  if (isGood && !isWarning) return (
    <div className="flex items-center gap-1" style={{ color: "#4caf50", fontSize: "0.75rem", fontWeight: 600 }}>
      <CheckCircle size={13} /> Best riding now ({currentMonth})
    </div>
  );
  if (isWarning) return (
    <div className="flex items-center gap-1" style={{ color: "#c8a951", fontSize: "0.75rem", fontWeight: 600 }}>
      <AlertTriangle size={13} /> {ride.seasonWarning || `Caution in ${currentMonth}`}
    </div>
  );
  return (
    <div className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
      <CheckCircle size={13} /> Rideable now
    </div>
  );
}

function VerdictTicker({ verdicts }: { verdicts: Ride["communityVerdicts"] }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % verdicts.length); setFade(true); }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, [verdicts.length]);
  const v = verdicts[idx];
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "0.85rem 1rem", opacity: fade ? 1 : 0, transition: "opacity 0.3s ease", minHeight: 64 }}>
      <div className="flex gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={10} fill={i < v.stars ? "#c8a951" : "none"} color={i < v.stars ? "#c8a951" : "rgba(255,255,255,0.2)"} />
        ))}
      </div>
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.8rem", lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>&ldquo;{v.text}&rdquo;</p>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", marginTop: "0.35rem" }}>— {v.rider} · {v.bike}</p>
    </div>
  );
}

function RouteCard({ ride, score, rank }: { ride: Ride; score: number; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  const diffColor: Record<string, string> = { "Beginner Friendly": "#4caf50", Intermediate: "#c8a951", Advanced: "#cc0000" };

  return (
    <div style={{
      background: rank === 1 ? "rgba(204,0,0,0.06)" : "rgba(255,255,255,0.03)",
      border: rank === 1 ? "1px solid rgba(204,0,0,0.3)" : "1px solid rgba(255,255,255,0.08)",
      marginBottom: "1.25rem",
    }}>
      {rank === 1 && (
        <div style={{ background: "#cc0000", padding: "0.4rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Zap size={13} fill="white" color="white" />
          <span style={{ fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "white" }}>Best Match For You</span>
        </div>
      )}
      <div style={{ padding: "1.5rem" }}>
        <div className="flex gap-5 items-start">
          <CompatibilityRing score={score} size={80} />
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h3 style={{ fontWeight: 900, fontSize: "1.6rem", color: "white", lineHeight: 1, margin: 0 }}>{ride.title}</h3>
              <span style={{ background: diffColor[ride.difficulty], color: "white", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.15em", padding: "0.2rem 0.6rem", textTransform: "uppercase" }}>
                {ride.difficulty}
              </span>
            </div>
            <div className="flex gap-6 flex-wrap mb-3">
              {[
                { Icon: Navigation, text: ride.distance },
                { Icon: TrendingUp, text: `${ride.totalClimb.toLocaleString()}m climb` },
                { Icon: MapPin, text: ride.roadType },
                { Icon: Users, text: `${ride.joined}/${ride.capacity} joined` },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>
                  <Icon size={12} color="#cc0000" /> {text}
                </div>
              ))}
            </div>
            <SeasonBadge ride={ride} />
          </div>
        </div>

        <div style={{ marginTop: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem" }}>Elevation Profile</div>
            <ElevationWaveform elevation={ride.elevation} isTop={rank === 1} />
            <div className="flex justify-between mt-1">
              <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)" }}>Start</span>
              <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)" }}>Finish</span>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "1rem" }}><BendDensityBar density={ride.bendDensity} /></div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.4rem" }}>Surface</div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", margin: 0, lineHeight: 1.5 }}>{ride.surface}</p>
          </div>
        </div>

        <button onClick={() => setExpanded(e => !e)}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 0 0", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
          {expanded ? "Hide" : "Show"} community verdicts & waypoints
        </button>

        {expanded && (
          <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>Community Verdicts</div>
              <VerdictTicker verdicts={ride.communityVerdicts} />
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>Waypoints</div>
              {ride.meetPoints.map((p, i) => (
                <div key={p.id} className="flex gap-3 mb-2 items-start">
                  <div style={{ width: 20, height: 20, background: i === 0 ? "#cc0000" : "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontWeight: 900, fontSize: "0.7rem", color: i === 0 ? "white" : "rgba(255,255,255,0.5)" }}>{p.id}</span>
                  </div>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", margin: 0, lineHeight: 1.4 }}>{p.label}</p>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>{p.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-5 flex-wrap">
          <a href={ride.googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <button style={{ background: "#cc0000", border: "none", color: "white", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.6rem 1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ExternalLink size={13} /> Open in Google Maps
            </button>
          </a>
          <Link href="/rides">
            <button style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.6rem 1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Users size={13} /> Join this rideout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RouteIntelligencePage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<{ ride: Ride; score: number }[] | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const currentQ = questions[step];
  const progress = (step / questions.length) * 100;

  function handleAnswer(questionId: string, value: string) {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      const scored = rides.map(r => ({ ride: r, score: scoreRide(r, newAnswers) })).sort((a, b) => b.score - a.score);
      setResults(scored);
      setAnimateIn(false);
      setTimeout(() => setAnimateIn(true), 50);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }

  function reset() {
    setAnswers({}); setStep(0); setResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 320, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a0000 0%, #0a0a0a 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "#cc0000" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 2rem", maxWidth: 1200, margin: "0 auto" }}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#cc0000", fontWeight: 700 }}>New Feature</span>
              <span style={{ background: "#cc0000", color: "white", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.2em", padding: "0.2rem 0.6rem", textTransform: "uppercase" }}>BETA</span>
            </div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "white", lineHeight: 0.95, marginBottom: "1rem" }}>
              ROUTE<br /><span style={{ color: "#cc0000" }}>INTELLIGENCE</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 500, fontWeight: 300 }}>
              Answer 5 questions. Get your perfect DOCLSE ride — scored, profiled and mapped.
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 2rem" }}>

        {!results && (
          <>
            {/* Progress */}
            <div style={{ marginBottom: "3rem" }}>
              <div className="flex justify-between items-center mb-3">
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
                  Question {step + 1} of {questions.length}
                </span>
                <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "#cc0000" }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "#cc0000", borderRadius: 2, transition: "width 0.4s ease" }} />
              </div>
              <div className="flex gap-1 mt-3">
                {questions.map((q, i) => (
                  <div key={q.id} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? "#cc0000" : i === step ? "rgba(204,0,0,0.5)" : "rgba(255,255,255,0.06)", transition: "background 0.3s" }} />
                ))}
              </div>
            </div>

            {/* Question */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "white", lineHeight: 1, marginBottom: "2rem" }}>
                {currentQ.question}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                {currentQ.options.map(opt => (
                  <button key={opt.value} onClick={() => handleAnswer(currentQ.id, opt.value)}
                    style={{
                      background: answers[currentQ.id] === opt.value ? "rgba(204,0,0,0.15)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${answers[currentQ.id] === opt.value ? "#cc0000" : "rgba(255,255,255,0.1)"}`,
                      padding: "1.5rem 1.25rem", cursor: "pointer", textAlign: "left", transition: "all 0.15s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(204,0,0,0.5)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(204,0,0,0.08)"; }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = answers[currentQ.id] === opt.value ? "#cc0000" : "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLButtonElement).style.background = answers[currentQ.id] === opt.value ? "rgba(204,0,0,0.15)" : "rgba(255,255,255,0.03)";
                    }}
                  >
                    <div style={{ fontSize: "1.75rem", marginBottom: "0.6rem" }}>{opt.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: "0.3rem" }}>{opt.label}</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                ← Back
              </button>
            )}
          </>
        )}

        {results && (
          <div ref={resultsRef} style={{ opacity: animateIn ? 1 : 0, transform: animateIn ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            <div className="flex justify-between items-start flex-wrap gap-4 mb-10">
              <div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#cc0000", fontWeight: 700, marginBottom: "0.5rem" }}>Your Results</div>
                <h2 style={{ fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "white", lineHeight: 0.95 }}>
                  {results.length} ROUTES<br /><span style={{ color: "#cc0000" }}>RANKED FOR YOU</span>
                </h2>
              </div>
              <button onClick={reset} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.6rem 1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#cc0000"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)"; }}>
                <RotateCcw size={13} /> Start Again
              </button>
            </div>

            {/* Answer chips */}
            <div className="flex gap-2 flex-wrap mb-8">
              {Object.entries(answers).map(([qid, val]) => {
                const q = questions.find(q => q.id === qid);
                const opt = q?.options.find(o => o.value === val);
                return opt ? (
                  <div key={qid} style={{ background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.25)", padding: "0.25rem 0.75rem", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span>{opt.icon}</span> {opt.label}
                  </div>
                ) : null;
              })}
            </div>

            {results.map(({ ride, score }, i) => (
              <RouteCard key={ride.id} ride={ride} score={score} rank={i + 1} />
            ))}
          </div>
        )}
      </div>

      {!results && (
        <div style={{ background: "rgba(204,0,0,0.08)", borderTop: "1px solid rgba(204,0,0,0.2)", padding: "2rem", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", letterSpacing: "0.1em" }}>
            ROUTE INTELLIGENCE uses ride data, seasonal conditions and your preferences to score every DOCLSE route out of 100.
          </p>
        </div>
      )}
    </div>
  );
}
