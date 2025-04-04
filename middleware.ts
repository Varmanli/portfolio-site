// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";

// const protectedRoutes = ["/admin"];

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("admin_token")?.value;
//   const pathname = req.nextUrl.pathname;

//   // ❌ مسیرهایی که نباید بررسی بشن
//   const publicPaths = ["/admin/login"];
//   const isPublic = publicPaths.some((path) => pathname.startsWith(path));

//   if (isPublic) {
//     return NextResponse.next();
//   }

//   const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/admin/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };
