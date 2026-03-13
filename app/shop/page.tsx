"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/lib/auth";

export default function ShopPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isTokenValid()) {
      router.push("/");
    }
  }, []);

  return <div>Shop Page</div>;
}