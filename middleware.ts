import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers"; // For getting cookies server-side

// Apply middleware to specific routes
export const config = {
  matcher: ["/admin/:path*", "/youth/:path*"],  // Apply only to routes that need authentication
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // 1️⃣ Get token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("JWT token from cookies:", token);  // Debugging

  if (!token) {
    console.log("No token found, redirecting to /login");
    url.pathname = "/login";  // If no token, redirect to login
    return NextResponse.redirect(url);
  }

  // Token exists, so we assume the user is logged in. If you need to add extra logic later, you can.
  console.log("Token found, user is authenticated!");

  // 2️⃣ Allow the request to proceed
  return NextResponse.next();
}
