import Link from "next/link";
import { ArrowRight, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { EVENTS, RIDE_REPORTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  const upcomingEvents = EVENTS.slice(0, 3);
  const latestReports = RIDE_REPORTS.slice(0, 3);

  return (
    <div>

      {/* ── HERO ── Full-viewport, edge-to-edge, Rivian-style ─────────── */}
      <section className="relative w-full overflow-hidden bg-black" style={{ minHeight: "100svh" }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&auto=format&fit=crop"
          alt="Ducati on the road"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.45)" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-overlay" />
        {/* Red accent bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full pb-20 pt-36"
          style={{ minHeight: "100svh" }}>
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
            <div className="pill pill-red mb-8 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] inline-block" />
              Founded April 2024 · London &amp; South East
            </div>
            <h1 className="display-xl text-white mb-6 animate-fade-up delay-100">
              Built for<br />
              <span style={{ color: "#cc0000" }}>Ducatistas.</span>
            </h1>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-xl mb-10 font-light animate-fade-up delay-200">
              Whether you ride, passenger, or simply love the brand — DOCLSE brings together
              riders across London and the South East.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link href="/membership" className="btn btn-primary">
                Join the Club <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/rides" className="btn btn-outline-white">
                Explore Rides
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 animate-fade-up delay-600 hidden md:flex flex-col items-center gap-2">
          <span className="text-white/30 text-[0.65rem] font-bold tracking-[0.2em] uppercase rotate-90 origin-center mb-4">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── STATS TICKER ─────────────────────────────────────────────── */}
      <section className="bg-[#cc0000] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/20">
            {[
              { value: "150+", label: "Members" },
              { value: "30+", label: "Events in 2025" },
              { value: "15+", label: "Partner Discounts" },
              { value: "2024", label: "Founded" },
            ].map((stat) => (
              <div key={stat.label} className="py-8 px-6 text-center">
                <div className="font-black text-3xl sm:text-4xl tracking-tight leading-none mb-1">{stat.value}</div>
                <div className="text-xs font-bold tracking-[0.15em] uppercase text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL MANIFESTO ──────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] text-white py-32 relative overflow-hidden noise">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <p className="eyebrow text-[#cc0000] mb-8">Our Purpose</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="display-lg text-white max-w-4xl mb-12 text-balance">
              For everyone<br />who feels something<br />
              <span style={{ color: "#cc0000" }}>when a Ducati starts.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl mb-16 font-light">
              DOCLSE is the official Ducati club for London and the South East. We exist for the
              riders, the passengers, the dreamers, and the devotees — united by an unshakeable
              passion for the most beautiful motorcycles ever made.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
            {[
              { num: "01", title: "We Ride", desc: "Monthly organised rideouts across all compass points. From Surrey Hills hairpins to Kent coastal blasts." },
              { num: "02", title: "We Give Back", desc: "Charity rideouts and community events. We believe passion has a responsibility to make the world better." },
              { num: "03", title: "We Connect", desc: "Track days, BBQs, World Ducati Week. Every gathering strengthens the family that Ducati built." },
            ].map((item) => (
              <ScrollReveal key={item.num}>
                <div className="bg-[#0a0a0a] p-10 group hover:bg-[#111] transition-colors">
                  <div className="eyebrow text-[#cc0000] mb-6">{item.num}</div>
                  <h3 className="font-black text-2xl text-white mb-4 group-hover:text-[#cc0000] transition-colors">{item.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED IMAGE BREAK ───────────────────────────────────── */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1600&q=85&auto=format&fit=crop"
          alt="DOCLSE ride"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.6)" }}
        />
        <div className="absolute inset-0 hero-overlay-bottom" />
        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="eyebrow text-white/40 mb-3">Route Intelligence · Beta</p>
          <h3 className="display-md text-white mb-6 max-w-lg">Find your perfect ride in 5 questions.</h3>
          <Link href="/route-intelligence" className="btn btn-primary">
            Try Route Intelligence <ArrowUpRight className="w-4 h-4" />
          </Link>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ─────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-16">
            <div>
              <ScrollReveal>
                <p className="eyebrow text-[#cc0000] mb-4">What&apos;s On</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="display-md text-[#0a0a0a]">Upcoming Events</h2>
              </ScrollReveal>
            </div>
            <ScrollReveal>
              <Link href="/events" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#cc0000] hover:gap-3 transition-all">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <ScrollReveal key={event.slug} delay={i * 100}>
                <Link href={`/events/${event.slug}`} className="card-rivian group block">
                  <div className="h-48 bg-gradient-to-br from-[#0a0a0a] to-[#1a0000] relative overflow-hidden flex items-center justify-center">
                    <img
                      src={`https://images.unsplash.com/photo-${["1558618666-fcd25c85cd64","1591637333184-19aa84b3e01f","1604357209793-fca5a5bd56f6"][i]}?w=600&q=70&auto=format&fit=crop`}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 hero-overlay-bottom" />
                    <div className="absolute bottom-4 left-4">
                      <span className="pill pill-red">{event.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-[#cc0000]" />
                      {formatDate(event.date)}
                      <span className="mx-1 text-gray-200">·</span>
                      <MapPin className="w-3.5 h-3.5 text-[#cc0000]" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <h3 className="font-black text-[#0a0a0a] text-lg leading-tight group-hover:text-[#cc0000] transition-colors">
                      {event.title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP CTA ─────────────────────────────────────────── */}
      <section className="relative bg-[#0a0a0a] text-white py-32 overflow-hidden noise">
        {/* Red glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(204,0,0,0.12) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <ScrollReveal>
                <p className="eyebrow text-[#cc0000] mb-8">Membership</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="display-lg text-white mb-8">
                  Join the<br />
                  <span style={{ color: "#cc0000" }}>Ducatista</span><br />
                  family.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-white/50 text-lg leading-relaxed mb-10 font-light max-w-md">
                  Free membership opens the door. Full membership unlocks exclusive discounts,
                  priority bookings, La Passione magazine, and the complete Ducatista experience.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/register" className="btn btn-primary">
                    Join Free <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/membership" className="btn btn-outline-white">
                    Compare Plans
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Priority Booking", desc: "First access to track days, WDW and exclusive events." },
                { title: "Member Discounts", desc: "15%+ off at 15 partner brands and local businesses." },
                { title: "Monthly Rideouts", desc: "Organised rides across all compass points, all year." },
                { title: "La Passione", desc: "Exclusive club magazine — print and digital editions." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80}>
                  <div className="border border-white/[0.07] rounded-2xl p-6 hover:border-[#cc0000]/30 hover:bg-white/[0.03] transition-all">
                    <div className="w-8 h-0.5 bg-[#cc0000] mb-4 rounded" />
                    <h4 className="font-bold text-white text-sm mb-2">{item.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST RIDE REPORTS ──────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-16">
            <div>
              <ScrollReveal>
                <p className="eyebrow text-[#cc0000] mb-4">From the Road</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="display-md text-[#0a0a0a]">Ride Reports</h2>
              </ScrollReveal>
            </div>
            <ScrollReveal>
              <Link href="/news" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#cc0000] hover:gap-3 transition-all">
                All reports <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestReports.map((report, i) => (
              <ScrollReveal key={report.slug} delay={i * 100}>
                <Link href={`/news/${report.slug}`} className="card-rivian group block bg-white">
                  <div className="h-52 bg-gradient-to-br from-[#111] to-[#1a0000] relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${["1449426468159-d96dbf08f19f","1558618047-3c2b2b8c8e3e","1536440136628-849c177e76a1"][i]}?w=600&q=70&auto=format&fit=crop`}
                      alt={report.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="pill pill-dark bg-white/90 text-[#0a0a0a] border-0 text-[0.65rem]">{report.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-gray-400 mb-2">{formatDate(report.date)} · {report.author}</p>
                    <h3 className="font-black text-[#0a0a0a] text-base leading-tight mb-2 group-hover:text-[#cc0000] transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{report.excerpt}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION STRIP ───────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="eyebrow text-[#cc0000] mb-3">Find Us</p>
            <h3 className="font-black text-2xl text-white mb-1">Arch 70, Albert Embankment</h3>
            <p className="text-white/40 text-sm">London SE1 7TP · Linked to Ducati London dealership</p>
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
