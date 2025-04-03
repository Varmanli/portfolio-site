// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  const pathname = req.nextUrl.pathname;

  // ❌ از محافظت خارج کردن مسیر لاگین
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
