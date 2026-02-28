import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowLeft, Users } from "lucide-react";
import { EVENTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  return { title: event?.title ?? "Event" };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) notFound();

  const related = EVENTS.filter((e) => e.slug !== slug && e.category === event.category).slice(0, 3);

  return (
    <div className="bg-black min-h-screen text-white" style={{ paddingTop: 72 }}>
      {/* Hero image */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.5) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-10">
          <Link href="/events" className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Events
          </Link>
          <span className="block text-[0.6rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 bg-[#cc0000] text-white w-fit mb-4">{event.category}</span>
          <h1 className="font-black text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.03em" }}>
            {event.title}
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Info strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          <div className="flex items-center gap-3 bg-[#0e0e0e] p-4" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
            <Calendar className="w-4 h-4 text-[#cc0000] shrink-0" />
            <div>
              <p className="text-[0.55rem] text-white/25 font-bold uppercase tracking-wider">Date</p>
              <p className="font-bold text-white text-sm">{formatDate(event.date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#0e0e0e] p-4" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
            <Clock className="w-4 h-4 text-[#cc0000] shrink-0" />
            <div>
              <p className="text-[0.55rem] text-white/25 font-bold uppercase tracking-wider">Time</p>
              <p className="font-bold text-white text-sm">{event.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#0e0e0e] p-4" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
            <MapPin className="w-4 h-4 text-[#cc0000] shrink-0" />
            <div>
              <p className="text-[0.55rem] text-white/25 font-bold uppercase tracking-wider">Location</p>
              <p className="font-bold text-white text-sm">{event.location}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-lg leading-relaxed max-w-2xl mb-10">{event.description}</p>

        {/* CTA */}
        <div className="bg-[#0e0e0e] p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#cc0000]" />
            <div>
              <p className="font-bold text-white text-sm">Want to join this event?</p>
              <p className="text-white/30 text-xs">Login or register to RSVP and get updates.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold text-sm px-6 py-2.5 transition-colors">
              Login to RSVP
            </Link>
            <Link href="/register" className="text-white/40 hover:text-white font-bold text-sm px-6 py-2.5 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              Register
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <p className="text-[0.65rem] font-black text-white/20 uppercase tracking-[0.2em] mb-5">More {event.category} Events</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/events/${r.slug}`}
                  className="group block bg-[#0e0e0e] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="h-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${r.image})` }} />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                  <div className="p-4">
                    <p className="text-[0.6rem] text-white/25 mb-1">{formatDate(r.date)}</p>
                    <p className="font-bold text-white text-sm group-hover:text-[#cc0000] transition-colors">{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
