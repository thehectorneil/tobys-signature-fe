"use client";

import Link from "next/link";
import { LayoutDashboard, Package, Users } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#191a1e] border-r border-gray-800 p-4">

      <h2 className="text-xl font-bold text-[var(--brand)] mb-6">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-3">

        <Link href="/admin" className="flex items-center gap-2 hover:text-yellow-400">
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link href="/admin/products" className="flex items-center gap-2 hover:text-yellow-400">
          <Package size={18} /> Products
        </Link>

        <Link href="/admin/users" className="flex items-center gap-2 hover:text-yellow-400">
          <Users size={18} /> Users
        </Link>

      </nav>
    </aside>
  );
}