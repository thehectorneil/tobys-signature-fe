"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/toby.jpg";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

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
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      login(token);

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
      <nav className="fixed top-0 left-0 w-full bg-[#191a1e] text-white shadow-md z-50">
        <div className="max-w-[1000px] mx-auto px-4 py-3 flex items-center justify-between">

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

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/support">Support</Link>
          </div>

          <div className="flex items-center space-x-6">

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

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

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

            <button
              onClick={() => setLoginOpen(false)}
              className="text-sm text-gray-500 mt-4 w-full"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </>
  );
}