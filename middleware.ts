import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Ignore API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // Redirect unauthenticated users trying to access protected pages
  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/youth"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logged in users away from login/register pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
