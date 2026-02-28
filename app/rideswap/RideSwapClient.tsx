"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Shield, Star, ArrowRight, X, Check,
  Calendar, MapPin, Repeat2, ChevronDown, ChevronUp, Zap, Info,
} from "lucide-react";
import {
  SWAP_LISTINGS, INSURANCE_TIERS, MY_BIKES,
  type SwapListing, type InsuranceTier,
} from "@/lib/swap-data";

/* ─── helpers ──────────────────────────────────────────────────────── */
function Stars({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className="w-3 h-3" fill={i <= Math.round(n) ? "#cc0000" : "none"} color={i <= Math.round(n) ? "#cc0000" : "rgba(255,255,255,0.2)"} />
      ))}
      <span className="text-white/40 text-[0.65rem] ml-1 font-bold">{n}</span>
    </span>
  );
}

const EXP_COLOR: Record<string, string> = {
  "Beginner Friendly": "#22c55e",
  "Intermediate": "#f59e0b",
  "Advanced": "#cc0000",
};

/* ─── Insurance Quote Modal ─────────────────────────────────────────── */
function InsuranceModal({
  listing,
  days,
  onClose,
  onConfirm,
}: {
  listing: SwapListing;
  days: number;
  onClose: () => void;
  onConfirm: (tier: InsuranceTier) => void;
}) {
  const [selected, setSelected] = useState<string>("plus");
  const tier = INSURANCE_TIERS.find(t => t.id === selected)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f0f0f] border border-white/[0.08] shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-[#cc0000]" />
              <span className="text-[0.65rem] font-black text-[#cc0000] uppercase tracking-[0.2em]">SwapShield Insurance</span>
            </div>
            <h2 className="font-black text-white text-xl">Choose your cover</h2>
            <p className="text-white/35 text-xs mt-1">
              Covering: {listing.bike} ({listing.year}) · {days} day{days > 1 ? "s" : ""} · Up to £{listing.insuredValue.toLocaleString()}
            </p>
          </div>
          <button onClick={onClose} className="text-white/25 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tiers */}
        <div className="p-6 space-y-3">
          {INSURANCE_TIERS.map(t => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`w-full text-left rounded-xl border p-4 transition-all ${
                selected === t.id
                  ? "border-[#cc0000] bg-[#cc0000]/[0.06]"
                  : "border-white/[0.07] bg-[#141414] hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-black text-white text-sm">{t.name}</span>
                    {t.recommended && (
                      <span className="text-[0.6rem] font-black px-2 py-0.5 rounded-full bg-[#cc0000] text-white uppercase tracking-wider">Recommended</span>
                    )}
                  </div>
                  <p className="text-white/35 text-xs mb-3">{t.tagline}</p>
                  <ul className="space-y-1">
                    {t.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/55">
                        <Check className="w-3 h-3 text-[#cc0000] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-white text-2xl leading-none">£{(t.priceDay * days).toFixed(0)}</div>
                  <div className="text-white/30 text-[0.65rem] mt-0.5">£{t.priceDay}/day · {days}d</div>
                  <div className="text-white/25 text-[0.6rem] mt-2">{t.excess === 0 ? "Zero excess" : `£${t.excess.toLocaleString()} excess`}</div>
                  <div className="text-white/25 text-[0.6rem]">Up to £{(t.cover / 1000).toFixed(0)}k cover</div>
                </div>
              </div>
              {/* Selected tick */}
              {selected === t.id && (
                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#cc0000] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs text-[#cc0000] font-bold">Selected</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mx-6 mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-white/25 shrink-0 mt-0.5" />
          <p className="text-white/25 text-[0.65rem] leading-relaxed">
            SwapShield is a prototype insurance concept. In a live product this would be underwritten by a registered FCA-authorised insurer.
            All cover amounts are illustrative. Not a real insurance product.
          </p>
        </div>

        {/* CTA */}
        <div className="p-6 border-t border-white/[0.06] flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/[0.08] text-white/50 hover:text-white text-sm font-bold transition-colors">
            Back
          </button>
          <button
            onClick={() => onConfirm(tier)}
            className="flex-1 py-3 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{ background: "#cc0000" }}
          >
            <Shield className="w-4 h-4" />
            Add {tier.name} · £{(tier.priceDay * days).toFixed(0)}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Swap Request Modal ────────────────────────────────────────────── */
function SwapRequestModal({
  listing,
  onClose,
}: {
  listing: SwapListing;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"details" | "insurance" | "confirm" | "done">("details");
  const [swapType, setSwapType] = useState<"day" | "rideout">(listing.swapType[0]);
  const [days, setDays] = useState(1);
  const [myBike, setMyBike] = useState(MY_BIKES[0].id);
  const [message, setMessage] = useState("");
  const [chosenTier, setChosenTier] = useState<InsuranceTier | null>(null);
  const [skipInsurance, setSkipInsurance] = useState(false);

  const selectedBike = MY_BIKES.find(b => b.id === myBike)!;
  const totalInsurance = chosenTier ? chosenTier.priceDay * days : 0;

  if (step === "insurance") {
    return (
      <InsuranceModal
        listing={listing}
        days={days}
        onClose={() => setStep("details")}
        onConfirm={(tier) => { setChosenTier(tier); setStep("confirm"); }}
      />
    );
  }

  if (step === "done") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="w-full max-w-md rounded-2xl bg-[#0f0f0f] border border-white/[0.08] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#cc0000]/15 border border-[#cc0000]/30 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#cc0000]" />
          </div>
          <h2 className="font-black text-white text-2xl mb-2">Swap Requested!</h2>
          <p className="text-white/45 text-sm leading-relaxed mb-4">
            Your request to swap for the <strong className="text-white">{listing.bike}</strong> has been sent to {listing.ownerName}.
            They&apos;ll respond within 24 hours.
          </p>
          {chosenTier && (
            <div className="rounded-xl bg-[#cc0000]/[0.07] border border-[#cc0000]/20 p-4 mb-6 text-left">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-[#cc0000]" />
                <span className="font-bold text-white text-sm">{chosenTier.name} added</span>
              </div>
              <p className="text-white/40 text-xs">
                Cover activates when {listing.ownerName} confirms the swap. Digital certificate will be emailed.
              </p>
            </div>
          )}
          {!chosenTier && (
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-4 mb-6 flex items-start gap-2">
              <Info className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
              <p className="text-white/35 text-xs text-left">No SwapShield cover added. You may want to check your own policy covers riding another member&apos;s bike.</p>
            </div>
          )}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-black text-sm text-white"
            style={{ background: "#cc0000" }}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f0f0f] border border-white/[0.08] shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Repeat2 className="w-4 h-4 text-[#cc0000]" />
              <span className="text-[0.65rem] font-black text-[#cc0000] uppercase tracking-[0.2em]">
                {step === "confirm" ? "Confirm Swap" : "Request a Swap"}
              </span>
            </div>
            <h2 className="font-black text-white text-xl">{listing.bike}</h2>
            <p className="text-white/35 text-xs mt-0.5">{listing.year} · {listing.color} · {listing.location}</p>
          </div>
          <button onClick={onClose} className="text-white/25 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "details" && (
          <div className="p-6 space-y-5">
            {/* Swap type */}
            <div>
              <label className="text-[0.65rem] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">Swap Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(["day", "rideout"] as const).filter(t => listing.swapType.includes(t)).map(t => (
                  <button
                    key={t}
                    onClick={() => setSwapType(t)}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                      swapType === t ? "border-[#cc0000] bg-[#cc0000]/10 text-white" : "border-white/[0.07] text-white/40 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    {t === "day" ? "🗓 Day Swap" : "🏍 Rideout Swap"}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="text-[0.65rem] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">Duration (days)</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDays(d => Math.max(1, d - 1))}
                  className="w-10 h-10 rounded-xl border border-white/[0.07] text-white/50 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center font-black"
                >−</button>
                <span className="font-black text-white text-2xl w-12 text-center tabular-nums">{days}</span>
                <button
                  onClick={() => setDays(d => Math.min(7, d + 1))}
                  className="w-10 h-10 rounded-xl border border-white/[0.07] text-white/50 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center font-black"
                >+</button>
                <span className="text-white/25 text-xs ml-1">max 7 days</span>
              </div>
            </div>

            {/* My bike */}
            <div>
              <label className="text-[0.65rem] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">Offering in return</label>
              <div className="space-y-2">
                {MY_BIKES.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setMyBike(b.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      myBike === b.id ? "border-[#cc0000] bg-[#cc0000]/[0.06]" : "border-white/[0.07] bg-[#141414] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white text-sm">{b.year} {b.name}</p>
                        <p className="text-white/30 text-xs">{b.reg}</p>
                      </div>
                      {myBike === b.id && <Check className="w-4 h-4 text-[#cc0000]" />}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-white/20 text-xs mt-2 italic">
                {listing.ownerName} is looking for: <span className="text-white/35">{listing.wantsToRide}</span>
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="text-[0.65rem] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">Message to {listing.ownerName}</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={`Hi ${listing.ownerName.split(" ")[0]}, I'd love to swap for your ${listing.bike}...`}
                rows={3}
                className="w-full bg-[#141414] border border-white/[0.07] rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#cc0000]/50 resize-none transition-colors"
              />
            </div>

            {/* Insurance CTA */}
            <div
              className="rounded-xl border border-[#cc0000]/20 bg-[#cc0000]/[0.05] p-4 cursor-pointer hover:border-[#cc0000]/40 transition-colors"
              onClick={() => setStep("insurance")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#cc0000] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-sm">Add SwapShield cover</p>
                    <p className="text-white/35 text-xs mt-0.5">From £{INSURANCE_TIERS[0].priceDay}/day · Fully comprehensive available</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#cc0000]" />
              </div>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="p-6 space-y-4">
            <div className="rounded-xl bg-[#141414] border border-white/[0.07] divide-y divide-white/[0.06]">
              {[
                { label: "Swap", value: `${listing.bike} (${listing.year})` },
                { label: "Type", value: swapType === "day" ? "Day Swap" : "Rideout Swap" },
                { label: "Duration", value: `${days} day${days > 1 ? "s" : ""}` },
                { label: "You offer", value: `${selectedBike.year} ${selectedBike.name}` },
                { label: "Owner", value: listing.ownerName },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span className="text-white/35">{row.label}</span>
                  <span className="font-bold text-white">{row.value}</span>
                </div>
              ))}
            </div>

            {chosenTier ? (
              <div className="rounded-xl bg-[#cc0000]/[0.07] border border-[#cc0000]/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#cc0000]" />
                  <div>
                    <p className="font-bold text-white text-xs">{chosenTier.name}</p>
                    <p className="text-white/35 text-[0.65rem]">Up to £{(chosenTier.cover/1000).toFixed(0)}k cover · {chosenTier.excess === 0 ? "Zero excess" : `£${chosenTier.excess} excess`}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-white text-sm">£{(chosenTier.priceDay * days).toFixed(0)}</p>
                  <button onClick={() => setStep("insurance")} className="text-[#cc0000] text-[0.6rem] font-bold">Change</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setStep("insurance")}
                className="w-full p-4 rounded-xl border border-white/[0.07] text-left hover:border-[#cc0000]/30 transition-colors flex items-center gap-3"
              >
                <Shield className="w-4 h-4 text-white/20" />
                <span className="text-white/35 text-xs">No SwapShield added — tap to add cover</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/20 ml-auto" />
              </button>
            )}

            <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
              <span className="text-white/35 text-sm">Total due today</span>
              <span className="font-black text-white text-2xl">£{totalInsurance.toFixed(0)}{totalInsurance === 0 ? " — Free" : ""}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-white/[0.06] flex gap-3">
          <button
            onClick={step === "confirm" ? () => setStep("details") : onClose}
            className="flex-1 py-3 rounded-xl border border-white/[0.08] text-white/50 hover:text-white text-sm font-bold transition-colors"
          >
            {step === "confirm" ? "Back" : "Cancel"}
          </button>
          <button
            onClick={step === "details" ? () => setStep("confirm") : () => setStep("done")}
            className="flex-1 py-3 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            style={{ background: "#cc0000" }}
          >
            {step === "details" ? <><ArrowRight className="w-4 h-4" /> Review Swap</> : <><Check className="w-4 h-4" /> Send Request</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Listing Card ──────────────────────────────────────────────────── */
function ListingCard({ listing, onRequest }: { listing: SwapListing; onRequest: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${
      listing.active ? "border-white/[0.08] bg-[#0f0f0f]" : "border-white/[0.04] bg-[#0a0a0a] opacity-60"
    }`}>
      {/* Bike image header */}
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${listing.image})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,15,1) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.3) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-1 w-full" style={{ background: listing.active ? "#cc0000" : "#333" }} />
      </div>

      <div className="p-5">
        {/* Owner + status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#cc0000] flex items-center justify-center font-black text-xs text-white shrink-0">
              {listing.ownerAvatar}
            </div>
            <div>
              <p className="font-bold text-white text-sm">{listing.ownerName}</p>
              <Stars n={listing.ownerRating} />
            </div>
          </div>
          <div className="text-right">
            {listing.active ? (
              <span className="inline-flex items-center gap-1 text-[0.6rem] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#cc0000]/15 text-[#cc0000] border border-[#cc0000]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] animate-pulse" /> Available
              </span>
            ) : (
              <span className="text-[0.6rem] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.05] text-white/30">
                Unavailable
              </span>
            )}
          </div>
        </div>

        {/* Bike */}
        <div className="mb-4">
          <h3 className="font-black text-white text-xl leading-tight tracking-tight mb-0.5">
            {listing.bike}
          </h3>
          <p className="text-white/35 text-xs">{listing.year} · {listing.color} · {listing.mileage.toLocaleString()} mi</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {listing.tags.map(t => (
            <span key={t} className="text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.05] text-white/40 border border-white/[0.06]">
              {t}
            </span>
          ))}
          <span
            className="text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
            style={{ color: EXP_COLOR[listing.experience], borderColor: `${EXP_COLOR[listing.experience]}40`, background: `${EXP_COLOR[listing.experience]}10` }}
          >
            {listing.experience}
          </span>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#141414] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-0.5">
              <MapPin className="w-3 h-3 text-[#cc0000]" />
              <span className="text-white/25 text-[0.6rem] font-bold uppercase tracking-wider">Location</span>
            </div>
            <p className="text-white text-xs font-bold">{listing.location}</p>
          </div>
          <div className="bg-[#141414] rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Calendar className="w-3 h-3 text-[#cc0000]" />
              <span className="text-white/25 text-[0.6rem] font-bold uppercase tracking-wider">When</span>
            </div>
            <p className="text-white text-xs font-bold">{listing.availableDates}</p>
          </div>
        </div>

        {/* Swap type badges */}
        <div className="flex gap-2 mb-4">
          {listing.swapType.map(t => (
            <span key={t} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-white/[0.08] text-white/50">
              <Repeat2 className="w-3 h-3 text-[#cc0000]" />
              {t === "day" ? "Day Swap" : "Rideout Swap"}
            </span>
          ))}
        </div>

        {/* Expandable description */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1 text-white/30 hover:text-white/60 text-xs font-bold transition-colors mb-3"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? "Less" : "Read more"}
        </button>

        {expanded && (
          <div className="mb-4">
            <p className="text-white/50 text-sm leading-relaxed">{listing.description}</p>
            <p className="text-white/25 text-xs mt-3 italic">
              Owner wants to ride: <span className="text-white/40 not-italic font-bold">{listing.wantsToRide}</span>
            </p>
          </div>
        )}

        {/* Swaps completed */}
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-3.5 h-3.5 text-[#cc0000]" />
          <span className="text-white/30 text-xs">{listing.swapsCompleted} successful swaps completed</span>
        </div>

        {/* CTA */}
        {listing.active && (
          <button
            onClick={onRequest}
            className="w-full py-3 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            style={{ background: "#cc0000" }}
          >
            <Repeat2 className="w-4 h-4" /> Request Swap
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function RideSwapClient() {
  const [requestListing, setRequestListing] = useState<SwapListing | null>(null);
  const [filter, setFilter] = useState<"all" | "day" | "rideout">("all");
  const [expFilter, setExpFilter] = useState<string>("all");

  const visible = SWAP_LISTINGS.filter(l => {
    if (filter !== "all" && !l.swapType.includes(filter)) return false;
    if (expFilter !== "all" && l.experience !== expFilter) return false;
    return true;
  });

  const activeCount = SWAP_LISTINGS.filter(l => l.active).length;

  return (
    <div className="bg-[#070707] min-h-screen text-white" style={{ paddingTop: 72 }}>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-white/[0.05]"
        style={{ background: "linear-gradient(160deg,#1a0000 0%,#0a0a0a 60%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 100% at 85% 50%, rgba(204,0,0,0.13) 0%, transparent 70%)"
        }} />
        {/* Large watermark */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block" style={{
          fontSize: "clamp(8rem,18vw,18rem)", fontWeight: 900, lineHeight: 1,
          color: "transparent", WebkitTextStroke: "1px rgba(204,0,0,0.08)", letterSpacing: "-0.05em",
        }}>SWAP</div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Repeat2 className="w-4 h-4 text-[#cc0000]" />
                <span className="text-[0.65rem] font-black text-[#cc0000] uppercase tracking-[0.2em]">Members Only</span>
              </div>
              <h1 className="font-black text-white mb-3" style={{
                fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 0.88, letterSpacing: "-0.04em",
              }}>
                RIDE<br /><span style={{ color: "#cc0000" }}>SWAP</span>
              </h1>
              <p className="text-white/40 text-base font-light max-w-md leading-relaxed">
                Ride a fellow member&apos;s Ducati for a day or on a group rideout.
                Covered by <strong className="text-white">SwapShield</strong> — our prototype same-day insurance product.
              </p>
            </div>

            {/* Shield callout */}
            <div className="rounded-2xl border border-[#cc0000]/20 bg-[#cc0000]/[0.05] p-5 max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-[#cc0000]" />
                <span className="font-black text-white text-sm">SwapShield Insurance</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed mb-3">
                Every swap can be covered by SwapShield — from basic third-party to fully comprehensive with zero excess. Instant digital certificate.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[#cc0000] font-black text-lg">from £12</span>
                <span className="text-white/30 text-xs">/ day</span>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/[0.05]">
            {[
              { value: `${activeCount}`, label: "Bikes available now" },
              { value: `${SWAP_LISTINGS.reduce((s,l)=>s+l.swapsCompleted,0)}`, label: "Swaps completed" },
              { value: "from £12", label: "SwapShield cover" },
              { value: "< 24h", label: "Avg response time" },
            ].map(s => (
              <div key={s.label}>
                <div className="font-black text-white text-2xl leading-none">{s.value}</div>
                <div className="text-white/25 text-[0.65rem] font-bold uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <div className="border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <p className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.2em] mb-8">How It Works</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Browse Listings", desc: "Find a Ducati you've always wanted to experience. Filter by type, location or experience level." },
              { step: "02", title: "Request a Swap", desc: "Tell the owner which of your bikes you're offering in return and when you'd like to ride." },
              { step: "03", title: "Add SwapShield", desc: "Choose your cover level. Digital certificate issued instantly. From £12/day." },
              { step: "04", title: "Go Ride", desc: "Owner confirms, keys are exchanged, and you both experience something new." },
            ].map(s => (
              <div key={s.step} className="flex gap-4">
                <div className="text-[0.65rem] font-black text-[#cc0000] w-6 shrink-0 pt-0.5">{s.step}</div>
                <div>
                  <h3 className="font-black text-white text-sm mb-1">{s.title}</h3>
                  <p className="text-white/35 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LISTINGS ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <p className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.2em]">
            {visible.length} listing{visible.length !== 1 ? "s" : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {/* Type filter */}
            {(["all","day","rideout"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  filter === f ? "bg-[#cc0000] border-[#cc0000] text-white" : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60"
                }`}>
                {f === "all" ? "All" : f === "day" ? "Day Swap" : "Rideout"}
              </button>
            ))}
            <div className="w-px bg-white/[0.08] mx-1" />
            {/* Experience filter */}
            {["all", "Beginner Friendly", "Intermediate", "Advanced"].map(e => (
              <button key={e} onClick={() => setExpFilter(e)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  expFilter === e ? "bg-[#cc0000] border-[#cc0000] text-white" : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60"
                }`}>
                {e === "all" ? "Any Level" : e}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visible.map(l => (
            <ListingCard key={l.id} listing={l} onRequest={() => setRequestListing(l)} />
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/25 text-sm">No listings match your filters.</p>
          </div>
        )}
      </div>

      {/* ── SWAPSHIELD EXPLAINER ────────────────────────────────────── */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-[#cc0000]" />
            <p className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.2em]">SwapShield Insurance</p>
          </div>
          <h2 className="font-black text-white text-3xl sm:text-4xl mb-4 tracking-tight">
            Swap with confidence.
          </h2>
          <p className="text-white/35 text-base max-w-xl leading-relaxed mb-10">
            SwapShield is our purpose-built cover concept for Ducati-to-Ducati bike swaps.
            Choose your tier, get an instant digital certificate, and ride knowing you&apos;re protected.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INSURANCE_TIERS.map(t => (
              <div key={t.id} className={`rounded-2xl border p-6 ${
                t.recommended ? "border-[#cc0000]/40 bg-[#cc0000]/[0.05]" : "border-white/[0.07] bg-[#0f0f0f]"
              }`}>
                {t.recommended && (
                  <span className="inline-block text-[0.6rem] font-black px-2.5 py-1 rounded-full bg-[#cc0000] text-white uppercase tracking-wider mb-3">Most popular</span>
                )}
                <h3 className="font-black text-white text-lg mb-1">{t.name}</h3>
                <p className="text-white/30 text-xs mb-4">{t.tagline}</p>
                <div className="mb-4">
                  <span className="font-black text-white text-3xl">£{t.priceDay}</span>
                  <span className="text-white/30 text-sm"> / day</span>
                </div>
                <ul className="space-y-2">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-white/50">
                      <Check className="w-3 h-3 text-[#cc0000] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-white/15 text-xs mt-6 max-w-xl">
            SwapShield is a prototype concept only. Cover would be underwritten by a registered FCA-authorised insurer in a live product. This is not a real insurance product and no real cover is provided.
          </p>
        </div>
      </div>

      {/* ── LIST YOUR BIKE CTA ──────────────────────────────────────── */}
      <div className="border-t border-white/[0.05] bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="eyebrow text-[#cc0000] mb-3">List Your Bike</p>
            <h3 className="font-black text-white text-2xl tracking-tight mb-2">Let others experience your Ducati.</h3>
            <p className="text-white/35 text-sm max-w-sm">Add your bike to RideSwap and let trusted DOCLSE members ride it — while you try theirs.</p>
          </div>
          <Link href="/login"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white hover:opacity-90 transition-all shrink-0"
            style={{ background: "#cc0000" }}>
            <Repeat2 className="w-4 h-4" /> List My Bike
          </Link>
        </div>
      </div>

      {/* Modal */}
      {requestListing && (
        <SwapRequestModal listing={requestListing} onClose={() => setRequestListing(null)} />
      )}
    </div>
  );
}
