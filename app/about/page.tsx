import Link from "next/link";
import { ArrowRight, Heart, Users, Bike } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About The Club" };

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white pt-[72px] pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-[#cc0000] font-semibold uppercase tracking-widest text-sm mb-3">About The Club</p>
            <h1 className="text-5xl font-black mb-6">Ducati Official Club<br /><span className="text-[#cc0000]">London &amp; South East</span></h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you&apos;re into racing, commuting or touring, there&apos;s something extra special
              about the Ducati experience. DOCLSE was founded to bring that experience to life — together.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in April 2024, the Ducati Official Club London &amp; South East (DOCLSE)
                  was born out of a shared passion for one of the world&apos;s most iconic motorcycle brands.
                </p>
                <p>
                  We&apos;re linked to the <strong className="text-gray-900">Ducati London dealership</strong> at
                  Arch 70, Albert Embankment — right on the South Bank of the Thames. It&apos;s the perfect
                  base for a club that loves riding through some of the most scenic roads in the South East.
                </p>
                <p>
                  From inaugural rideouts along the Surrey Hills to fish &amp; chips by the sea, we organise
                  events and activities for riders, passengers, and fans alike. You don&apos;t even need to
                  own a Ducati — just share the passion.
                </p>
              </div>
              <Link href="/membership"
                className="inline-flex items-center gap-2 mt-8 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-6 py-3 rounded-md transition-colors">
                Join Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "2024", label: "Year Founded" },
                { num: "150+", label: "Members" },
                { num: "30+", label: "Events Run" },
                { num: "SE1", label: "Home Postcode" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-[#cc0000]">{s.num}</div>
                  <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Bike className="w-8 h-8 text-[#cc0000]" />,
                title: "We Ride Bikes",
                desc: "Monthly organised rideouts across all points of the compass — north, south, east and west. From coastal blasts to twisty country lanes, every ride is an adventure.",
              },
              {
                icon: <Heart className="w-8 h-8 text-[#cc0000]" />,
                title: "We Support Charities",
                desc: "Giving back is important to us. We organise charity rideouts and events to support causes close to our members' hearts.",
              },
              {
                icon: <Users className="w-8 h-8 text-[#cc0000]" />,
                title: "We Bring People Together",
                desc: "BBQs, track days, social nights, World Ducati Week — all united by a shared love of Ducati and the community it creates.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership benefits */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-black mb-4">Membership Benefits</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Subscriber membership is free. Upgrade to Full Member to unlock the full Ducatista experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left mb-10">
            {[
              "Priority event booking",
              "Exclusive member discounts",
              "La Passione club magazine",
              "World Ducati Week group trips",
              "Member-only rideouts",
              "Voting rights at AGM",
              "Digital membership card",
              "Access to partner offers",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 bg-gray-900 rounded-xl p-4">
                <span className="w-2 h-2 rounded-full bg-[#cc0000] shrink-0" />
                <span className="text-sm text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
          <Link href="/membership"
            className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-8 py-3 rounded-md transition-colors">
            View Membership Plans <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-3">Meet the Team</h2>
          <p className="text-gray-500 mb-6">The passionate people who make DOCLSE happen.</p>
          <Link href="/team"
            className="inline-flex items-center gap-2 border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-semibold px-6 py-3 rounded-md transition-colors">
            The Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
