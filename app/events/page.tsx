import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import { EVENTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <div className="bg-black min-h-screen text-white" style={{ paddingTop: 72 }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1a0000 0%, #060606 60%)" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1400&q=80&fit=crop)",
        }} />
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <h1 className="font-black text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
            Events
          </h1>
          <p className="text-white/40 text-sm font-light max-w-md mt-4 leading-relaxed">
            Rideouts, track days, socials, and special events. The DOCLSE calendar — something for every Ducatista.
          </p>
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVENTS.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group block"
            >
              <div className="h-56 relative overflow-hidden mb-4">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{
                  backgroundImage: `url(${event.image})`,
                }} />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 100%)"
                }} />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#cc0000] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 bg-[#cc0000] text-white">{event.category}</span>
                </div>
              </div>
              <h2 className="font-black text-white text-lg mb-2 group-hover:text-[#cc0000] transition-colors leading-tight">
                {event.title}
              </h2>
              <div className="space-y-1 text-[0.7rem] text-white/30">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#cc0000]/60" />
                  <span>{formatDate(event.date)}</span>
                  <span className="text-white/10">·</span>
                  <Clock className="w-3.5 h-3.5 text-[#cc0000]/60" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#cc0000]/60" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
