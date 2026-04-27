"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginStaff } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     AUTO REDIRECT IF LOGGED IN
  ========================= */
  useEffect(() => {
    if (user && ["admin", "staff"].includes(user.role?.toLowerCase())) {
      router.replace("/admin");
    }
  }, [user, router]);

  /* =========================
     LOGIN HANDLER
  ========================= */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginStaff(email, password);

      // ✅ store token + user
      login(data);

      // ✅ NO NEED to decode JWT here anymore
      // AuthContext should handle user extraction

      router.push("/admin");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-[#0f172a] p-8 rounded-2xl border border-gray-800 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Admin Login
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/30 p-2 rounded">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full mb-4 p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full mb-6 p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}