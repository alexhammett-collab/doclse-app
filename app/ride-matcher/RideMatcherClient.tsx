"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  MapPin,
  Gauge,
  Award,
  Clock,
  ChevronDown,
  Bike,
  Zap,
  Shield,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  findMatches,
  DEMO_USER_PROFILE,
  RIDER_PROFILES,
  UK_REGIONS,
  type RiderProfile,
  type RidingStyle,
  type SkillLevel,
  type RideFrequency,
  type MatchResult,
} from "@/lib/ride-matcher";

/* ─── Score color helper ──────────────────────────────────────────── */
function scoreColor(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 80) return "#cc0000";
  return "#f59e0b";
}

/* ─── Match card ──────────────────────────────────────────────────── */
function MatchCard({ match, rank }: { match: MatchResult; rank: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-[#0e0e0e] transition-all hover:bg-[#111]"
      style={{ border: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm text-white"
                style={{ background: scoreColor(match.score) + "20", color: scoreColor(match.score) }}
              >
                {match.rider.avatar}
              </div>
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-black text-white"
                style={{ background: scoreColor(match.score) }}
              >
                {rank}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">{match.rider.name}</h3>
              <p className="text-white/30 text-xs">{match.rider.bike}</p>
            </div>
          </div>

          {/* Score ring */}
          <div className="text-right">
            <div className="font-black text-2xl" style={{ color: scoreColor(match.score) }}>
              {match.score}%
            </div>
            <div className="text-[0.55rem] text-white/25 font-bold uppercase tracking-wider">
              match
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-4 text-[0.65rem] text-white/40 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            ~{Math.round(match.distanceKm)}km
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-3 h-3" />
            {match.rider.ridingStyle}
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            {match.rider.skillLevel}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {match.rider.rideFrequency}
          </div>
        </div>

        {/* Explanation */}
        <p className="text-white/50 text-xs leading-relaxed mb-3">
          {match.explanation}
        </p>

        {/* Expand/collapse scoring breakdown */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/20 hover:text-white/50 uppercase tracking-wider transition-colors"
        >
          <ChevronDown
            className="w-3 h-3 transition-transform"
            style={{ transform: expanded ? "rotate(180deg)" : "none" }}
          />
          Scoring breakdown
        </button>

        {expanded && (
          <div className="mt-3 pt-3 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            {[
              { label: "Proximity", value: match.factors.proximity, weight: "40%" },
              { label: "Riding style", value: match.factors.style, weight: "25%" },
              { label: "Skill level", value: match.factors.skill, weight: "20%" },
              { label: "Frequency", value: match.factors.frequency, weight: "15%" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="text-[0.6rem] text-white/30 w-20">{f.label}</span>
                <div className="flex-1 h-1.5 bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${f.value}%`,
                      background: f.value >= 80 ? "#22c55e" : f.value >= 60 ? "#f59e0b" : "#ef4444",
                    }}
                  />
                </div>
                <span className="text-[0.55rem] text-white/25 w-8 text-right">{f.value}</span>
                <span className="text-[0.5rem] text-white/15 w-6 text-right">{f.weight}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[0.55rem] text-white/15">
            {match.rider.totalRides} rides · Member since {match.rider.memberSince}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/15">
          <Shield className="w-3 h-3" />
          Approx. location only
        </div>
      </div>
    </div>
  );
}

/* ─── Profile setup form ──────────────────────────────────────────── */
function ProfileSetup({
  profile,
  onChange,
}: {
  profile: RiderProfile;
  onChange: (p: RiderProfile) => void;
}) {
  return (
    <div
      className="bg-[#0a0a0a] p-5 space-y-4"
      style={{ border: "1px solid rgba(255,255,255,0.04)" }}
    >
      <p className="text-[0.6rem] font-bold text-white/20 uppercase tracking-[0.2em]">
        Your Riding Profile
      </p>

      {/* Region */}
      <div>
        <label className="block text-[0.6rem] text-white/30 font-bold uppercase tracking-wider mb-1.5">
          Region
        </label>
        <select
          value={profile.region}
          onChange={(e) => {
            const region = UK_REGIONS.find((r) => r.label === e.target.value);
            if (region) {
              onChange({ ...profile, region: region.label, latitude: region.lat, longitude: region.lng });
            }
          }}
          className="w-full bg-[#111] text-white text-sm px-3 py-2.5 focus:outline-none appearance-none cursor-pointer"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {UK_REGIONS.map((r) => (
            <option key={r.label} value={r.label}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Riding Style */}
      <div>
        <label className="block text-[0.6rem] text-white/30 font-bold uppercase tracking-wider mb-1.5">
          Riding Style
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(["spirited", "touring", "track"] as RidingStyle[]).map((s) => (
            <button
              key={s}
              onClick={() => onChange({ ...profile, ridingStyle: s })}
              className={`py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                profile.ridingStyle === s
                  ? "bg-[#cc0000] text-white"
                  : "bg-white/[0.03] text-white/30 hover:text-white/60"
              }`}
              style={{
                border:
                  profile.ridingStyle === s
                    ? "1px solid #cc0000"
                    : "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Level */}
      <div>
        <label className="block text-[0.6rem] text-white/30 font-bold uppercase tracking-wider mb-1.5">
          Skill Level
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(["novice", "intermediate", "advanced"] as SkillLevel[]).map((s) => (
            <button
              key={s}
              onClick={() => onChange({ ...profile, skillLevel: s })}
              className={`py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                profile.skillLevel === s
                  ? "bg-[#cc0000] text-white"
                  : "bg-white/[0.03] text-white/30 hover:text-white/60"
              }`}
              style={{
                border:
                  profile.skillLevel === s
                    ? "1px solid #cc0000"
                    : "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Ride Frequency */}
      <div>
        <label className="block text-[0.6rem] text-white/30 font-bold uppercase tracking-wider mb-1.5">
          Ride Frequency
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(["weekly", "monthly", "occasional"] as RideFrequency[]).map((f) => (
            <button
              key={f}
              onClick={() => onChange({ ...profile, rideFrequency: f })}
              className={`py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                profile.rideFrequency === f
                  ? "bg-[#cc0000] text-white"
                  : "bg-white/[0.03] text-white/30 hover:text-white/60"
              }`}
              style={{
                border:
                  profile.rideFrequency === f
                    ? "1px solid #cc0000"
                    : "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────── */
export default function RideMatcherClient() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<RiderProfile>(DEMO_USER_PROFILE);

  const matches = useMemo(() => {
    return findMatches(profile, RIDER_PROFILES, 8);
  }, [profile]);

  return (
    <div className="bg-black min-h-screen text-white" style={{ paddingTop: 72 }}>
      {/* ── Hero header ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #001a0a 0%, #060606 60%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(34,197,94,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
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
                RIDE MATCHER
              </h1>
            </div>
          </div>
          <p className="text-white/40 text-sm font-light max-w-md leading-relaxed">
            AI-powered rider matching. Find compatible Ducati riding
            partners near you based on style, skill, frequency, and
            proximity.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-5 mt-6">
            <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/25 uppercase tracking-[0.15em]">
              <Users className="w-3 h-3 text-green-400" />
              {RIDER_PROFILES.length} riders
            </div>
            <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/25 uppercase tracking-[0.15em]">
              <MapPin className="w-3 h-3 text-green-400" />
              {UK_REGIONS.length} regions
            </div>
            <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-white/25 uppercase tracking-[0.15em]">
              <Zap className="w-3 h-3 text-green-400" />
              Weighted scoring
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar: profile setup */}
          <div className="space-y-4">
            <ProfileSetup profile={profile} onChange={setProfile} />

            {/* Algorithm info */}
            <div
              className="bg-[#0a0a0a] p-5"
              style={{ border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <p className="text-[0.6rem] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">
                How Matching Works
              </p>
              <div className="space-y-2.5 text-[0.65rem] text-white/30 leading-relaxed">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-green-400/60" />
                  <span><strong className="text-white/50">Proximity (40%)</strong> — Geographic distance via Haversine formula</span>
                </div>
                <div className="flex items-start gap-2">
                  <Gauge className="w-3 h-3 mt-0.5 shrink-0 text-green-400/60" />
                  <span><strong className="text-white/50">Riding Style (25%)</strong> — Spirited, touring, or track compatibility</span>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-3 h-3 mt-0.5 shrink-0 text-green-400/60" />
                  <span><strong className="text-white/50">Skill Level (20%)</strong> — Safety-first matching prevents dangerous pairings</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3 h-3 mt-0.5 shrink-0 text-green-400/60" />
                  <span><strong className="text-white/50">Frequency (15%)</strong> — How often you ride</span>
                </div>
              </div>
            </div>

            {/* Privacy notice */}
            <div
              className="bg-[#0a0a0a] p-5"
              style={{ border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-3.5 h-3.5 text-green-400/60" />
                <p className="text-[0.6rem] font-bold text-white/20 uppercase tracking-[0.2em]">
                  Privacy
                </p>
              </div>
              <p className="text-[0.6rem] text-white/25 leading-relaxed">
                Exact coordinates are never shared. Only approximate distance
                and region are shown. GDPR compliant. You control your
                profile visibility.
              </p>
            </div>
          </div>

          {/* Right: matches */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.2em]">
                Your Matches · {matches.length} compatible riders
              </p>
              <p className="text-[0.55rem] text-white/15">
                Min. 70% compatibility · Within 200km
              </p>
            </div>

            {matches.length === 0 ? (
              <div
                className="bg-[#0a0a0a] p-12 text-center"
                style={{ border: "1px solid rgba(255,255,255,0.04)" }}
              >
                <Users className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/30 text-sm mb-2">
                  No compatible riders found
                </p>
                <p className="text-white/15 text-xs">
                  Try adjusting your riding style or expanding your region
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {matches.map((match, i) => (
                  <MatchCard key={match.rider.userId} match={match} rank={i + 1} />
                ))}
              </div>
            )}

            {/* All riders grid */}
            <div className="mt-10">
              <p className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.2em] mb-4">
                All Riders in Network · {RIDER_PROFILES.length}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {RIDER_PROFILES.map((rider) => (
                  <div
                    key={rider.userId}
                    className="bg-[#0a0a0a] p-3 transition-colors hover:bg-[#111]"
                    style={{ border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-[0.5rem] font-black text-white/40">
                        {rider.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white/70 text-[0.7rem] font-bold truncate">
                          {rider.name}
                        </p>
                        <p className="text-white/20 text-[0.55rem] truncate">
                          {rider.region}
                        </p>
                      </div>
                    </div>
                    <p className="text-white/25 text-[0.55rem] truncate">{rider.bike}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[0.5rem] text-white/15">
                      <span>{rider.ridingStyle}</span>
                      <span>·</span>
                      <span>{rider.skillLevel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
