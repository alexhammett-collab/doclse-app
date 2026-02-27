import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Repeat2 } from "lucide-react";
import { EVENTS, RIDE_REPORTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/ScrollReveal";

const PANIGALE_V4R = "/panigale-v4r.jpg";

export default function HomePage() {
  const upcomingEvents = EVENTS.slice(0, 3);
  const latestReports  = RIDE_REPORTS.slice(0, 3);

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative w-full bg-black overflow-hidden" style={{ height: "100svh", minHeight: 640 }}>
        {/* Panigale V4R — Wikimedia Commons, no hotlink restrictions */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PANIGALE_V4R}
          alt="Ducati Panigale V4R"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.48) contrast(1.08)" }}
        />
        {/* Left-to-right dark vignette — keeps text readable */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(100deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.1) 100%)"
        }} />
        {/* Bottom fade into next dark section */}
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{
          background: "linear-gradient(to top, #0a0a0a, transparent)"
        }} />

        {/* Content — vertically centred */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-8 sm:px-12 lg:px-20">
            <div className="max-w-xl">
              <p className="pill pill-red mb-8 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] animate-pulse inline-block" />
                Official Club · London &amp; South East · Est. 2024
              </p>
              <h1
                className="text-white animate-fade-up delay-100"
                style={{ fontWeight: 900, fontSize: "clamp(4rem, 9vw, 8rem)", lineHeight: 0.88, letterSpacing: "-0.04em" }}
              >
                DOC<span style={{ color: "#cc0000" }}>LSE</span>
              </h1>
              <p
                className="text-white/60 animate-fade-up delay-200 mt-7 mb-10 font-light leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", maxWidth: 400 }}
              >
                Built for riders, passengers, dreamers and devotees.
                Monthly rideouts, track days, and pure Ducati passion.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
                <Link href="/membership" className="btn btn-primary">Join the Club <ArrowRight className="w-4 h-4" /></Link>
                <Link href="/rides" className="btn btn-outline-white">Explore Rides</Link>
              </div>
              <div className="mt-14 flex items-center gap-4 animate-fade-up delay-500">
                <div className="w-px h-7 bg-[#cc0000]" />
                <span className="text-white/25 text-[0.65rem] font-bold tracking-[0.25em] uppercase">
                  Panigale V4R · Streetfighter · Monster · Multistrada
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2">
          <span className="text-white/20 text-[0.6rem] font-bold tracking-[0.25em] uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="bg-[#cc0000] text-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { value: "150+",    label: "Members" },
              { value: "30+",     label: "Events in 2025" },
              { value: "15+",     label: "Partner Discounts" },
              { value: "Apr '24", label: "Founded" },
            ].map((s, i) => (
              <div key={s.label} className={`py-10 px-6 text-center ${i < 3 ? "border-r border-white/20" : ""}`}>
                <div className="font-black text-4xl sm:text-5xl tracking-tight leading-none mb-2">{s.value}</div>
                <div className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ─────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] text-white py-32">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
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

            <div className="space-y-0 lg:mt-2">
              {[
                { num: "01", title: "We Ride Together", desc: "Monthly rideouts across all compass points. Surrey Hills, North Downs, Kent coast — every route a memory." },
                { num: "02", title: "We Give Back",     desc: "Charity rides and community events. Passion with purpose — giving back to causes that matter." },
                { num: "03", title: "We Connect",       desc: "Track days, BBQs, World Ducati Week. Every gathering deepens the bond Ducati creates." },
              ].map((item, i) => (
                <ScrollReveal key={item.num} delay={i * 80}>
                  <div className="group py-8 flex gap-6 items-start" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="eyebrow text-[#cc0000] shrink-0 mt-1">{item.num}</span>
                    <div>
                      <h3 className="font-black text-lg text-white mb-2 group-hover:text-[#cc0000] transition-colors">{item.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROUTE INTELLIGENCE ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#080808]" style={{ minHeight: 500 }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 90% at 15% 50%, rgba(204,0,0,0.18) 0%, transparent 65%)"
        }} />
        <div className="relative z-10 flex items-center" style={{ minHeight: 500 }}>
          <div className="max-w-7xl mx-auto w-full px-8 sm:px-12 lg:px-20 py-24">
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

      {/* ── EVENTS ────────────────────────────────────────────── */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, i) => (
              <ScrollReveal key={event.slug} delay={i * 80}>
                <Link
                  href={`/events/${event.slug}`}
                  className="group block rounded-3xl overflow-hidden bg-white hover:-translate-y-1 transition-all duration-300"
                  style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
                >
                  <div className="h-52 relative overflow-hidden" style={{
                    background: `linear-gradient(135deg, hsl(${345 + i * 8},80%,8%) 0%, hsl(${350 + i * 12},60%,16%) 100%)`
                  }}>
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: "radial-gradient(circle at 80% 20%, rgba(204,0,0,0.4) 0%, transparent 60%)"
                    }} />
                    <div className="absolute bottom-0 left-0 right-0 h-24" style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)"
                    }} />
                    <div className="absolute bottom-5 left-5">
                      <span className="pill pill-red">{event.category}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#cc0000] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-[#cc0000] shrink-0" />
                      {formatDate(event.date)}
                      <span className="mx-1 opacity-40">·</span>
                      <MapPin className="w-3.5 h-3.5 text-[#cc0000] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <h3 className="font-black text-[#0a0a0a] text-lg leading-snug group-hover:text-[#cc0000] transition-colors">
                      {event.title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP ────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
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

            <div className="space-y-0">
              {[
                { title: "Priority Booking",   desc: "First access to track days, WDW and exclusive events." },
                { title: "Member Discounts",   desc: "15%+ off at 15 partner brands and local businesses." },
                { title: "Monthly Rideouts",   desc: "Organised rides across all compass points, all year." },
                { title: "La Passione Mag",    desc: "Exclusive club magazine — print and digital." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 60}>
                  <div className="flex items-start gap-5 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="w-0.5 h-10 bg-[#cc0000] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-black text-white text-base mb-1">{item.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── NEW FEATURES STRIP ────────────────────────────────── */}
      <section className="bg-[#080808] border-t border-white/[0.05] py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
          <p className="eyebrow text-white/20 mb-10">New for 2025</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScrollReveal>
              <Link href="/pulse" className="group block p-8 rounded-3xl bg-[#0f0f0f] hover:bg-[#140000] transition-all duration-300" style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full border border-[#cc0000]/40 flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#cc0000] animate-pulse" />
                  </div>
                  <span className="font-black text-white text-xl">Pulse</span>
                  <span className="pill pill-red text-[0.6rem] ml-auto">Live</span>
                </div>
                <p className="text-white/35 text-sm leading-relaxed mb-5">See Ducati riders active across the globe in real time. The worldwide heartbeat of our community.</p>
                <span className="text-[#cc0000] text-xs font-bold flex items-center gap-1.5 group-hover:gap-3 transition-all">View global map <ArrowRight className="w-3.5 h-3.5" /></span>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <Link href="/rideswap" className="group block p-8 rounded-3xl bg-[#0f0f0f] hover:bg-[#140000] transition-all duration-300" style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full border border-[#cc0000]/40 flex items-center justify-center shrink-0">
                    <Repeat2 className="w-4 h-4 text-[#cc0000]" />
                  </div>
                  <span className="font-black text-white text-xl">RideSwap</span>
                  <span className="pill pill-red text-[0.6rem] ml-auto">New</span>
                </div>
                <p className="text-white/35 text-sm leading-relaxed mb-5">Swap your Ducati with a fellow member for a day or a rideout. Protected by SwapShield insurance.</p>
                <span className="text-[#cc0000] text-xs font-bold flex items-center gap-1.5 group-hover:gap-3 transition-all">Browse swaps <ArrowRight className="w-3.5 h-3.5" /></span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── RIDE REPORTS ──────────────────────────────────────── */}
      <section className="bg-[#f4f4f4] py-32">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestReports.map((report, i) => (
              <ScrollReveal key={report.slug} delay={i * 80}>
                <Link
                  href={`/news/${report.slug}`}
                  className="group block bg-white rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
                  style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}
                >
                  <div
                    className="h-52 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, hsl(${350 + i * 15},70%,6%) 0%, hsl(${355 + i * 10},50%,12%) 100%)` }}
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

      {/* ── LOCATION ──────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] text-white py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
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
