import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import { deleteMessage } from "@/lib/messages";

type Params = { params: Promise<{ id: string }> };

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
  const id = Number(rawId);
  if (!Number.isInteger(id) || String(id) !== rawId) {
    return NextResponse.json(
      { message: "شناسه نامعتبر است" },
      { status: 400 }
    );
  }

  const deleted = await deleteMessage(id);
  if (!deleted) {
    return NextResponse.json({ message: "پیام یافت نشد" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
