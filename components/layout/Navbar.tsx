"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User, ChevronDown, LogOut, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-store";

const NAV_ITEMS = [
  {
    label: "The Club",
    children: [
      { label: "About The Club", href: "/about" },
      { label: "The Team", href: "/team" },
    ],
  },
  { label: "Events", href: "/events" },
  {
    label: "Rides",
    children: [
      { label: "Ride Outs & Route Planner", href: "/rides" },
      { label: "Route Intelligence", href: "/route-intelligence" },
      { label: "RideSwap ↔ Swap Your Ducati", href: "/rideswap" },
    ],
  },
  {
    label: "Membership",
    children: [
      { label: "Membership Overview", href: "/membership" },
      { label: "Member Discounts", href: "/discounts" },
      { label: "La Passione Magazine", href: "/la-passione" },
    ],
  },
  { label: "Pulse", href: "/pulse", live: true },
  { label: "Shop", href: "/shop" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const count = useCart((s) => s.count());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "bg-black/90 backdrop-blur-xl border-b border-white/[0.06]"
      )}
      style={{ height: "var(--nav-height)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-[#cc0000] rounded-full flex items-center justify-center font-black text-[0.6rem] tracking-wider text-white">
            DOC
          </div>
          <span className="font-black text-white text-base tracking-widest hidden sm:block">
            DOC<span className="text-[#cc0000]">LSE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-white/75 hover:text-white rounded-full transition-colors hover:bg-white/[0.08]">
                  {item.label}
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#111]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl py-2 z-50 overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-full transition-colors",
                  pathname === item.href
                    ? "text-white bg-white/10"
                    : "text-white/75 hover:text-white hover:bg-white/[0.08]"
                )}
              >
                {(item as { live?: boolean }).live && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] animate-pulse" />
                )}
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Link href="/cart" className="relative p-2.5 text-white/70 hover:text-white rounded-full hover:bg-white/[0.08] transition-colors">
            <ShoppingCart className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#cc0000] text-white text-[0.6rem] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setOpenDropdown("user")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/70 hover:text-white rounded-full hover:bg-white/[0.08] transition-colors">
                <div className="w-6 h-6 rounded-full bg-[#cc0000] flex items-center justify-center text-[0.6rem] font-black text-white">
                  {user.name[0]}
                </div>
                <span className="hidden xl:block">{user.name.split(" ")[0]}</span>
              </button>
              {openDropdown === "user" && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#111]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl py-2 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <p className="text-xs text-white/40 mb-0.5">Signed in as</p>
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <span className="inline-block text-[0.65rem] bg-[#cc0000] text-white px-2 py-0.5 rounded-full mt-1.5 font-bold uppercase tracking-wider capitalize">
                      {user.role}
                    </span>
                  </div>
                  <Link href="/account" className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors" onClick={() => setOpenDropdown(null)}>
                    My Account
                  </Link>
                  <button onClick={logout} className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors">
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden lg:flex items-center gap-2 btn btn-primary !py-2 !px-4 !text-xs"
            >
              <User className="w-3.5 h-3.5" /> Login
            </Link>
          )}

          <button
            className="lg:hidden p-2.5 text-white/70 hover:text-white rounded-full hover:bg-white/[0.08] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="mb-2">
                  <p className="px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "block px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                    pathname === item.href
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-3 mt-3 border-t border-white/[0.06]">
              {user ? (
                <>
                  <Link href="/account" className="block px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] rounded-xl" onClick={() => setMobileOpen(false)}>
                    My Account
                  </Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] rounded-xl">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" className="block px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] rounded-xl" onClick={() => setMobileOpen(false)}>
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
