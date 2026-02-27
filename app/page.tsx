import Link from "next/link";
import { ArrowRight, Calendar, MapPin, ArrowUpRight, ChevronDown } from "lucide-react";
import { EVENTS, RIDE_REPORTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/ScrollReveal";

/* Category gradient fallbacks — pure CSS, no broken external images */
const CAT_GRAD: Record<string, string> = {
  Rideout:  "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
  Training: "linear-gradient(135deg,#0a0a0a,#1a1a0a)",
  Social:   "linear-gradient(135deg,#0a0a0a,#1a000a)",
  Special:  "linear-gradient(135deg,#200000,#0a0a0a)",
};

export default function HomePage() {
  const upcomingEvents = EVENTS.slice(0, 3);
  const latestReports  = RIDE_REPORTS.slice(0, 3);

  return (
    <div>

      {/* ══════════════════════════════════════════════════════════════
          HERO — full viewport, Panigale V4R, cinematic
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden bg-[#0a0a0a]"
        style={{ minHeight: "100svh" }}
      >
        {/* Cinematic gradient base — always visible even if img fails */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(160deg, #1a0000 0%, #0a0a0a 40%, #000 100%)"
        }} />

        {/* No external image — pure CSS hero to avoid broken image issues */}

        {/* Decorative Ducati-red geometry */}
        <div className="absolute top-0 right-0 w-[45vw] h-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to left, rgba(204,0,0,0.18) 0%, transparent 70%)"
          }} />
          <div className="absolute top-0 right-0 bottom-0 w-1 bg-[#cc0000]" />
        </div>

        {/* Large ambient red circle */}
        <div className="absolute pointer-events-none" style={{
          right: "8vw", top: "50%", transform: "translateY(-50%)",
          width: "min(600px, 55vw)", height: "min(600px, 55vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(204,0,0,0.22) 0%, rgba(204,0,0,0.06) 50%, transparent 70%)",
        }} />

        {/* Stylised "V4R" large text watermark */}
        <div className="absolute right-[6vw] top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block" style={{
          fontSize: "clamp(10rem, 22vw, 22rem)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(204,0,0,0.12)",
        }}>
          V4R
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{
          background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)"
        }} />

        {/* Content anchored bottom-left */}
        <div
          className="relative z-10 flex flex-col justify-end pb-20 pt-40"
          style={{ minHeight: "100svh" }}
        >
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
            <div className="pill pill-red mb-8 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] animate-pulse inline-block" />
              Official Ducati Club · London &amp; South East · Est. 2024
            </div>

            <h1
              className="text-white animate-fade-up delay-100 mb-6"
              style={{
                fontWeight: 900,
                fontSize: "clamp(3.2rem, 9vw, 9.5rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
              }}
            >
              DUCATI<br />
              <span style={{ color: "#cc0000" }}>LONDON</span><br />
              <span style={{ fontWeight: 300, fontSize: "0.45em", letterSpacing: "-0.01em", color: "rgba(255,255,255,0.5)" }}>
                &amp; South East
              </span>
            </h1>

            <p className="text-white/55 animate-fade-up delay-200 mb-10 font-light leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", maxWidth: 480 }}>
              Built for riders, passengers, dreamers and devotees.
              Monthly rideouts, track days, and pure Ducati passion.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link href="/membership" className="btn btn-primary">
                Join the Club <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/rides" className="btn btn-outline-white">
                Explore Rides
              </Link>
            </div>

            {/* Panigale model badge */}
            <div className="mt-16 flex items-center gap-4 animate-fade-up delay-500">
              <div className="w-px h-8 bg-[#cc0000]" />
              <span className="text-white/30 text-[0.7rem] font-bold tracking-[0.25em] uppercase">
                Panigale V4R · Streetfighter · Monster · Multistrada
              </span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up delay-600">
          <ChevronDown className="w-5 h-5 text-white/25 animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STATS BAR — red, bold
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#cc0000] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/20">
            {[
              { value: "150+",    label: "Members" },
              { value: "30+",     label: "Events in 2025" },
              { value: "15+",     label: "Partner Discounts" },
              { value: "Apr '24", label: "Founded" },
            ].map((s) => (
              <div key={s.label} className="py-8 px-6 text-center">
                <div className="font-black text-3xl sm:text-4xl tracking-tight leading-none mb-1">{s.value}</div>
                <div className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-white/55">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MANIFESTO — dark editorial
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] text-white py-28 relative overflow-hidden">
        {/* Subtle red diagonal stripe */}
        <div className="absolute top-0 right-0 w-px h-full bg-[#cc0000] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <ScrollReveal>
                <p className="eyebrow text-[#cc0000] mb-8">Our Purpose</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-white mb-8 text-balance" style={{
                  fontWeight: 900,
                  fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}>
                  For everyone who feels something<br />
                  <span style={{ color: "#cc0000" }}>when a Ducati starts.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-white/45 text-lg leading-relaxed font-light max-w-lg">
                  DOCLSE is the official Ducati club for London and the South East.
                  We exist for the riders, passengers, dreamers and devotees —
                  united by an unshakeable passion for the most beautiful
                  motorcycles ever made.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/[0.05] mt-4 lg:mt-0">
              {[
                { num: "01", title: "We Ride Together", desc: "Monthly rideouts across all compass points. Surrey Hills, North Downs, Kent coast — every route a memory." },
                { num: "02", title: "We Give Back",     desc: "Charity rides and community events. Passion with purpose — giving back to causes that matter." },
                { num: "03", title: "We Connect",       desc: "Track days, BBQs, World Ducati Week. Every gathering deepens the bond Ducati creates." },
              ].map((item) => (
                <ScrollReveal key={item.num}>
                  <div className="bg-[#0a0a0a] p-8 group hover:bg-[#0f0f0f] transition-colors border-l-2 border-transparent hover:border-[#cc0000]">
                    <div className="eyebrow text-[#cc0000] mb-4">{item.num}</div>
                    <h3 className="font-black text-lg text-white mb-3 group-hover:text-[#cc0000] transition-colors">{item.title}</h3>
                    <p className="text-white/35 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ROUTE INTELLIGENCE PROMO — dark cinematic panel
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#0d0005", minHeight: 480 }}>
        {/* Animated red gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(204,0,0,0.2) 0%, transparent 70%)"
        }} />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none" style={{
          background: "linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%)"
        }} />
        {/* Geometric lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[20, 40, 60, 80].map(p => (
            <div key={p} className="absolute top-0 bottom-0 opacity-[0.04]"
              style={{ left: `${p}%`, width: 1, background: "#fff" }} />
          ))}
        </div>

        <div className="relative z-10 flex items-center min-h-[480px]">
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-20">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="eyebrow text-[#cc0000]">New Feature</span>
                <span className="pill pill-red text-[0.6rem]">Beta</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-white mb-6" style={{
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
              }}>
                Route<br /><span style={{ color: "#cc0000" }}>Intelligence.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-white/40 text-lg font-light mb-10 max-w-sm leading-relaxed">
                Answer 5 questions. Get your perfect DOCLSE ride — scored, mapped and profiled.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <Link href="/route-intelligence" className="btn btn-primary">
                Try it now <ArrowUpRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          UPCOMING EVENTS
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-14">
            <div>
              <ScrollReveal>
                <p className="eyebrow text-[#cc0000] mb-3">What&apos;s On</p>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h2 className="font-black text-[#0a0a0a]" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", letterSpacing: "-0.025em", lineHeight: 1 }}>
                  Upcoming Events
                </h2>
              </ScrollReveal>
            </div>
            <Link href="/events" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#cc0000] hover:gap-3 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {upcomingEvents.map((event, i) => (
              <ScrollReveal key={event.slug} delay={i * 80}>
                <Link
                  href={`/events/${event.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-gray-100 hover:border-[#cc0000]/20 hover:shadow-xl transition-all duration-300"
                >
                  {/* Card image / gradient */}
                  <div
                    className="h-44 relative overflow-hidden"
                    style={{ background: CAT_GRAD[event.category] ?? "linear-gradient(135deg,#0a0a0a,#1a000a)" }}
                  >
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 10px)"
                    }} />
                    <div className="absolute inset-0 flex items-end p-5">
                      <span className="pill pill-red">{event.category}</span>
                    </div>
                    {/* Red bottom strip */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#cc0000] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-5 bg-white">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-[#cc0000] shrink-0" />
                      <span>{formatDate(event.date)}</span>
                      <span className="text-gray-200">·</span>
                      <MapPin className="w-3.5 h-3.5 text-[#cc0000] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <h3 className="font-black text-[#0a0a0a] text-base leading-snug group-hover:text-[#cc0000] transition-colors">
                      {event.title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MEMBERSHIP CTA — split dark/red
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] text-white relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 60% at 75% 50%, rgba(204,0,0,0.10) 0%, transparent 70%)"
        }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">

            {/* Left copy — 3 cols */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <p className="eyebrow text-[#cc0000] mb-8">Membership</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-white mb-8" style={{
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.035em",
                }}>
                  Join the<br />
                  <span style={{ color: "#cc0000" }}>Ducatista</span><br />
                  family.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-white/45 text-base leading-relaxed mb-10 font-light max-w-md">
                  Free subscriber membership opens the door. Full membership unlocks exclusive
                  discounts, priority bookings, La Passione magazine, and the full Ducatista experience.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/register" className="btn btn-primary">Join Free <ArrowRight className="w-4 h-4" /></Link>
                  <Link href="/membership" className="btn btn-outline-white">Compare Plans</Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right feature cards — 2 cols */}
            <div className="lg:col-span-2 grid grid-cols-1 gap-3">
              {[
                { title: "Priority Booking",   desc: "First access to track days, WDW and exclusive events." },
                { title: "Member Discounts",   desc: "15%+ off at 15 partner brands and local businesses." },
                { title: "Monthly Rideouts",   desc: "Organised rides across all compass points, all year." },
                { title: "La Passione Mag",    desc: "Exclusive club magazine — print and digital." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 60}>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] hover:border-[#cc0000]/30 hover:bg-white/[0.02] transition-all">
                    <div className="w-1 h-8 bg-[#cc0000] rounded shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                      <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          RIDE REPORTS
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f3f3f3] py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-14">
            <div>
              <ScrollReveal>
                <p className="eyebrow text-[#cc0000] mb-3">From the Road</p>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h2 className="font-black text-[#0a0a0a]" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", letterSpacing: "-0.025em", lineHeight: 1 }}>
                  Ride Reports
                </h2>
              </ScrollReveal>
            </div>
            <Link href="/news" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#cc0000] hover:gap-3 transition-all">
              All reports <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestReports.map((report, i) => (
              <ScrollReveal key={report.slug} delay={i * 80}>
                <Link
                  href={`/news/${report.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#cc0000]/20 hover:shadow-xl transition-all duration-300"
                >
                  {/* Gradient thumbnail — no broken images */}
                  <div
                    className="h-48 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, hsl(${i * 30},60%,8%) 0%, hsl(${i * 30 + 10},40%,14%) 100%)` }}
                  >
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: "repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 12px)"
                    }} />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)"
                    }} />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-white/90 text-[#0a0a0a] uppercase tracking-wider">
                        {report.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-black text-sm leading-tight line-clamp-2 group-hover:text-[#cc0000] transition-colors">
                        {report.title}
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-gray-400 mb-2">{formatDate(report.date)} · {report.author}</p>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{report.excerpt}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LOCATION STRIP
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] text-white py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="eyebrow text-[#cc0000] mb-3">Find Us</p>
            <h3 className="font-black text-2xl text-white mb-1 tracking-tight">Arch 70, Albert Embankment</h3>
            <p className="text-white/35 text-sm">London SE1 7TP · Linked to Ducati London dealership</p>
          </div>
          <a
            href="https://maps.app.goo.gl/RYFV9c3YYr7h2Hyx9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-white shrink-0"
          >
            View on Map <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
}
