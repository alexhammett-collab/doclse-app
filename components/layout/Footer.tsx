import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#cc0000] rounded-full flex items-center justify-center font-bold text-xs text-white">
                DOC
              </div>
              <span className="font-bold text-white text-lg tracking-wide">
                DOC <span className="text-[#cc0000]">LSE</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ducati Official Club London &amp; South East. Founded April 2024.
              All about passion for Ducati.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/doclse.club/" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.x.com/DOCLSECLUB" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/doclse.club/" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About The Club", href: "/about" },
                { label: "Events", href: "/events" },
                { label: "Membership", href: "/membership" },
                { label: "Shop", href: "/shop" },
                { label: "News", href: "/news" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Members */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Members</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Login", href: "/login" },
                { label: "Register", href: "/register" },
                { label: "My Account", href: "/account" },
                { label: "Member Discounts", href: "/discounts" },
                { label: "La Passione Magazine", href: "/la-passione" },
                { label: "Ride Waiver", href: "/ride-waiver" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Head Office</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#cc0000]" />
                <address className="not-italic">
                  Arch 70<br />
                  Albert Embankment<br />
                  London, SE1 7TP
                </address>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#cc0000]" />
                <a href="mailto:info@doclse.club" className="hover:text-white transition-colors">
                  info@doclse.club
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Ducati Official Club London &amp; South East. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms & Conditions</Link>
            <Link href="/diversity-inclusion" className="hover:text-gray-300 transition-colors">D&I Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
