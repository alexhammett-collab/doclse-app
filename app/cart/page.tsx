"use client";

import Link from "next/link";
import { Trash2, ShoppingCart, ArrowRight, Plus, Minus } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, remove, update, total, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some merchandise from the shop.</p>
        <Link href="/shop"
          className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-6 py-3 rounded-md transition-colors">
          Browse Shop <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-[88px] pb-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.slug} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                <p className="text-[#cc0000] font-semibold">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => update(item.slug, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => update(item.slug, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={() => remove(item.slug)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={clear}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
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
              <p className="text-xs text-gray-400 mt-1">Shipping calculated at checkout</p>
            </div>
            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/shop" className="w-full inline-flex items-center justify-center mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
