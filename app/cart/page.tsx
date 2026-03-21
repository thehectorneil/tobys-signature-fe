"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {

  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Chocolate Cake",
      price: 1500,
      image: "/banner/banner1.jpg",
      quantity: 1
    },
    {
      id: 2,
      name: "Strawberry Bliss",
      price: 1250,
      image: "/banner/banner2.jpg",
      quantity: 2
    }
  ]);

  const updateQty = (id: number, change: number) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + change;
  
            if (newQty <= 0) return null; // remove item
  
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const applyVoucher = () => {
    if (voucher === "CAKE10") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
      alert("Invalid voucher");
    }
  };

  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-[#191a1e] text-white pt-32 pb-20">

      <div className="max-w-[1000px] mx-auto px-4">

        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-[var(--brand)] mb-10 text-center md:text-left">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 space-y-5">

          <div className="w-20 h-20 rounded-full bg-[#232429] flex items-center justify-center border border-gray-700">
            🛒
          </div>
        
          <h2 className="text-xl font-semibold text-[var(--brand)]">
            Your cart is empty
          </h2>
        
          <p className="text-gray-400 text-sm max-w-xs">
            Looks like you haven't added any cakes yet.
          </p>
        
          <a
            href="/products"
            className="bg-[var(--brand)] text-black font-semibold px-6 py-3 rounded-lg hover:brightness-95 transition"
          >
            Browse Cakes
          </a>
        
        </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="md:col-span-2 space-y-4">

              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-[#232429] p-4 rounded-lg border border-gray-700 animate-[fadeIn_.25s_ease] active:scale-90 transition-transform"
                >

                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                    unoptimized
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-[var(--brand)]">
                      ₱{item.price.toLocaleString()}
                    </p>

                    {/* QUICK CART CONTROL (CardSlider style) */}
                    <div className="mt-3">

                      <div
                        className={`flex items-center justify-end bg-[#f8cf37] rounded-full shadow-md overflow-hidden transition-all duration-300 ${
                          item.quantity === 0 ? "w-6" : "w-20"
                        }`}
                      >

                        {/* TRASH (acts as minus) */}
                        {item.quantity > 0 && (
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="px-2 text-black hover:opacity-70 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}

                        {/* COUNT */}
                        {item.quantity > 0 && (
                          <span className="text-xs font-semibold text-black w-5 text-center">
                            {item.quantity}
                          </span>
                        )}

                        {/* PLUS */}
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="p-1 text-black hover:opacity-70 transition"
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-[#232429] p-6 rounded-lg border border-gray-700 h-fit">

              <h2 className="text-lg font-semibold mb-4">
                Order Summary
              </h2>

              {/* VOUCHER */}
              <div className="mb-4">

                <label className="text-sm text-gray-400">
                  Voucher
                </label>

                <div className="flex mt-2">

                  <input
                    value={voucher}
                    onChange={(e)=>setVoucher(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 bg-[#191a1e] border border-gray-700 p-2 text-sm rounded-l-md"
                  />

                  <button
                    onClick={applyVoucher}
                    className="bg-[var(--brand)] text-black px-4 rounded-r-md font-semibold"
                  >
                    Apply
                  </button>

                </div>

              </div>

              {/* PRICE */}
              <div className="space-y-2 text-sm">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>- ₱{discount.toLocaleString()}</span>
                </div>

                <div className="border-t border-gray-700 pt-2 flex justify-between font-semibold text-[#f8cf37]">
                <span>Total</span>
                <span>₱{total.toLocaleString()}</span>
                </div>

              </div>

              {/* CHECKOUT */}
              <button
                className="mt-6 w-full bg-[var(--brand)] text-black font-semibold py-3 rounded-lg hover:brightness-95 transition"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}