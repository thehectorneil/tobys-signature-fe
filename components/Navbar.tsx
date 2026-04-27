"use client";

import { Birthstone } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/toby.jpg";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthResponse, loginCustomer } from "@/lib/auth";
import { usePathname } from "next/navigation";

const birthstone = Birthstone({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login, logout } = useAuth();
  
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);
  
  useEffect(() => {
    if (!user) {
      setCartOpen(false);
    }
  }, [!!user]); // 👈 use boolean instead of object

  const router = useRouter();

  const [cartCount, setCartCount] = useState<number>(3);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
  
    try {
      const data = await loginCustomer(email, password);
  
      login(data);
      console.log("USER AFTER LOGIN:", data);
  
      setCartOpen(false);
      setIsOpen(false);
      setLoginOpen(false);
  
      if (redirectAfterLogin) {
        router.push(redirectAfterLogin);
        setRedirectAfterLogin(null);
      } else {
        router.push("/shop");
      }
  
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
      <nav className="fixed top-0 left-0 w-full navbar-gold-galaxy text-white shadow-md z-50">
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
      
      {/* FLOATING CART BUTTON */}
      {pathname !== "/cart" && (
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className={`md:hidden fixed bottom-28 right-5 bg-[#f8cf37] text-black p-3 rounded-full shadow-xl border border-[rgba(248,207,55,0.6)] transition-all ${
            isOpen ? "z-30" : "z-50"
          }`}
        >
          <ShoppingCart size={24} />

          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      )}
      

      {/* FLOATING BURGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-10 right-5 bg-[#f8cf37] text-black p-3 rounded-full shadow-xl shadow-[0_0_12px_rgba(248,207,55,0.8)] border border-[rgba(248,207,55,0.6)] z-50 animate-[heartbeat_2.5s_ease-in-out_3] hover:scale-110 active:scale-95 transition-transform"
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

      {/* MOBILE CART PREVIEW */}
        {cartOpen && pathname !== "/cart" && (
          <div
            className={`md:hidden fixed bottom-40 right-5 w-72 bg-[#191a1e] text-white rounded-xl shadow-2xl border border-[rgba(248,207,55,0.25)] p-4 animate-fadeIn ${
              isOpen ? "z-30" : "z-50"}`}
          >
            <h3 className="text-[var(--brand)] font-semibold mb-3">
              Your Cart
            </h3>

            {cartCount === 0 ? (
              <p className="text-sm text-gray-400">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-3 text-sm">

                {/* SAMPLE ITEM */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span>Chocolate Cake</span>
                  <span className="text-[var(--brand)]">₱1500</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span>Strawberry Bliss</span>
                  <span className="text-[var(--brand)]">₱1250</span>
                </div>
                
                <button
                  onClick={() => {
                    setCartOpen(false);

                    if (!user) {
                      setRedirectAfterLogin("/cart"); // 👈 set redirect
                      setLoginOpen(true);
                    } else {
                      router.push("/cart");
                    }
                  }}
                  className="block w-full mt-3 text-center bg-[var(--brand)] text-black font-semibold py-2 rounded-lg hover:brightness-95 transition"
                >
                  View Cart
                </button>

                {!user && (
                  <p className="text-[10px] text-gray-400 text-center mt-2">
                    Please login to view your cart
                  </p>
                )}

              </div>
            )}

          </div>
        )}


      {/* LOGIN MODAL */}
      {loginOpen && (

      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#191a1e] text-white p-8 rounded-xl w-[360px] shadow-2xl border border-[rgba(248,207,55,0.25)]">

      {/* LOGO CENTER */}
      <div className="flex flex-col items-center mb-6">

        <Image
          src={Logo}
          alt="Toby's Signature Logo"
          width={70}
          height={70}
          className="rounded-full mb-3"
        />

        <h2 className={`${birthstone.className} text-[var(--brand)] text-3xl`}>
          Toby's Signature
        </h2>

      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-400 text-sm mb-3 text-center">
          {error}
        </p>
      )}
      
      {redirectAfterLogin === "/cart" && (
        <p className="text-xs text-gray-400 text-center mb-2">
          Login to continue to your cart
        </p>
      )}

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-[#232429] border border-gray-700 text-white p-2 mb-3 rounded-md focus:outline-none focus:border-[var(--brand)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-[#232429] border border-gray-700 text-white p-2 mb-4 rounded-md focus:outline-none focus:border-[var(--brand)]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-[var(--brand)] text-black font-semibold p-2 rounded-md hover:brightness-95 active:scale-[0.98] transition"
        >
          Login
        </button>

      </form>

      {/* CANCEL */}
      <button
        onClick={() => setLoginOpen(false)}
        className="text-sm text-gray-400 mt-4 w-full hover:text-[var(--brand)] transition"
      >
        Cancel
      </button>

      </div>

      </div>
      )}

        </>
      );
}