"use client";

import { ShoppingCart, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";
import { useState } from "react";

export default function ShopPage() {
  return (
    <div>
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#cc0000] font-semibold uppercase tracking-widest text-sm mb-3">Shop</p>
          <h1 className="text-5xl font-black mb-4">DOCLSE Merchandise</h1>
          <p className="text-gray-300 text-lg">Official club gear. Wear your passion.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add({ slug: product.slug, name: product.name, price: product.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
      <div className="bg-gradient-to-br from-gray-900 to-black h-56 flex items-center justify-center">
        <ShoppingCart className="w-16 h-16 text-[#cc0000] group-hover:scale-110 transition-transform" />
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
          {product.category}
        </span>
        <h2 className="font-black text-gray-900 text-xl mt-3 mb-1">{product.name}</h2>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-[#cc0000]">{formatPrice(product.price)}</span>
          <button
            onClick={handleAdd}
            className={`inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-md transition-all text-sm ${
              added
                ? "bg-green-600 text-white"
                : "bg-[#cc0000] hover:bg-[#990000] text-white"
            }`}
          >
            {added ? <><Check className="w-4 h-4" /> Added!</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  );
}
