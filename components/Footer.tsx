"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/toby.jpg";
import { Facebook, Instagram, Mail } from "lucide-react";
import { useState } from "react";

export default function Footer() {

  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#191a1e] text-gray-300 mt-24">

      {/* WAVE DIVIDER */}
      <div className="absolute top-[-80px] left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#191a1e"
            d="M0,96L60,112C120,128,240,160,360,176C480,192,600,192,720,176C840,160,960,128,1080,122.7C1200,117,1320,139,1380,149.3L1440,160V320H0Z"
          />
        </svg>
      </div>

      {/* GOLD GRADIENT LINE */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#f8cf37] to-transparent"></div>

      <div className="max-w-[1000px] mx-auto px-6 py-16">

        {/* GRID */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">

              <Image
                src={Logo}
                alt="Toby's Signature"
                width={45}
                height={45}
                className="rounded-full"
              />

              <span className="text-[var(--brand)] text-2xl font-semibold">
                Toby's Signature
              </span>

            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              Premium handcrafted cakes made for life's sweetest moments.
            </p>

          </div>

          {/* SHOP LINKS */}
          <div>
            <h3 className="text-[var(--brand)] font-semibold mb-4">
              Shop
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link href="/products" className="hover:text-[var(--brand)] transition">
                  All Cakes
                </Link>
              </li>

              <li>
                <Link href="/custom" className="hover:text-[var(--brand)] transition">
                  Custom Cakes
                </Link>
              </li>

              <li>
                <Link href="/favourite" className="hover:text-[var(--brand)] transition">
                  Favourite
                </Link>
              </li>

            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-[var(--brand)] font-semibold mb-4">
              Company
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link href="/about" className="hover:text-[var(--brand)] transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/support" className="hover:text-[var(--brand)] transition">
                  Support
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-[var(--brand)] transition">
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>

            <h3 className="text-[var(--brand)] font-semibold mb-4">
              Newsletter
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Get exclusive cake deals and promotions.
            </p>

            <form onSubmit={handleSubscribe} className="flex">

              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-l-md bg-[#232429] border border-gray-700 focus:outline-none"
              />

              <button
                type="submit"
                className="px-4 py-2 bg-[#f8cf37] text-black text-sm font-semibold rounded-r-md hover:brightness-95 transition"
              >
                Join
              </button>

            </form>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="hover:text-[var(--brand)] transition transform hover:scale-110"
              >
                <Facebook size={20} />
              </a>

              <a
                href="#"
                className="hover:text-[var(--brand)] transition transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>

              <a
                href="#"
                className="hover:text-[var(--brand)] transition transform hover:scale-110"
              >
                <Mail size={20} />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Toby's Signature. All rights reserved.
      </div>

    </footer>
  );
}