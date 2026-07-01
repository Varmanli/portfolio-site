import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import { createService, listServices } from "@/lib/services";

export async function GET() {
  const items = await listServices();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json(
      { message: "احراز هویت لازم است" },
      { status: 401 }
    );
  }

  let body: { title?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "بدنه درخواست نامعتبر است" },
      { status: 400 }
    );
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) {
    return NextResponse.json(
      { message: "عنوان نمی‌تواند خالی باشد" },
      { status: 400 }
    );
  }

  try {
    const service = await createService(title);
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Failed to create service:", error);
    return NextResponse.json(
      { message: "ثبت خدمت با خطا مواجه شد" },
      { status: 500 }
    );
  }
}
