import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, MapPin } from "lucide-react";

const COL_LINKS = [
  {
    heading: "Explore",
    links: [
      { label: "About The Club", href: "/about" },
      { label: "The Team", href: "/team" },
      { label: "Events", href: "/events" },
      { label: "Ride Outs", href: "/rides" },
      { label: "Route Intelligence", href: "/route-intelligence" },
      { label: "News", href: "/news" },
    ],
  },
  {
    heading: "Membership",
    links: [
      { label: "Join The Club", href: "/register" },
      { label: "Membership Plans", href: "/membership" },
      { label: "Member Discounts", href: "/discounts" },
      { label: "La Passione Magazine", href: "/la-passione" },
      { label: "Ride Waiver", href: "/ride-waiver" },
      { label: "My Account", href: "/account" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "D&I Policy", href: "/diversity-inclusion" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] text-white border-t border-white/[0.05]">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand col — spans 2 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-[#cc0000] rounded-full flex items-center justify-center font-black text-[0.6rem] tracking-wider text-white shrink-0">
                DOC
              </div>
              <span className="font-black text-white text-lg tracking-widest">
                DOC<span className="text-[#cc0000]">LSE</span>
              </span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-8 max-w-xs">
              The official Ducati club for London &amp; the South East. Founded April 2024.
              Riders, passengers &amp; devotees — united by the passion.
            </p>

            {/* Social */}
            <div className="flex gap-3 mb-10">
              {[
                { href: "https://www.facebook.com/doclse.club/", Icon: Facebook, label: "Facebook" },
                { href: "https://www.x.com/DOCLSECLUB", Icon: Twitter, label: "X / Twitter" },
                { href: "https://www.instagram.com/doclse.club/", Icon: Instagram, label: "Instagram" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Address */}
            <div className="space-y-2 text-sm text-white/35">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#cc0000]" />
                <span>Arch 70, Albert Embankment, London SE1 7TP</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0 text-[#cc0000]" />
                <a href="mailto:info@doclse.club" className="hover:text-white transition-colors">info@doclse.club</a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {COL_LINKS.map((col) => (
            <div key={col.heading}>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/25 mb-5">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors leading-none">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Ducati Official Club London &amp; South East · All rights reserved
          </p>
          <p className="text-white/15 text-xs">
            Ducati and related marks are trademarks of Ducati Motor Holding S.p.A.
          </p>
        </div>
      </div>
    </footer>
  );
}
