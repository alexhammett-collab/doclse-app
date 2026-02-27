"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
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
      { label: "RideSwap", href: "/rideswap" },
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          transparent
            ? "bg-transparent"
            : "bg-black/80 backdrop-blur-xl"
        )}
        style={{ height: "var(--nav-height)", borderBottom: scrolled || open ? "1px solid rgba(255,255,255,0.05)" : "none" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 h-full flex items-center justify-between">

          {/* Left: burger + logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(!open)}
              className="relative w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={close}>
              <div className="w-7 h-7 bg-[#cc0000] rounded-full flex items-center justify-center font-black text-[0.5rem] tracking-wider text-white">
                DOC
              </div>
              <span className="font-black text-white text-sm tracking-[0.15em] hidden sm:block">
                DOC<span className="text-[#cc0000]">LSE</span>
              </span>
            </Link>
          </div>

          {/* Right: cart + user */}
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative p-2 text-white/50 hover:text-white transition-colors">
              <ShoppingCart style={{ width: 18, height: 18 }} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#cc0000] text-white text-[0.55rem] w-4 h-4 flex items-center justify-center font-bold leading-none rounded-full">
                  {count}
                </span>
              )}
            </Link>

            {user ? (
              <Link href="/account" className="flex items-center gap-2 p-2 text-white/50 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-[#cc0000] flex items-center justify-center text-[0.55rem] font-black text-white">
                  {user.name[0]}
                </div>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 text-[0.7rem] font-bold text-white/50 hover:text-white tracking-[0.1em] uppercase transition-colors px-3 py-2"
              >
                <User className="w-3.5 h-3.5" /> Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Backdrop overlay ────────────────────────────────────────── */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={close}
      />

      {/* ── Slide-out side panel (left) ─────────────────────────────── */}
      <nav
        className={cn(
          "fixed top-0 left-0 bottom-0 z-[70] w-[320px] max-w-[85vw] bg-[#0a0a0a] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-7 shrink-0" style={{ height: "var(--nav-height)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <Link href="/" className="flex items-center gap-2.5" onClick={close}>
            <div className="w-7 h-7 bg-[#cc0000] rounded-full flex items-center justify-center font-black text-[0.5rem] tracking-wider text-white">
              DOC
            </div>
            <span className="font-black text-white text-sm tracking-[0.15em]">
              DOC<span className="text-[#cc0000]">LSE</span>
            </span>
          </Link>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable nav links */}
        <div className="flex-1 overflow-y-auto py-6 px-5" style={{ scrollbarWidth: "none" }}>
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label} className="mb-6">
                <p className="px-2 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/20 mb-3">
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "block px-2 py-2.5 text-[0.85rem] font-medium transition-colors",
                      pathname === child.href
                        ? "text-[#cc0000]"
                        : "text-white/60 hover:text-white"
                    )}
                    onClick={close}
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
                  "flex items-center gap-2.5 px-2 py-3 text-[0.95rem] font-bold transition-colors",
                  pathname === item.href
                    ? "text-[#cc0000]"
                    : "text-white/70 hover:text-white"
                )}
                onClick={close}
              >
                {(item as { live?: boolean }).live && (
                  <span className="w-2 h-2 rounded-full bg-[#cc0000] animate-pulse" />
                )}
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Panel footer: user */}
        <div className="shrink-0 px-5 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {user ? (
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-8 h-8 rounded-full bg-[#cc0000] flex items-center justify-center text-[0.6rem] font-black text-white shrink-0">
                  {user.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-bold truncate">{user.name}</p>
                  <p className="text-white/30 text-[0.65rem] uppercase tracking-wider">{user.role}</p>
                </div>
              </div>
              <Link href="/account" className="block px-2 py-2 text-sm text-white/50 hover:text-white transition-colors" onClick={close}>
                My Account
              </Link>
              <button onClick={() => { logout(); close(); }} className="flex items-center gap-2 w-full px-2 py-2 text-sm text-white/50 hover:text-white transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#cc0000] text-white font-bold text-sm tracking-wide hover:bg-[#aa0000] transition-colors"
              onClick={close}
            >
              <User className="w-4 h-4" /> Login / Register
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
