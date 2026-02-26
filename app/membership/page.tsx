import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Membership" };

export default function MembershipPage() {
  return (
    <div>
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#cc0000] font-semibold uppercase tracking-widest text-sm mb-3">Membership</p>
          <h1 className="text-5xl font-black mb-4">Join DOCLSE</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            We welcome all Ducati enthusiasts — new riders, seasoned Ducatistas, or simply fans of the brand.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 relative ${
                  plan.highlight
                    ? "bg-black text-white ring-2 ring-[#cc0000]"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#cc0000] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h2 className={`text-2xl font-black mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h2>
                  <p className={`text-sm mb-4 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-black ${plan.highlight ? "text-[#cc0000]" : "text-gray-900"}`}>
                      {plan.price === 0 ? "Free" : formatPrice(plan.price)}
                    </span>
                    {plan.price > 0 && (
                      <span className={`text-sm ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? "text-[#cc0000]" : "text-green-500"}`} />
                      <span className={`text-sm ${plan.highlight ? "text-gray-300" : "text-gray-600"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.price === 0 ? "/register" : "/checkout/membership"}
                  className={`w-full inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-md transition-colors ${
                    plan.highlight
                      ? "bg-[#cc0000] hover:bg-[#990000] text-white"
                      : "border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900"
                  }`}
                >
                  {plan.price === 0 ? "Join Free" : "Become a Full Member"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Full membership billed annually. Cancel any time. Questions?{" "}
            <Link href="/contact" className="text-[#cc0000] hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              {
                q: "Do I need to own a Ducati to join?",
                a: "No! DOCLSE is open to everyone who has a passion for Ducati — whether you ride, passenger, or simply love the brand.",
              },
              {
                q: "What's the difference between Subscriber and Full Member?",
                a: "Subscriber is free and gives you access to public events and club updates. Full Member (£30/year) unlocks priority booking, exclusive discounts, La Passione magazine, WDW group trips, and voting rights.",
              },
              {
                q: "How do I pay for Full Membership?",
                a: "Full membership is paid online via card. Your membership is valid for 12 months from the date of payment.",
              },
              {
                q: "Can I upgrade from Subscriber to Full Member?",
                a: "Absolutely. Log in to your account and select 'Upgrade to Full Member' at any time.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
