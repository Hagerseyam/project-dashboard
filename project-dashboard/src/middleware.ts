// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pages you want to protect
const protectedRoutes = ["/", "/projects", "/analytics", "/users"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // If the request is for a protected route and no token exists → redirect
  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware to all routes under / (you can adjust if needed)
export const config = {
  matcher: ["/", "/projects/:path*", "/analytics/:path*", "/users/:path*"],
};
