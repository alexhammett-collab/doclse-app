"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Calendar, Star, LogOut, ArrowRight, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { EVENTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function AccountPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const upcomingEvents = EVENTS.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">{user.name}</h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                user.role === "paid"
                  ? "bg-[#cc0000] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}>
                {user.role === "paid" ? <><Star className="w-3 h-3" /> Full Member</> : "Subscriber"}
              </span>
              <span className="text-xs text-gray-400">Member since {formatDate(user.joinedDate)}</span>
            </div>
          </div>
        </div>
        <button onClick={() => { logout(); router.push("/"); }}
          className="hidden sm:flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors border border-gray-200 rounded-lg px-3 py-2">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Upgrade banner */}
      {user.role === "subscriber" && (
        <div className="bg-black text-white rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg mb-1">Upgrade to Full Member</p>
            <p className="text-gray-400 text-sm">Unlock priority booking, exclusive discounts, La Passione magazine and more for just £30/year.</p>
          </div>
          <Link href="/checkout/membership"
            className="shrink-0 inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-5 py-2.5 rounded-md transition-colors text-sm">
            Upgrade Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming events */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-gray-900 text-lg">Upcoming Events</h2>
              <Link href="/events" className="text-sm text-[#cc0000] hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <Link key={event.slug} href={`/events/${event.slug}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="w-10 h-10 bg-[#cc0000]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#cc0000]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-[#cc0000] transition-colors truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(event.date)}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#cc0000] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Membership details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-black text-gray-900 text-lg mb-4">Membership Details</h2>
            <div className="space-y-3">
              {[
                { label: "Plan", value: user.role === "paid" ? "Full Member" : "Subscriber (Free)" },
                { label: "Member Since", value: formatDate(user.joinedDate) },
                { label: "Status", value: "Active" },
                { label: "Email", value: user.email },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: "Browse Events", href: "/events" },
                { label: "Shop", href: "/shop" },
                { label: "Member Discounts", href: "/discounts" },
                { label: "La Passione Magazine", href: "/la-passione" },
                { label: "Ride Waiver", href: "/ride-waiver" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href}
                  className="flex items-center justify-between p-2.5 bg-white rounded-lg text-sm text-gray-700 hover:text-[#cc0000] hover:shadow-sm transition-all">
                  {link.label}
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                </Link>
              ))}
            </div>
          </div>

          {user.role === "paid" && (
            <div className="bg-[#cc0000] text-white rounded-2xl p-5">
              <Shield className="w-6 h-6 mb-2" />
              <p className="font-bold mb-1">Full Member</p>
              <p className="text-red-100 text-xs leading-relaxed">
                You have access to all member benefits including priority booking, exclusive discounts, and La Passione.
              </p>
            </div>
          )}

          <button onClick={() => { logout(); router.push("/"); }}
            className="w-full flex items-center justify-center gap-2 sm:hidden border border-gray-200 rounded-xl p-3 text-sm text-gray-500 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
