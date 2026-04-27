import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* =========================
   ROUTES CONFIG
========================= */
const customerProtectedRoutes = [
  "/shop",
  "/cart",
  "/checkout",
  "/account",
];

/* =========================
   PROXY FUNCTION
========================= */
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  /* =========================
     CUSTOMER ROUTES (LOGIN REQUIRED)
  ========================= */
  const isCustomerProtected = customerProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isCustomerProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /* =========================
     ADMIN ROUTES (ONLY CHECK TOKEN)
  ========================= */
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  /* =========================
     CUSTOMER LOGIN BLOCK
  ========================= */
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/shop", request.url));
  }

  return NextResponse.next();
}

/* =========================
   MATCHER
========================= */
export const config = {
  matcher: [
    "/shop/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/account/:path*",
    "/admin/:path*",
    "/login",
  ],
};