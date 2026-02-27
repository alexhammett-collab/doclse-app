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

/* ─── Simplified continent SVG paths (equirectangular, viewBox 0 0 1000 500) ── */
const CONTINENT_PATHS = [
  // North America
  "M120 60 L155 55 185 70 210 90 230 115 235 140 220 160 225 185 210 195 195 175 180 180 165 195 145 200 130 185 115 190 100 175 90 160 85 140 80 120 85 95 95 75 Z",
  // South America
  "M195 235 L210 225 225 230 235 250 240 270 245 295 240 320 235 345 225 370 215 385 200 395 190 380 185 360 180 340 175 315 178 290 182 265 185 250 Z",
  // Europe
  "M460 65 L475 60 495 58 510 62 520 70 525 80 518 90 510 100 500 110 490 115 480 108 470 95 465 85 458 75 Z",
  // Africa
  "M470 155 L485 145 505 140 520 145 535 155 545 170 548 195 545 220 540 250 535 275 525 300 515 315 505 325 490 330 478 320 470 300 465 275 460 250 458 225 460 200 462 175 Z",
  // Asia
  "M530 55 L560 50 590 45 620 42 660 48 700 55 730 60 755 68 770 80 780 95 782 110 775 125 768 140 755 148 740 145 720 150 700 160 680 155 660 148 645 155 630 165 615 160 600 150 585 140 570 130 555 118 540 108 528 95 525 80 Z",
  // Southeast Asia & Indonesia
  "M700 170 L715 165 735 168 750 178 762 190 770 205 765 215 748 220 730 218 715 210 705 195 Z M775 218 L790 215 805 222 810 235 800 240 785 235 Z",
  // Australia
  "M770 305 L790 295 810 290 835 295 850 305 858 320 855 340 845 355 830 362 810 358 790 350 775 340 768 325 Z",
  // Japan/Korea
  "M790 90 L795 80 802 75 808 82 806 92 800 98 792 95 Z",
  // UK/Ireland
  "M448 68 L455 65 460 70 458 78 452 80 448 74 Z",
  // Greenland
  "M295 20 L320 15 340 18 348 28 342 40 325 45 310 42 298 35 Z",
];

/* ─── Globe / world map ───────────────────────────────────────────── */
function WorldDots({ selected, onSelect }: {
  selected: Rider | null;
  onSelect: (r: Rider) => void;
}) {
  return (
    <div className="relative w-full" style={{ paddingBottom: "50%" }}>
      <div className="absolute inset-0 overflow-hidden">

        {/* SVG world map with continents */}
        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle graticule grid */}
          {[100,200,300,400,500,600,700,800,900].map(x => (
            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={500} stroke="white" strokeOpacity={0.04} strokeWidth={0.5} />
          ))}
          {[100,200,300,400].map(y => (
            <line key={`h${y}`} x1={0} y1={y} x2={1000} y2={y} stroke="white" strokeOpacity={0.04} strokeWidth={0.5} />
          ))}
          {/* Equator */}
          <line x1={0} y1={250} x2={1000} y2={250} stroke="rgba(204,0,0,0.12)" strokeWidth={0.5} strokeDasharray="6 4" />

          {/* Continent shapes */}
          {CONTINENT_PATHS.map((d, i) => (
            <path key={i} d={d} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
          ))}
        </svg>

        {/* Rider dots (HTML overlay for interactivity) */}
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
              {r.active && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    animation: `ping ${1.5 + (parseInt(r.id.slice(1)) % 4) * 0.3}s cubic-bezier(0,0,0.2,1) infinite`,
                    background: "rgba(204,0,0,0.35)",
                    transform: "scale(2.5)",
                    animationDelay: `${(parseInt(r.id.slice(1)) % 6) * 0.2}s`,
                  }}
                />
              )}
              <span
                className="relative block rounded-full transition-all duration-200"
                style={{
                  width: isSelected ? 14 : r.active ? 10 : 5,
                  height: isSelected ? 14 : r.active ? 10 : 5,
                  background: isSelected ? "#fff" : r.active ? "#cc0000" : "rgba(255,255,255,0.2)",
                  boxShadow: isSelected ? "0 0 20px rgba(204,0,0,0.6)" : r.active ? "0 0 12px rgba(204,0,0,0.7)" : "none",
                  border: isSelected ? "2px solid #cc0000" : "none",
                }}
              />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap text-[0.6rem] font-bold bg-black/95 text-white px-2.5 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
                {r.name} · {r.city} {r.countryCode}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-5 z-10">
        <span className="flex items-center gap-2 text-[0.6rem] font-bold text-white/30 uppercase tracking-[0.15em]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#cc0000]" style={{ boxShadow: "0 0 8px rgba(204,0,0,0.6)" }} />
          Riding now
        </span>
        <span className="flex items-center gap-2 text-[0.6rem] font-bold text-white/30 uppercase tracking-[0.15em]">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          Member
        </span>
      </div>
    </div>
  );
}

/* ─── Rider card ──────────────────────────────────────────────────── */
function RiderCard({ rider, onClose }: { rider: Rider; onClose: () => void }) {
  return (
    <div className="overflow-hidden bg-[#0e0e0e] animate-fade-up" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="p-5 flex items-start justify-between gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
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

      <div className="grid grid-cols-3 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
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
    <div className="bg-black min-h-screen text-white" style={{ paddingTop: 72 }}>

      {/* ── HERO HEADER ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1a0000 0%, #060606 60%)" }}>
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
            <div className="grid grid-cols-3 gap-px bg-white/[0.04] overflow-hidden shrink-0">
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
            <div className="overflow-hidden bg-[#0a0a0a] p-4 sm:p-6" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
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
                    className={`shrink-0 flex flex-col items-center gap-2 p-3 transition-all ${
                      selected?.id === r.id
                        ? "bg-[#cc0000]/10"
                        : "bg-[#0c0c0c] hover:bg-[#111]"
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

            <div ref={feedRef} className="space-y-1 bg-[#0a0a0a] p-2 max-h-[600px] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#cc0000 transparent", border: "1px solid rgba(255,255,255,0.04)" }}>
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
            <div className="bg-[#0a0a0a] p-5" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
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
                className={`text-left p-4 transition-all hover:bg-[#111] ${
                  r.active ? "bg-[#cc0000]/[0.04]" : "bg-[#0a0a0a]"
                }`}
                style={{ border: "1px solid rgba(255,255,255,0.04)" }}
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
