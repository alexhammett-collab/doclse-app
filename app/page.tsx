import Link from "next/link";
import { ArrowRight, ArrowUpRight, Repeat2 } from "lucide-react";
import { EVENTS, RIDE_REPORTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  const upcomingEvents = EVENTS.slice(0, 3);
  const latestReports  = RIDE_REPORTS.slice(0, 3);

  return (
    <div className="bg-black text-white">

      {/* ────────────────────────────────────────────────────────────
          HERO — full-viewport cinematic, Ducati.com aesthetic
      ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 700 }}>
        {/* Hero background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&q=85&fit=crop)",
        }} />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Studio lighting — dramatic red spotlight from right */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 90% at 70% 40%, rgba(204,0,0,0.2) 0%, transparent 60%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 40% 60% at 20% 80%, rgba(204,0,0,0.08) 0%, transparent 50%)"
        }} />
        {/* Subtle noise grain */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`
        }} />

        {/* Massive model name — like Ducati.com hero typography */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span style={{
            fontSize: "clamp(18rem, 32vw, 45rem)",
            fontWeight: 900,
            lineHeight: 0.8,
            letterSpacing: "-0.06em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
          }}>
            V4R
          </span>
        </div>

        {/* Main content — bottom left, like Ducati product pages */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 pb-24 sm:pb-32">
            <div className="animate-fade-up">
              <p className="text-[#cc0000] text-[0.7rem] font-bold tracking-[0.3em] uppercase mb-6">
                Ducati Official Club · London &amp; South East
              </p>
            </div>
            <h1 className="animate-fade-up delay-100" style={{
              fontWeight: 900,
              fontSize: "clamp(4.5rem, 12vw, 12rem)",
              lineHeight: 0.82,
              letterSpacing: "-0.05em",
              color: "white",
            }}>
              DOC<span style={{ color: "#cc0000" }}>LSE</span>
            </h1>
            <div className="mt-8 mb-12 animate-fade-up delay-200">
              <p className="text-white/50 text-lg sm:text-xl font-light leading-relaxed max-w-md">
                For every rider who feels the engine before they hear it.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 animate-fade-up delay-300">
              <Link href="/membership" className="inline-flex items-center gap-3 bg-[#cc0000] text-white font-bold text-sm tracking-wide px-8 py-4 hover:bg-[#aa0000] transition-colors">
                Join the Club <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/rides" className="inline-flex items-center gap-3 text-white/50 hover:text-white font-bold text-sm tracking-wide px-8 py-4 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                Explore Rides
              </Link>
            </div>
          </div>
        </div>

        {/* Right-edge model strip */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/[0.04]" />
        <div className="absolute right-8 bottom-32 hidden lg:flex flex-col items-end gap-3">
          <span className="text-white/15 text-[0.55rem] font-bold tracking-[0.3em] uppercase" style={{ writingMode: "vertical-rl" }}>
            Panigale · Streetfighter · Monster · Multistrada
          </span>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          STATS — minimal, dark, typographic
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#0d0d0d" }}>
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 py-20">
          <div className="flex flex-wrap justify-between gap-y-12">
            {[
              { value: "150+", label: "Active Members" },
              { value: "30+",  label: "Events per Year" },
              { value: "15+",  label: "Partner Discounts" },
              { value: "2024", label: "Founded" },
            ].map((s) => (
              <div key={s.label} className="min-w-[140px]">
                <div className="font-black text-5xl sm:text-6xl tracking-tighter text-white leading-none">{s.value}</div>
                <div className="text-white/25 text-[0.65rem] font-bold tracking-[0.2em] uppercase mt-3">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          MANIFESTO — editorial, huge type
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#080808" }}>
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 py-40">
          <ScrollReveal>
            <h2 style={{
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}>
              For everyone who feels<br className="hidden sm:block" /> something{" "}
              <span style={{ color: "#cc0000" }}>when a Ducati starts.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-white/35 text-xl font-light leading-relaxed max-w-2xl mt-12">
              DOCLSE is the official Ducati club for London and the South East.
              Monthly rideouts, charity events, track days, and a community
              united by the most beautiful motorcycles ever made.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mt-24" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { n: "01", t: "We Ride", d: "Monthly rideouts across Surrey Hills, North Downs, Kent coast. Every route, a memory." },
              { n: "02", t: "We Give Back", d: "Charity rides and community events. Passion with purpose." },
              { n: "03", t: "We Connect", d: "Track days, BBQs, World Ducati Week. The family Ducati builds." },
            ].map((item, i) => (
              <ScrollReveal key={item.n} delay={i * 100}>
                <div className="py-10 sm:pr-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-[#cc0000] text-[0.65rem] font-bold tracking-[0.25em]">{item.n}</span>
                  <h3 className="font-black text-white text-2xl mt-4 mb-3">{item.t}</h3>
                  <p className="text-white/30 text-sm leading-relaxed">{item.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          EVENTS — dark cards
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 py-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <ScrollReveal>
                <span className="text-[#cc0000] text-[0.65rem] font-bold tracking-[0.25em] uppercase">What&apos;s On</span>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h2 className="font-black text-white mt-4" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  Upcoming Events
                </h2>
              </ScrollReveal>
            </div>
            <Link href="/events" className="hidden sm:flex items-center gap-2 text-[0.75rem] font-bold text-white/30 hover:text-[#cc0000] tracking-[0.15em] uppercase transition-colors">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {upcomingEvents.map((event, i) => (
              <ScrollReveal key={event.slug} delay={i * 80}>
                <Link
                  href={`/events/${event.slug}`}
                  className="group block"
                >
                  <div className="h-64 relative overflow-hidden mb-5">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{
                      backgroundImage: `url(${event.image})`,
                    }} />
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 100%)"
                    }} />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#cc0000] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="absolute bottom-5 left-6">
                      <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 bg-[#cc0000] text-white">{event.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-2 text-[0.7rem] text-white/30 font-medium">
                    <span>{formatDate(event.date)}</span>
                    <span className="text-white/10">—</span>
                    <span>{event.location}</span>
                  </div>
                  <h3 className="font-black text-white text-xl leading-tight group-hover:text-[#cc0000] transition-colors">
                    {event.title}
                  </h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          ROUTE INTELLIGENCE — cinematic callout
      ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#060000" }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(204,0,0,0.15) 0%, transparent 60%)"
        }} />
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 py-40 relative z-10">
          <div className="max-w-xl">
            <ScrollReveal>
              <span className="text-[#cc0000] text-[0.65rem] font-bold tracking-[0.25em] uppercase">New Feature — Beta</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="mt-6" style={{
                fontWeight: 900,
                fontSize: "clamp(3rem, 7vw, 7rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
              }}>
                Route<br /><span style={{ color: "#cc0000" }}>Intelligence.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-white/35 text-xl font-light leading-relaxed mt-8 mb-12 max-w-sm">
                Answer 5 questions. Get your perfect ride — scored, mapped and profiled.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <Link href="/route-intelligence" className="inline-flex items-center gap-3 bg-[#cc0000] text-white font-bold text-sm tracking-wide px-8 py-4 hover:bg-[#aa0000] transition-colors">
                Try it now <ArrowUpRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          MEMBERSHIP — split editorial
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <ScrollReveal>
                <span className="text-[#cc0000] text-[0.65rem] font-bold tracking-[0.25em] uppercase">Membership</span>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="mt-6 mb-10" style={{
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 6vw, 6rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}>
                  Join the<br />
                  <span style={{ color: "#cc0000" }}>Ducatista</span><br />
                  family.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-white/35 text-lg font-light leading-relaxed max-w-md mb-12">
                  Free subscriber membership opens the door. Full membership
                  unlocks exclusive discounts, priority bookings, and the
                  complete Ducatista experience.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-wrap items-center gap-5">
                  <Link href="/register" className="inline-flex items-center gap-3 bg-[#cc0000] text-white font-bold text-sm tracking-wide px-8 py-4 hover:bg-[#aa0000] transition-colors">
                    Join Free <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/membership" className="text-white/30 hover:text-white font-bold text-sm tracking-wide transition-colors">
                    Compare Plans →
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:pt-16">
              {[
                { title: "Priority Booking",  desc: "First access to track days, WDW and exclusive events." },
                { title: "Member Discounts",  desc: "15%+ off at 15 partner brands and local businesses." },
                { title: "Monthly Rideouts",  desc: "Organised rides across all compass points, all year." },
                { title: "La Passione Mag",   desc: "Exclusive club magazine — print and digital editions." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 60}>
                  <div className="py-8 flex gap-6 items-start" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="w-8 h-px bg-[#cc0000] shrink-0 mt-3" />
                    <div>
                      <h4 className="font-black text-white text-lg mb-2">{item.title}</h4>
                      <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          PULSE + RIDESWAP — feature strip
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#060606" }}>
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 py-24">
          <span className="text-white/15 text-[0.65rem] font-bold tracking-[0.25em] uppercase">New for 2025</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            <ScrollReveal>
              <Link href="/pulse" className="group block p-10 bg-[#0e0e0e] hover:bg-[#120000] transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(204,0,0,0.08) 0%, transparent 60%)"
                }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-3 h-3 rounded-full bg-[#cc0000] animate-pulse" />
                    <span className="font-black text-white text-2xl tracking-tight">Pulse</span>
                    <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase px-2 py-1 bg-[#cc0000] text-white ml-auto">Live</span>
                  </div>
                  <p className="text-white/30 text-sm leading-relaxed mb-8">See Ducati riders active across the globe. The worldwide heartbeat of our community.</p>
                  <span className="text-[#cc0000] text-[0.7rem] font-bold tracking-[0.15em] uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                    View global map <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Link href="/rideswap" className="group block p-10 bg-[#0e0e0e] hover:bg-[#120000] transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(204,0,0,0.08) 0%, transparent 60%)"
                }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Repeat2 className="w-5 h-5 text-[#cc0000]" />
                    <span className="font-black text-white text-2xl tracking-tight">RideSwap</span>
                    <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase px-2 py-1 bg-[#cc0000] text-white ml-auto">New</span>
                  </div>
                  <p className="text-white/30 text-sm leading-relaxed mb-8">Swap your Ducati with a fellow member for a day. Protected by SwapShield insurance.</p>
                  <span className="text-[#cc0000] text-[0.7rem] font-bold tracking-[0.15em] uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                    Browse swaps <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          RIDE REPORTS — dark card style
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 py-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <ScrollReveal>
                <span className="text-[#cc0000] text-[0.65rem] font-bold tracking-[0.25em] uppercase">From the Road</span>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h2 className="font-black text-white mt-4" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  Ride Reports
                </h2>
              </ScrollReveal>
            </div>
            <Link href="/news" className="hidden sm:flex items-center gap-2 text-[0.75rem] font-bold text-white/30 hover:text-[#cc0000] tracking-[0.15em] uppercase transition-colors">
              All reports <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestReports.map((report, i) => (
              <ScrollReveal key={report.slug} delay={i * 80}>
                <Link href={`/news/${report.slug}`} className="group block">
                  <div className="h-56 relative overflow-hidden mb-5">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{
                      backgroundImage: `url(${report.image})`,
                    }} />
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.3) 100%)"
                    }} />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#cc0000] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="absolute top-5 left-6">
                      <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/50">{report.category}</span>
                    </div>
                    <div className="absolute bottom-5 left-6 right-6">
                      <p className="text-white font-black text-base leading-tight group-hover:text-[#cc0000] transition-colors">{report.title}</p>
                    </div>
                  </div>
                  <p className="text-white/25 text-[0.7rem] mb-2">{formatDate(report.date)} · {report.author}</p>
                  <p className="text-white/35 text-sm leading-relaxed line-clamp-2">{report.excerpt}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          LOCATION — minimal footer strip
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <span className="text-[#cc0000] text-[0.65rem] font-bold tracking-[0.25em] uppercase">Find Us</span>
            <h3 className="font-black text-white text-2xl tracking-tight mt-3 mb-1">Arch 70, Albert Embankment</h3>
            <p className="text-white/25 text-sm">London SE1 7TP · Ducati London</p>
          </div>
          <a href="https://maps.app.goo.gl/RYFV9c3YYr7h2Hyx9" target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-white font-bold text-sm tracking-wide transition-colors flex items-center gap-2" style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "12px 24px" }}>
            View on Map <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
}
