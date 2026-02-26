import Link from "next/link";
import { Tag, Lock } from "lucide-react";
import { DISCOUNTS } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Member Discounts" };

export default function DiscountsPage() {
  const categories = Array.from(new Set(DISCOUNTS.map((d) => d.category)));

  return (
    <div>
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#cc0000] font-semibold uppercase tracking-widest text-sm mb-3">Full Members Only</p>
          <h1 className="text-5xl font-black mb-4">Member Discounts</h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Exclusive partner discounts available to Full Members. Upgrade your membership to unlock them all.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 flex items-start gap-4">
            <Lock className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900 mb-1">Full Members Only</p>
              <p className="text-sm text-amber-700">
                These discounts are exclusively available to Full Members (£30/year).{" "}
                <Link href="/membership" className="font-semibold underline">Upgrade your membership</Link> to access all partner benefits.
              </p>
            </div>
          </div>

          {categories.map((category) => (
            <div key={category} className="mb-10">
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#cc0000]" /> {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DISCOUNTS.filter((d) => d.category === category).map((discount) => (
                  <div key={discount.partner} className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-[#cc0000]/30 hover:shadow-sm transition-all">
                    <h3 className="font-bold text-gray-900 mb-1">{discount.partner}</h3>
                    <p className="text-[#cc0000] font-semibold text-sm">{discount.discount}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8 bg-black text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black mb-2">Want access to all discounts?</h2>
            <p className="text-gray-400 mb-6">Become a Full Member for just £30/year and unlock every partner benefit.</p>
            <Link href="/membership"
              className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-8 py-3 rounded-md transition-colors">
              Upgrade to Full Member
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
