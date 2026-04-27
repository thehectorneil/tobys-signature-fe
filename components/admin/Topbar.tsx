"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();                // clear token + user
    router.replace("/admin-login");
  }

  return (
    <div className="h-14 flex items-center justify-between px-6 border-b border-gray-800 bg-[#111214]">
      
      <h1 className="text-lg font-semibold">
        Welcome, {user?.email}
      </h1>

      <button
        onClick={handleLogout}
        className="text-sm text-red-400 hover:text-red-300"
      >
        Logout
      </button>

    </div>
  );
}