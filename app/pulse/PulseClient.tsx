"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Radio, Zap, Globe, Users, MapPin, TrendingUp } from "lucide-react";
import {
  RIDERS, MOMENTS, ACTIVE_COUNT, COUNTRY_COUNT, TOTAL_KM,
  type Rider,
} from "@/lib/pulse-data";

/* ─── Helpers ─────────────────────────────────────────────────────── */
function fmtKm(n: number) {
  return n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : `${(n / 1000).toFixed(0)}k`;
}

/* Convert lat/lng → x/y % on a simple equirectangular projection */
function toXY(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

/* ─── Globe / world map ───────────────────────────────────────────── */
function WorldDots({ selected, onSelect }: {
  selected: Rider | null;
  onSelect: (r: Rider) => void;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full" style={{ paddingBottom: "50%", background: "transparent" }}>
      {/* Faint world map SVG outline (simplified continent shapes via CSS) */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {/* Grid lines */}
        {[20, 40, 60, 80].map(x => (
          <div key={`vl${x}`} className="absolute top-0 bottom-0 w-px opacity-[0.06]"
            style={{ left: `${x}%`, background: "#fff" }} />
        ))}
        {[25, 50, 75].map(y => (
          <div key={`hl${y}`} className="absolute left-0 right-0 h-px opacity-[0.06]"
            style={{ top: `${y}%`, background: "#fff" }} />
        ))}

        {/* Rider dots */}
        {RIDERS.map((r) => {
          const { x, y } = toXY(r.lat, r.lng);
          const isSelected = selected?.id === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r)}
              className="absolute group"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", zIndex: isSelected ? 10 : 2 }}
              title={`${r.name} · ${r.city}`}
            >
              {/* Pulse ring for active riders */}
              {r.active && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    animation: `ping ${1.5 + (parseInt(r.id.slice(1)) % 4) * 0.3}s cubic-bezier(0,0,0.2,1) infinite`,
                    background: "rgba(204,0,0,0.4)",
                    transform: "scale(2.5)",
                    animationDelay: `${(parseInt(r.id.slice(1)) % 6) * 0.2}s`,
                  }}
                />
              )}
              <span
                className="relative block rounded-full transition-all duration-200"
                style={{
                  width: isSelected ? 14 : r.active ? 10 : 6,
                  height: isSelected ? 14 : r.active ? 10 : 6,
                  background: isSelected ? "#fff" : r.active ? "#cc0000" : "rgba(255,255,255,0.25)",
                  boxShadow: r.active ? "0 0 8px rgba(204,0,0,0.8)" : "none",
                  border: isSelected ? "2px solid #cc0000" : "none",
                }}
              />
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap text-[0.65rem] font-bold bg-black/90 text-white px-2 py-1 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
                {r.name} · {r.city} {r.countryCode}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-4 z-10">
        <span className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/40 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#cc0000] inline-block" style={{ boxShadow: "0 0 6px rgba(204,0,0,0.8)" }} />
          Riding now
        </span>
        <span className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/40 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-white/25 inline-block" />
          Member
        </span>
      </div>
    </div>
  );
}

/* ─── Rider card ──────────────────────────────────────────────────── */
function RiderCard({ rider, onClose }: { rider: Rider; onClose: () => void }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#111] animate-fade-up">
      <div className="p-5 border-b border-white/[0.06] flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center font-black text-sm text-white shrink-0"
            style={{ background: rider.active ? "#cc0000" : "#222" }}
          >
            {rider.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-sm">{rider.name}</span>
              <span className="text-base">{rider.countryCode}</span>
              {rider.active && (
                <span className="flex items-center gap-1 text-[0.6rem] font-bold text-[#cc0000] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] animate-pulse inline-block" />
                  Riding
                </span>
              )}
            </div>
            <p className="text-white/40 text-xs mt-0.5">{rider.bike} · {rider.city}, {rider.country}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/25 hover:text-white transition-colors text-lg leading-none">&times;</button>
      </div>

      <div className="grid grid-cols-3 divide-x divide-white/[0.06] text-center">
        {[
          { value: fmtKm(rider.totalKm), label: "km logged" },
          { value: rider.totalRides.toString(), label: "rides" },
          { value: `'${rider.joinedYear.toString().slice(2)}`, label: "member since" },
        ].map(s => (
          <div key={s.label} className="py-4">
            <div className="font-black text-white text-lg leading-none mb-1">{s.value}</div>
            <div className="text-white/30 text-[0.6rem] font-bold uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {rider.moment && (
        <div className="p-4 border-t border-white/[0.06]">
          <p className="text-white/60 text-xs leading-relaxed italic">&ldquo;{rider.moment}&rdquo;</p>
          <p className="text-white/25 text-[0.6rem] mt-2 font-bold uppercase tracking-wider">{rider.momentTime}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Moments feed item ───────────────────────────────────────────── */
function MomentItem({ m, onSelect }: { m: typeof MOMENTS[0]; onSelect: () => void }) {
  const rider = RIDERS.find(r => r.id === m.riderId)!;
  return (
    <button
      onClick={onSelect}
      className="w-full text-left flex items-start gap-3 p-4 rounded-xl hover:bg-white/[0.04] transition-colors group"
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs text-white shrink-0 mt-0.5"
        style={{ background: m.active ? "#cc0000" : "#222" }}
      >
        {rider.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="font-bold text-white text-xs">{m.riderName}</span>
          <span className="text-white/30 text-xs">{m.bike}</span>
          <span className="text-xs">{m.countryCode}</span>
          {m.active && <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] animate-pulse inline-block" />}
        </div>
        <p className="text-white/55 text-xs leading-relaxed line-clamp-2 group-hover:text-white/70 transition-colors">
          &ldquo;{m.text}&rdquo;
        </p>
        <p className="text-white/20 text-[0.6rem] mt-1.5 font-bold uppercase tracking-wider">{m.city} · {m.ago}</p>
      </div>
    </button>
  );
}

/* ─── Main page ───────────────────────────────────────────────────── */
export default function PulseClient() {
  const [selected, setSelected] = useState<Rider | null>(null);
  const [liveCount, setLiveCount] = useState(ACTIVE_COUNT);
  const feedRef = useRef<HTMLDivElement>(null);

  /* Simulate live count fluctuation */
  useEffect(() => {
    const id = setInterval(() => {
      setLiveCount(c => Math.max(8, Math.min(18, c + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  function handleMapSelect(r: Rider) {
    setSelected(prev => prev?.id === r.id ? null : r);
  }

  return (
    <div className="bg-[#070707] min-h-screen text-white" style={{ paddingTop: 72 }}>

      {/* ── HERO HEADER ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]"
        style={{ background: "linear-gradient(160deg, #1a0000 0%, #0a0a0a 60%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 100% at 80% 50%, rgba(204,0,0,0.12) 0%, transparent 70%)"
        }} />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>

          <div className="flex items-start justify-between gap-8 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#cc0000]/30 bg-[#cc0000]/10">
                  <Radio className="w-3.5 h-3.5 text-[#cc0000] animate-pulse" />
                  <span className="text-[#cc0000] text-[0.7rem] font-black uppercase tracking-[0.2em]">Live</span>
                </div>
              </div>
              <h1 className="font-black text-white mb-3" style={{
                fontSize: "clamp(3rem,7vw,6rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
              }}>
                PULSE
              </h1>
              <p className="text-white/40 text-base font-light max-w-sm leading-relaxed">
                The global Ducati heartbeat. See who&apos;s riding right now,
                anywhere on Earth.
              </p>
            </div>

            {/* Live stats */}
            <div className="grid grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden shrink-0">
              {[
                { icon: <Zap className="w-4 h-4" />,    value: liveCount.toString(),        label: "Riding now",    accent: true },
                { icon: <Globe className="w-4 h-4" />,   value: COUNTRY_COUNT.toString(),    label: "Countries",     accent: false },
                { icon: <TrendingUp className="w-4 h-4" />, value: fmtKm(TOTAL_KM),          label: "km collective", accent: false },
              ].map(s => (
                <div key={s.label} className="bg-[#0f0f0f] px-6 py-5 text-center">
                  <div className={`flex justify-center mb-2 ${s.accent ? "text-[#cc0000]" : "text-white/30"}`}>{s.icon}</div>
                  <div className="font-black text-white text-2xl leading-none mb-1 tabular-nums">{s.value}</div>
                  <div className="text-white/25 text-[0.6rem] font-bold uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: globe + selected rider card */}
          <div className="lg:col-span-2 space-y-6">

            {/* Map area */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0d0d0d] p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-white/25" />
                  <span className="text-white/30 text-xs font-bold uppercase tracking-wider">World Map</span>
                </div>
                <span className="text-[0.65rem] font-bold text-white/20 uppercase tracking-wider">
                  Tap a dot to view rider
                </span>
              </div>
              <WorldDots selected={selected} onSelect={handleMapSelect} />
            </div>

            {/* Selected rider card */}
            {selected && (
              <RiderCard rider={selected} onClose={() => setSelected(null)} />
            )}

            {/* Active riders horizontal scroll */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.2em]">
                  Riding Right Now · {liveCount} active
                </p>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                {RIDERS.filter(r => r.active).map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleMapSelect(r)}
                    className={`shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      selected?.id === r.id
                        ? "border-[#cc0000]/50 bg-[#cc0000]/10"
                        : "border-white/[0.07] bg-[#0f0f0f] hover:border-white/20"
                    }`}
                    style={{ minWidth: 88 }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-[#cc0000] flex items-center justify-center font-black text-xs text-white">
                        {r.avatar}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#cc0000] border-2 border-[#0f0f0f]" />
                    </div>
                    <span className="text-white text-[0.65rem] font-bold leading-tight text-center line-clamp-1">{r.name.split(" ")[0]}</span>
                    <span className="text-white/30 text-[0.55rem] text-center">{r.city}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: moments feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.2em]">From the Road</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] animate-pulse" />
                <span className="text-[0.6rem] font-bold text-white/20 uppercase">Live</span>
              </div>
            </div>

            <div ref={feedRef} className="space-y-1 rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-2 max-h-[600px] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#cc0000 transparent" }}>
              {MOMENTS.map(m => (
                <MomentItem
                  key={m.id}
                  m={m}
                  onSelect={() => {
                    const r = RIDERS.find(r => r.id === m.riderId);
                    if (r) setSelected(r);
                  }}
                />
              ))}
            </div>

            {/* Your moment CTA */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-5">
              <p className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.2em] mb-3">Share a moment</p>
              <div className="bg-[#151515] rounded-xl border border-white/[0.06] p-4 mb-3">
                <p className="text-white/20 text-sm italic">Where are you riding today?</p>
              </div>
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-white transition-all"
                style={{ background: "#cc0000" }}
              >
                <Radio className="w-3.5 h-3.5" /> Sign in to go live
              </Link>
            </div>

            {/* Community stats */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-5 space-y-3">
              <p className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.2em]">Community</p>
              {[
                { icon: <Users className="w-3.5 h-3.5" />,   label: "Total members",     value: `${RIDERS.length}+` },
                { icon: <MapPin className="w-3.5 h-3.5" />,  label: "Countries",          value: COUNTRY_COUNT },
                { icon: <TrendingUp className="w-3.5 h-3.5" />, label: "Collective km",   value: fmtKm(TOTAL_KM) },
                { icon: <Zap className="w-3.5 h-3.5" />,     label: "Avg rides / member", value: Math.round(RIDERS.reduce((s,r)=>s+r.totalRides,0)/RIDERS.length) },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/30">
                    {s.icon}
                    <span className="text-xs">{s.label}</span>
                  </div>
                  <span className="font-black text-white text-sm tabular-nums">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── ALL RIDERS TABLE ──────────────────────────────────────── */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <p className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.2em] mb-6">All Members · Garage</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {RIDERS.sort((a,b) => (a.active === b.active ? 0 : a.active ? -1 : 1)).map(r => (
              <button
                key={r.id}
                onClick={() => { handleMapSelect(r); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`text-left p-4 rounded-xl border transition-all hover:border-white/20 ${
                  r.active ? "border-[#cc0000]/20 bg-[#cc0000]/[0.04]" : "border-white/[0.06] bg-[#0d0d0d]"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs text-white shrink-0"
                    style={{ background: r.active ? "#cc0000" : "#1a1a1a" }}
                  >
                    {r.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-xs truncate">{r.name}</span>
                      <span className="text-sm">{r.countryCode}</span>
                    </div>
                    <p className="text-white/30 text-[0.65rem] truncate">{r.city}</p>
                  </div>
                  {r.active && <span className="ml-auto w-2 h-2 rounded-full bg-[#cc0000] animate-pulse shrink-0" />}
                </div>
                <p className="text-white/25 text-[0.6rem] font-bold uppercase tracking-wider mb-2 truncate">{r.bike}</p>
                <div className="flex items-center gap-3 text-[0.65rem]">
                  <span className="text-white/50 font-bold">{fmtKm(r.totalKm)} <span className="text-white/25 font-normal">km</span></span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/50 font-bold">{r.totalRides} <span className="text-white/25 font-normal">rides</span></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe for pulse ring (supplement Tailwind's built-in) */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
