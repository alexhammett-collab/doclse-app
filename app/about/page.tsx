import Link from "next/link";
import { ArrowRight, Heart, Users, Bike } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About The Club" };

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen text-white" style={{ paddingTop: 72 }}>
      {/* Hero with background image */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=85&fit=crop)",
        }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-12">
          <span className="text-[#cc0000] text-[0.65rem] font-bold tracking-[0.25em] uppercase">About The Club</span>
          <h1 className="font-black text-white mt-3" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
            Ducati Official Club<br /><span style={{ color: "#cc0000" }}>London &amp; South East</span>
          </h1>
          <p className="text-white/45 text-lg font-light max-w-lg mt-4 leading-relaxed">
            Whether you&apos;re into racing, commuting or touring, there&apos;s something extra special
            about the Ducati experience. DOCLSE was founded to bring that experience to life — together.
          </p>
        </div>
      </div>

      {/* Story with image */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <h2 className="font-black text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                  Our Story
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <div className="space-y-4 text-white/40 leading-relaxed mt-8">
                  <p>
                    Founded in April 2024, the Ducati Official Club London &amp; South East (DOCLSE)
                    was born out of a shared passion for one of the world&apos;s most iconic motorcycle brands.
                  </p>
                  <p>
                    We&apos;re linked to the <strong className="text-white">Ducati London dealership</strong> at
                    Arch 70, Albert Embankment — right on the South Bank of the Thames. It&apos;s the perfect
                    base for a club that loves riding through some of the most scenic roads in the South East.
                  </p>
                  <p>
                    From inaugural rideouts along the Surrey Hills to fish &amp; chips by the sea, we organise
                    events and activities for riders, passengers, and fans alike. You don&apos;t even need to
                    own a Ducati — just share the passion.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Link href="/membership"
                  className="inline-flex items-center gap-3 mt-8 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold text-sm tracking-wide px-8 py-4 transition-colors">
                  Join Us <ArrowRight className="w-4 h-4" />
                </Link>
              </ScrollReveal>
            </div>
            <div className="relative">
              <div className="h-80 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{
                  backgroundImage: "url(https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800&q=80&fit=crop)",
                }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 60%)" }} />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  { num: "2024", label: "Year Founded" },
                  { num: "150+", label: "Members" },
                  { num: "30+", label: "Events Run" },
                  { num: "SE1", label: "Home Postcode" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#0e0e0e] p-5" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="font-black text-2xl text-white tracking-tight">{s.num}</div>
                    <div className="text-[0.6rem] font-bold text-white/20 uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do — with images */}
      <section style={{ background: "#060606" }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <ScrollReveal>
            <p className="text-[0.65rem] font-black text-white/20 uppercase tracking-[0.2em] mb-6">What We Do</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Bike className="w-5 h-5 text-[#cc0000]" />,
                title: "We Ride Bikes",
                desc: "Monthly organised rideouts across all points of the compass — north, south, east and west. From coastal blasts to twisty country lanes, every ride is an adventure.",
                img: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=600&q=80&fit=crop",
              },
              {
                icon: <Heart className="w-5 h-5 text-[#cc0000]" />,
                title: "We Support Charities",
                desc: "Giving back is important to us. We organise charity rideouts and events to support causes close to our members' hearts.",
                img: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80&fit=crop",
              },
              {
                icon: <Users className="w-5 h-5 text-[#cc0000]" />,
                title: "We Bring People Together",
                desc: "BBQs, track days, social nights, World Ducati Week — all united by a shared love of Ducati and the community it creates.",
                img: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80&fit=crop",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="bg-[#0e0e0e] overflow-hidden group" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="h-44 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${item.img})` }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,14,14,1) 0%, rgba(0,0,0,0.2) 60%)" }} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {item.icon}
                      <h3 className="font-black text-white text-lg">{item.title}</h3>
                    </div>
                    <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Membership benefits */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <ScrollReveal>
            <p className="text-[0.65rem] font-black text-white/20 uppercase tracking-[0.2em] mb-3">Membership</p>
            <h2 className="font-black text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1, letterSpacing: "-0.03em" }}>
              Benefits
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-white/35 text-sm max-w-lg mb-10">
              Subscriber membership is free. Upgrade to Full Member to unlock the full Ducatista experience.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {[
              "Priority event booking",
              "Exclusive member discounts",
              "La Passione club magazine",
              "World Ducati Week group trips",
              "Member-only rideouts",
              "Voting rights at AGM",
              "Digital membership card",
              "Access to partner offers",
            ].map((benefit, i) => (
              <ScrollReveal key={benefit} delay={i * 40}>
                <div className="flex items-center gap-3 bg-[#0e0e0e] p-4" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] shrink-0" />
                  <span className="text-sm text-white/50">{benefit}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <Link href="/membership"
            className="inline-flex items-center gap-3 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold text-sm tracking-wide px-8 py-4 transition-colors">
            View Membership Plans <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Team CTA with image */}
      <section className="relative overflow-hidden" style={{ background: "#060606" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1558980394-34764db076b4?w=1200&q=80&fit=crop)",
        }} />
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20 relative z-10 text-center">
          <h2 className="font-black text-white text-2xl mb-3">Meet the Team</h2>
          <p className="text-white/30 text-sm mb-6">The passionate people who make DOCLSE happen.</p>
          <Link href="/team"
            className="inline-flex items-center gap-3 text-white/50 hover:text-white font-bold text-sm tracking-wide px-8 py-4 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            The Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
