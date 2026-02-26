"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, CreditCard, Lock, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  postcode: z.string().min(3, "Postcode required"),
  cardNumber: z.string().min(16, "Card number required").max(19),
  expiry: z.string().min(5, "Expiry required"),
  cvc: z.string().min(3, "CVC required"),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    clear();
    setSuccess(true);
    setLoading(false);
  }

  if (items.length === 0 && !success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black text-gray-900 mb-4">Your cart is empty</h1>
        <Link href="/shop" className="text-[#cc0000] hover:underline">← Back to Shop</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-fade-in">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-black text-gray-900 mb-3">Order Confirmed!</h1>
        <p className="text-gray-500 mb-2">Thank you for your order. A confirmation email will be sent shortly.</p>
        <p className="text-xs text-gray-400 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 inline-block mb-8">
          🔔 This is a mock checkout — no real payment was taken.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="inline-flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-6 py-3 rounded-md transition-colors">
            Continue Shopping
          </Link>
          <Link href="/account" className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-md transition-colors">
            My Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#cc0000] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>
      <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout</h1>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-8 text-sm text-yellow-800">
        🔔 <strong>Demo mode:</strong> This is a mock checkout. No real payment will be taken.
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="font-black text-gray-900 text-lg mb-4">Delivery Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input {...register("name")} placeholder="Jonathan Tait"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input {...register("email")} type="email" placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input {...register("address")} placeholder="123 High Street"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input {...register("city")} placeholder="London"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                  <input {...register("postcode")} placeholder="SE1 7TP"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
                  {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode.message}</p>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="font-black text-gray-900 text-lg mb-1 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#cc0000]" /> Payment
              </h2>
              <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Mock payment — enter any values
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input {...register("cardNumber")} placeholder="4242 4242 4242 4242"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent font-mono" />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <input {...register("expiry")} placeholder="12/27"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent font-mono" />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input {...register("cvc")} placeholder="123"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent font-mono" />
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
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.slug} className="flex justify-between text-sm text-gray-600">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-black text-gray-900">
                  <span>Total</span>
                  <span className="text-[#cc0000]">{formatPrice(total())}</span>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#990000] disabled:opacity-70 text-white font-semibold px-6 py-3 rounded-md transition-colors">
                {loading ? "Processing..." : `Pay ${formatPrice(total())}`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
