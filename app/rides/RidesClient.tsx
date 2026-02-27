"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Calendar, MapPin, Users, Clock, ChevronRight, Check, X } from "lucide-react";
import { rides, type Ride, type MeetPoint } from "@/lib/rides";
import type { ComponentType } from "react";

interface RideMapProps {
  ride: Ride;
  selectedPoint: string | null;
  onSelectPoint: (id: string) => void;
}

const RideMap = dynamic(() => import("./RideMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] bg-gray-900 flex items-center justify-center text-gray-500 text-sm">Loading map…</div>
  ),
}) as ComponentType<RideMapProps>;

const difficultyColor: Record<string, string> = {
  "Beginner Friendly": "#4caf50",
  "Intermediate": "#c8a951",
  "Advanced": "#cc0000",
};

function JoinModal({ ride, onClose }: { ride: Ride; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bike, setBike] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#111] border border-[#cc0000]/40 max-w-[560px] w-full relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#cc0000] px-6 py-5 flex justify-between items-center">
          <div>
            <div className="font-black text-xl tracking-widest text-white uppercase">Join Ride</div>
            <div className="text-white/80 text-sm tracking-widest">{ride.title}</div>
          </div>
          <button onClick={onClose} className="text-white bg-transparent border-0 cursor-pointer p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#cc0000]/15 border-2 border-[#cc0000] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={28} className="text-[#cc0000]" />
              </div>
              <h3 className="font-black text-3xl text-white mb-3">YOU&apos;RE IN!</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-1">
                You&apos;ve been registered for <strong className="text-white">{ride.title}</strong>.
              </p>
              <p className="text-white/50 text-sm">
                Meeting at: <span className="text-[#cc0000]">{ride.meetPoints.find(p => p.id === selected)?.label || ride.meetPoints[0].label}</span>
              </p>
              <p className="text-white/40 text-xs mt-2">Confirmation sent to {email}</p>
              <p className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded px-3 py-2 inline-block mt-3">🔔 Demo mode — no data was saved</p>
              <br />
              <button className="mt-5 bg-[#cc0000] hover:bg-[#990000] text-white font-bold px-6 py-2.5 text-sm tracking-widest uppercase transition-colors cursor-pointer border-0" onClick={onClose}>Done</button>
            </div>
          ) : step === 1 ? (
            <>
              <h3 className="font-bold text-xs tracking-[0.15em] uppercase text-white/50 mb-4">Choose your meet point</h3>
              <div className="flex flex-col gap-3 mb-6">
                {ride.meetPoints.map((pt: MeetPoint, i: number) => (
                  <div key={pt.id} onClick={() => setSelected(pt.id)}
                    className="p-4 cursor-pointer transition-all flex items-center gap-4"
                    style={{ border: `1px solid ${selected === pt.id ? "#cc0000" : "rgba(255,255,255,0.1)"}`, background: selected === pt.id ? "rgba(204,0,0,0.1)" : "transparent" }}>
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center font-black text-white"
                      style={{ background: selected === pt.id ? "#cc0000" : "rgba(255,255,255,0.08)" }}>
                      {pt.id}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm">{pt.label}</div>
                      <div className="flex items-center gap-1 text-white/40 text-xs mt-0.5">
                        <Clock size={11} /> {pt.time}
                        {i === 0 && <span className="bg-[#cc0000] text-white text-[0.6rem] px-1.5 py-0.5 font-bold uppercase tracking-widest ml-2">Start</span>}
                      </div>
                    </div>
                    {selected === pt.id && <Check size={16} className="text-[#cc0000]" />}
                  </div>
                ))}
              </div>
              <button
                className="w-full flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#990000] disabled:opacity-50 text-white font-bold px-6 py-3 text-sm tracking-widest uppercase transition-colors cursor-pointer border-0"
                disabled={!selected} onClick={() => selected && setStep(2)}>
                Continue <ChevronRight size={16} />
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="font-bold text-xs tracking-[0.15em] uppercase text-white/50 mb-5">Your details</h3>
              {[
                { label: "Full Name", value: name, set: setName, type: "text", placeholder: "Your name" },
                { label: "Email Address", value: email, set: setEmail, type: "email", placeholder: "your@email.com" },
                { label: "Your Ducati", value: bike, set: setBike, type: "text", placeholder: "e.g. Panigale V4S 2023" },
              ].map(f => (
                <div key={f.label} className="mb-4">
                  <label className="block font-bold text-xs tracking-[0.15em] uppercase text-white/50 mb-1.5">{f.label}</label>
                  <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} required
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm outline-none focus:border-[#cc0000]/50" />
                </div>
              ))}
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 flex items-center justify-center border border-white/20 hover:border-white/40 text-white/60 hover:text-white bg-transparent font-bold px-4 py-3 text-sm tracking-widest uppercase transition-colors cursor-pointer">
                  Back
                </button>
                <button type="submit"
                  className="flex-[2] flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-bold px-4 py-3 text-sm tracking-widest uppercase transition-colors cursor-pointer border-0">
                  Confirm Registration <Check size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RidesClient() {
  const [selectedRide, setSelectedRide] = useState<Ride>(rides[0]);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [joiningRide, setJoiningRide] = useState<Ride | null>(null);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: "calc(320px + 72px)" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a0000 0%, #0a0a0a 100%)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#cc0000]" />
        <div className="absolute inset-0 flex items-center px-8 max-w-7xl mx-auto" style={{ paddingTop: "72px" }}>
          <div>
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-[#cc0000] mb-3">Plan Your Journey</div>
            <h1 className="font-black text-white leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              RIDE OUTS &amp;<br /><span className="text-[#cc0000]">ROUTE PLANNER</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "2rem", alignItems: "start" }}>

          {/* Ride list */}
          <div>
            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-[#cc0000] mb-5">
              {rides.length} Upcoming Rides
            </h2>
            <div className="flex flex-col gap-3">
              {rides.map(ride => (
                <div key={ride.id} onClick={() => setSelectedRide(ride)}
                  className="p-5 cursor-pointer transition-all"
                  style={{
                    border: `1px solid ${selectedRide?.id === ride.id ? "#cc0000" : "rgba(255,255,255,0.06)"}`,
                    background: selectedRide?.id === ride.id ? "rgba(204,0,0,0.08)" : "rgba(255,255,255,0.02)",
                  }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-base">{ride.title}</h3>
                    <span className="text-[0.65rem] font-bold tracking-widest uppercase ml-2 px-1.5 py-0.5 whitespace-nowrap"
                      style={{ color: difficultyColor[ride.difficulty], border: `1px solid ${difficultyColor[ride.difficulty]}` }}>
                      {ride.difficulty}
                    </span>
                  </div>
                  <div className="flex gap-4 flex-wrap mb-3">
                    <span className="flex items-center gap-1 text-white/45 text-xs">
                      <Calendar size={11} color="#cc0000" />
                      {new Date(ride.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1 text-white/45 text-xs">
                      <MapPin size={11} color="#cc0000" /> {ride.distance}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 text-white/40 text-xs">
                      <Users size={11} color="#cc0000" /> {ride.joined}/{ride.capacity} riders
                    </span>
                    <button onClick={e => { e.stopPropagation(); setJoiningRide(ride); }}
                      className="bg-[#cc0000] hover:bg-[#990000] text-white font-bold text-xs tracking-widest uppercase px-3 py-1.5 transition-colors border-0 cursor-pointer">
                      Join
                    </button>
                  </div>
                  <div className="mt-3 h-0.5 bg-white/5 rounded overflow-hidden">
                    <div className="h-full bg-[#cc0000] rounded" style={{ width: `${(ride.joined / ride.capacity) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map & detail */}
          {selectedRide && (
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <RideMap ride={selectedRide} selectedPoint={selectedPoint} onSelectPoint={setSelectedPoint} />

              <div className="p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                  <div>
                    <h2 className="font-black text-white text-4xl leading-none mb-2">{selectedRide.title}</h2>
                    <div className="flex gap-6 flex-wrap">
                      {[
                        { icon: <Calendar size={13} />, text: `${new Date(selectedRide.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} — ${selectedRide.time}` },
                        { icon: <MapPin size={13} />, text: selectedRide.distance },
                        { icon: <Users size={13} />, text: `Led by ${selectedRide.leader} (${selectedRide.bike})` },
                      ].map((item, i) => (
                        <span key={i} className="flex items-center gap-1 text-white/50 text-sm">
                          <span className="text-[#cc0000]">{item.icon}</span> {item.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setJoiningRide(selectedRide)}
                    className="flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-bold text-sm tracking-widest uppercase px-5 py-3 transition-colors border-0 cursor-pointer">
                    Join This Ride <ChevronRight size={16} />
                  </button>
                </div>

                <p className="text-white/65 text-sm leading-relaxed mb-8">{selectedRide.description}</p>

                <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-[#cc0000] mb-4">
                  Meet Points — click map pins to explore
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
                  {selectedRide.meetPoints.map((pt: MeetPoint, i: number) => (
                    <div key={pt.id} onClick={() => setSelectedPoint(pt.id === selectedPoint ? null : pt.id)}
                      className="p-4 cursor-pointer transition-all"
                      style={{
                        border: `1px solid ${selectedPoint === pt.id ? "#cc0000" : "rgba(255,255,255,0.08)"}`,
                        background: selectedPoint === pt.id ? "rgba(204,0,0,0.08)" : "transparent",
                      }}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 flex items-center justify-center font-black text-sm text-white shrink-0"
                          style={{ background: i === 0 ? "#cc0000" : "rgba(200,169,81,0.8)" }}>
                          {pt.id}
                        </div>
                        <span className="font-semibold text-xs text-white/40 tracking-widest">{pt.time}</span>
                      </div>
                      <div className="text-white/70 text-xs leading-relaxed">{pt.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {joiningRide && <JoinModal ride={joiningRide} onClose={() => setJoiningRide(null)} />}
    </div>
  );
}
