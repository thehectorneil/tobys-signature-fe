import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/shop",
  "/cart",
  "/checkout",
  "/account",
];

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {

    const loginUrl = new URL("/", request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/shop/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/account/:path*",
  ],
};