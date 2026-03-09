"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/toby.jpg";
import { Menu, X, ShoppingCart, User } from "lucide-react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = 3; // can be dynamic later

  return (
    <>
      {/* 🔺 NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-[#191a1e] text-white shadow-md z-50">
        <div className="max-w-[1000px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left Section: Logo + Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/">
              <Image
                src={Logo}
                alt="Toby's Signature Logo"
                width={55}
                height={55}
                className="cursor-pointer rounded-full"
                priority
              />
            </Link>

            {/* Links (Desktop Only) */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/products"
                className="hover:text-yellow-400 transition"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="hover:text-gray-200 transition-colors"
              >
                About
              </Link>
              <Link
                href="/support"
                className="hover:text-gray-200 transition-colors"
              >
                Support
              </Link>
              <Link
                href="/login"
                className="hover:text-gray-200 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right Section: Icons */}
          <div className="flex items-center space-x-6">
            {/* Account Icon */}
            <Link href="/account" className="hidden md:block relative">
              <User size={26} className="cursor-pointer" />
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative hidden md:block">
              <ShoppingCart size={28} className="cursor-pointer" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#191a1e] text-white px-6 pb-4 space-y-3">
            {["Products", "About", "Support", "Login"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block hover:text-gray-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* 🔻 Floating Cart Button (Mobile Only) */}
      <div className="fixed bottom-5 right-5 md:hidden z-50">
        <Link
          href="/cart"
          className="relative bg-black p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <ShoppingCart size={28} className="text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </>
  );
}
