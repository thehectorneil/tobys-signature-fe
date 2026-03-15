"use client";

import { Birthstone } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/toby.jpg";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { loginRequest, setToken } from "@/lib/auth";

const birthstone = Birthstone({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login, logout } = useAuth();

  const router = useRouter();

  const cartCount = 3;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginRequest(email, password);

      setToken(data.token);

      login(data.token);

      setLoginOpen(false);

      router.push("/shop");

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    }
  }

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-[#191a1e] text-white shadow-md z-50">
        <div className="max-w-[1000px] mx-auto px-4 py-3 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3">
            <Image
              src={Logo}
              alt="Toby's Signature Logo"
              width={55}
              height={55}
              className="rounded-full"
              priority
            />

          <span
            className={`${birthstone.className} text-[var(--brand)] text-3xl drop-shadow-[0_0_6px_rgba(248,207,55,0.5)]`}
          >
            Toby's Signature
          </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">

            <Link href="/products" className="relative hover:text-yellow-400 after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[var(--brand)] after:transition-all hover:after:w-full">Products</Link>
            <Link href="/about" className="relative hover:text-yellow-400 after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[var(--brand)] after:transition-all hover:after:w-full">About</Link>
            <Link href="/support" className="relative hover:text-yellow-400 after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[var(--brand)] after:transition-all hover:after:w-full">Support</Link>

            {user ? (
              <>
                <Link href="/account">
                  <User size={26} />
                </Link>

                <Link href="/cart" className="relative">
                  <ShoppingCart size={28} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="text-sm hover:text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="hover:text-yellow-400"
              >
                Login
              </button>
            )}

          </div>
        </div>
      </nav>

      {/* FLOATING BURGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-10 right-5 bg-[#f8cf37] text-black p-3 rounded-full shadow-xl shadow-[0_0_12px_rgba(248,207,55,0.8)] border border-[rgba(248,207,55,0.6)] z-50 animate-[heartbeat_2.5s_ease-in-out_infinite] hover:scale-110 active:scale-95 transition-transform"
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* DRAWER */}
      <div className="fixed inset-0 z-40 md:hidden pointer-events-none">

        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute right-0 top-[72px] h-[calc(100%-72px)] w-56 bg-[#191a1e] text-white shadow-xl transform transition-transform duration-500 ease-out pointer-events-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >

          {/* MENU LIST */}
          <div className="absolute bottom-24 w-full flex flex-col p-6 space-y-6 text-base">

            <div className="border-t border-gray-700 mb-4"></div>

            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-400 hover:bg-[#232429] px-3 py-2 rounded transition"
            >
              Products
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-400 hover:bg-[#232429] px-3 py-2 rounded transition"
            >
              About
            </Link>

            <Link
              href="/support"
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-400 hover:bg-[#232429] px-3 py-2 rounded transition"
            >
              Support
            </Link>

            <div className="border-t border-gray-700 my-2"></div>

            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-yellow-400 hover:bg-[#232429] px-3 py-2 rounded transition"
                >
                  Account
                </Link>

                <Link
                  href="/favourite"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-yellow-400 hover:bg-[#232429] px-3 py-2 rounded transition"
                >
                  Favourite
                </Link>

                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                    setIsOpen(false);
                  }}
                  className="mt-2 w-full bg-[var(--brand)] text-black font-semibold px-4 py-2 rounded-lg hover:brightness-95 active:scale-[0.98] transition-all duration-150 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setLoginOpen(true);
                  setIsOpen(false);
                }}
                className="mt-2 w-full bg-[var(--brand)] text-black font-semibold px-4 py-2 rounded-lg hover:brightness-95 active:scale-[0.98] transition-all duration-150 shadow-md"
              >
                Login
              </button>
            )}

          </div>

        </div>

      </div>


    {/* LOGIN MODAL */}
    {loginOpen && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

        <div className="bg-white text-black p-8 rounded-lg w-[350px]">

          <h2 className="text-xl font-semibold mb-4 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin}>

            {error && (
              <p className="text-red-500 text-sm mb-2">
                {error}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 mb-4 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded"
            >
              Login
            </button>

          </form>

          {/* CANCEL BUTTON */}
          <button
            onClick={() => setLoginOpen(false)}
            className="text-sm text-gray-500 mt-4 w-full hover:text-gray-700"
          >
            Cancel
          </button>

        </div>

      </div>
    )}
        </>
      );
}