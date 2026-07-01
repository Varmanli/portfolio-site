import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import { createMessage, listMessages } from "@/lib/messages";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json(
      { message: "احراز هویت لازم است" },
      { status: 401 }
    );
  }

  const items = await listMessages();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "بدنه درخواست نامعتبر است" },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) {
    return NextResponse.json(
      { message: "نام الزامی است" },
      { status: 400 }
    );
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { message: "ایمیل معتبر الزامی است" },
      { status: 400 }
    );
  }

  if (!message) {
    return NextResponse.json(
      { message: "پیام الزامی است" },
      { status: 400 }
    );
  }

  try {
    const created = await createMessage({ name, email, message });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Failed to create message:", error);
    return NextResponse.json(
      { message: "ارسال پیام با خطا مواجه شد" },
      { status: 500 }
    );
  }
}
