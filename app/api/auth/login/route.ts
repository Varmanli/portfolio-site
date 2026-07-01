import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  signSessionToken,
} from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  let body: { email?: unknown; password?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "بدنه درخواست نامعتبر است" },
      { status: 400 }
    );
  }

  const { email, password } = body;

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password.trim()
  ) {
    return NextResponse.json(
      { message: "ایمیل و رمز عبور الزامی هستند" },
      { status: 400 }
    );
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.trim().toLowerCase()))
    .limit(1);

  const invalidCredentialsResponse = () =>
    NextResponse.json(
      { message: "ایمیل یا رمز عبور اشتباه است" },
      { status: 401 }
    );

  if (!user) {
    return invalidCredentialsResponse();
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return invalidCredentialsResponse();
  }

  if (user.role !== "admin") {
    return invalidCredentialsResponse();
  }

  const token = await signSessionToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  const response = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  });

  return response;
}
