"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ShoppingCart, User, ChevronDown, LogOut } from "lucide-react";
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
    label: "Membership",
    children: [
      { label: "Membership Overview", href: "/membership" },
      { label: "Member Discounts", href: "/discounts" },
      { label: "La Passione Magazine", href: "/la-passione" },
    ],
  },
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

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#cc0000] rounded-full flex items-center justify-center font-bold text-xs">
              DOC
            </div>
            <span className="font-bold text-base hidden sm:block tracking-wide">
              DOC <span className="text-[#cc0000]">LSE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-gray-900 border border-gray-700 rounded-md shadow-xl py-1 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
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
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "text-white bg-gray-800"
                      : "text-gray-200 hover:text-white hover:bg-gray-800"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative p-2 text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#cc0000] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group hidden lg:block"
                onMouseEnter={() => setOpenDropdown("user")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
                  <User className="w-4 h-4" />
                  <span className="hidden xl:block">{user.name.split(" ")[0]}</span>
                </button>
                {openDropdown === "user" && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-xl py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{user.name}</p>
                      <span className="inline-block text-xs bg-[#cc0000] text-white px-2 py-0.5 rounded-full mt-1 capitalize">
                        {user.role}
                      </span>
                    </div>
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white">
                      My Account
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
              >
                <User className="w-4 h-4" /> Login
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-gray-200 hover:text-white hover:bg-gray-800 rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-black">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md"
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
                    "block px-3 py-2 text-sm font-medium rounded-md",
                    pathname === item.href
                      ? "text-white bg-gray-800"
                      : "text-gray-200 hover:text-white hover:bg-gray-800"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-2 border-t border-gray-800">
              {user ? (
                <>
                  <Link href="/account" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md" onClick={() => setMobileOpen(false)}>
                    My Account ({user.name})
                  </Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md" onClick={() => setMobileOpen(false)}>
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
