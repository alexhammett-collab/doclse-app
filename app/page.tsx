import Link from "next/link";
import { ArrowRight, Calendar, Users, Star, MapPin, ChevronRight } from "lucide-react";
import { EVENTS, RIDE_REPORTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const CATEGORY_COLOURS: Record<string, string> = {
  Rideout: "bg-blue-100 text-blue-800",
  Training: "bg-green-100 text-green-800",
  Social: "bg-purple-100 text-purple-800",
  Special: "bg-yellow-100 text-yellow-800",
};

export default function HomePage() {
  const upcomingEvents = EVENTS.slice(0, 3);
  const latestReports = RIDE_REPORTS.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-black text-white overflow-hidden min-h-[580px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-[#1a0000]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #cc0000 0%, transparent 60%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#cc0000]/20 border border-[#cc0000]/30 text-[#ff6666] text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#cc0000] animate-pulse" />
              Founded April 2024 · London &amp; South East
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Ducati Official Club<br />
              <span className="text-[#cc0000]">London &amp; South East</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
              Whether you ride, passenger, or simply love the brand — DOCLSE brings together
              Ducatistas across London and the South East for rides, events, and pure passion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-6 py-3 rounded-md transition-colors"
              >
                Join the Club <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-md transition-colors hover:bg-white/5"
              >
                Upcoming Events <Calendar className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#cc0000] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "150+", label: "Members" },
              { value: "30+", label: "Events in 2025" },
              { value: "15+", label: "Partner Discounts" },
              { value: "Apr 2024", label: "Founded" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black">{stat.value}</div>
                <div className="text-sm text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">What We Do</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              DOCLSE is for everyone who loves Ducati — from track days to Sunday rideouts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏍️",
                title: "We Ride Bikes",
                desc: "Organised monthly rideouts across all compass points. From coastal blasts to country lanes.",
              },
              {
                icon: "🤝",
                title: "We Support Charities",
                desc: "Giving back through charity rideouts and events that support causes close to members' hearts.",
              },
              {
                icon: "❤️",
                title: "We Bring People Together",
                desc: "Social events, BBQs, track days, and the World Ducati Week — all united by a love of Ducati.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-xl border border-gray-100 hover:border-[#cc0000]/20 hover:shadow-md transition-all">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900">Upcoming Events</h2>
              <p className="text-gray-500 mt-1">Don&apos;t miss what&apos;s on</p>
            </div>
            <Link href="/events" className="hidden sm:flex items-center gap-1 text-[#cc0000] font-semibold text-sm hover:gap-2 transition-all">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Link key={event.slug} href={`/events/${event.slug}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#cc0000]/30 transition-all group">
                <div className="bg-gradient-to-br from-gray-900 to-black h-40 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-[#cc0000] group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLOURS[event.category] ?? "bg-gray-100 text-gray-700"}`}>
                      {event.category}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(event.date)}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#cc0000] transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 sm:hidden text-center">
            <Link href="/events" className="text-[#cc0000] font-semibold text-sm">
              View all events →
            </Link>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-4">
                Join <span className="text-[#cc0000]">DOCLSE</span> Today
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Free subscriber membership gets you access to all public events and the community.
                Upgrade to Full Member for exclusive discounts, priority booking, La Passione magazine,
                and the full Ducatista experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register"
                  className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-6 py-3 rounded-md transition-colors">
                  Join Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/membership"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-md transition-colors">
                  View Plans
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Star className="w-5 h-5 text-[#cc0000]" />, text: "Priority event booking" },
                { icon: <Users className="w-5 h-5 text-[#cc0000]" />, text: "Exclusive member community" },
                { icon: <Calendar className="w-5 h-5 text-[#cc0000]" />, text: "Monthly rideouts" },
                { icon: <Star className="w-5 h-5 text-[#cc0000]" />, text: "Partner discounts (15%+)" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 bg-gray-900 rounded-lg p-4">
                  {item.icon}
                  <span className="text-sm text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Ride Reports */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900">Latest Ride Reports</h2>
              <p className="text-gray-500 mt-1">Stories from the road</p>
            </div>
            <Link href="/news" className="hidden sm:flex items-center gap-1 text-[#cc0000] font-semibold text-sm hover:gap-2 transition-all">
              All reports <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestReports.map((report) => (
              <Link key={report.slug} href={`/news/${report.slug}`}
                className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#cc0000]/30 transition-all">
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-4xl">🏍️</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      {report.category}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(report.date)}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#cc0000] transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{report.excerpt}</p>
                  <p className="text-xs text-gray-400 mt-2">By {report.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="w-8 h-8 text-[#cc0000] mx-auto mb-3" />
          <h2 className="text-2xl font-black text-gray-900 mb-2">Find Us</h2>
          <p className="text-gray-500 mb-1">Arch 70, Albert Embankment, London, SE1 7TP</p>
          <p className="text-gray-500 mb-6">Linked to <strong>Ducati London</strong> dealership</p>
          <a
            href="https://maps.app.goo.gl/RYFV9c3YYr7h2Hyx9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-6 py-3 rounded-md transition-colors"
          >
            View on Map <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
