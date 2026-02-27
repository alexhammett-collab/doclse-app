"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, CreditCard, Lock, Star, ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const schema = z.object({
  cardNumber: z.string().min(16, "Card number required"),
  expiry: z.string().min(5, "Expiry required"),
  cvc: z.string().min(3, "CVC required"),
  name: z.string().min(2, "Name on card required"),
});
type FormData = z.infer<typeof schema>;

export default function MembershipCheckoutPage() {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-fade-in">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-black text-gray-900 mb-3">Welcome, Full Member!</h1>
        <p className="text-gray-500 mb-2">Your Full Membership is now active. Enjoy all the exclusive benefits.</p>
        <p className="text-xs text-gray-400 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 inline-block mb-8">
          🔔 This is a mock checkout — no real payment was taken.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/account" className="inline-flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-6 py-3 rounded-md transition-colors">
            My Account
          </Link>
          <Link href="/discounts" className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-md transition-colors">
            View Member Discounts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-[88px] pb-12">
      <Link href="/membership" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#cc0000] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Membership
      </Link>
      <h1 className="text-3xl font-black text-gray-900 mb-2">Upgrade to Full Member</h1>
      <p className="text-gray-500 mb-8">£30.00 / year — cancel any time</p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-8 text-sm text-yellow-800">
        🔔 <strong>Demo mode:</strong> This is a mock checkout. No real payment will be taken.
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="font-black text-gray-900 text-lg mb-1 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#cc0000]" /> Payment Details
              </h2>
              <p className="text-xs text-gray-400 mb-5 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Mock payment — enter any values
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input {...register("name")} placeholder="Jonathan Tait"
                    defaultValue={user?.name ?? ""}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input {...register("cardNumber")} placeholder="4242 4242 4242 4242"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent font-mono" />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <input {...register("expiry")} placeholder="12/27"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent font-mono" />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input {...register("cvc")} placeholder="123"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent font-mono" />
                    {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc.message}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h2 className="font-black text-gray-900 text-lg mb-4">Order Summary</h2>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                <Star className="w-5 h-5 text-[#cc0000]" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Full Membership</p>
                  <p className="text-xs text-gray-400">Annual · Auto-renews yearly</p>
                </div>
              </div>
              <div className="flex justify-between font-black text-gray-900 mb-6">
                <span>Total today</span>
                <span className="text-[#cc0000]">£30.00</span>
              </div>
              <button type="submit" disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#990000] disabled:opacity-70 text-white font-semibold px-6 py-3 rounded-md transition-colors">
                {loading ? "Processing..." : "Pay £30.00"}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                Cancel any time. No hidden fees.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
