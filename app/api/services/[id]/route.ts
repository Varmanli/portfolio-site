import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import { deleteService, updateService } from "@/lib/services";

type Params = { params: Promise<{ id: string }> };

function parseServiceId(raw: string): number | null {
  const id = Number(raw);
  if (!Number.isInteger(id) || String(id) !== raw) return null;
  return id;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json(
      { message: "احراز هویت لازم است" },
      { status: 401 }
    );
  }

  const { id: rawId } = await params;
  const id = parseServiceId(rawId);
  if (id === null) {
    return NextResponse.json(
      { message: "شناسه نامعتبر است" },
      { status: 400 }
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
    const service = await updateService(id, title);
    if (!service) {
      return NextResponse.json(
        { message: "خدمت یافت نشد" },
        { status: 404 }
      );
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error("Failed to update service:", error);
    return NextResponse.json(
      { message: "بروزرسانی خدمت با خطا مواجه شد" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json(
      { message: "احراز هویت لازم است" },
      { status: 401 }
    );
  }

  const { id: rawId } = await params;
  const id = parseServiceId(rawId);
  if (id === null) {
    return NextResponse.json(
      { message: "شناسه نامعتبر است" },
      { status: 400 }
    );
  }

  const deleted = await deleteService(id);
  if (!deleted) {
    return NextResponse.json({ message: "خدمت یافت نشد" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
