import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import { portfolioExists, replaceGalleryImages } from "@/lib/portfolios";

type Params = { params: Promise<{ identifier: string }> };

async function handleReplace(request: NextRequest, { params }: Params) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json(
      { message: "احراز هویت لازم است" },
      { status: 401 }
    );
  }

  const { identifier: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || String(id) !== rawId) {
    return NextResponse.json(
      { message: "شناسه نامعتبر است" },
      { status: 400 }
    );
  }

  if (!(await portfolioExists(id))) {
    return NextResponse.json(
      { message: "نمونه‌کار یافت نشد" },
      { status: 404 }
    );
  }

  let body: { images?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "بدنه درخواست نامعتبر است" },
      { status: 400 }
    );
  }

  const { images } = body;
  if (
    !Array.isArray(images) ||
    !images.every((url) => typeof url === "string" && url.trim())
  ) {
    return NextResponse.json(
      { message: "images باید آرایه‌ای از آدرس‌های معتبر باشد" },
      { status: 400 }
    );
  }

  try {
    const gallery = await replaceGalleryImages(id, images);
    return NextResponse.json({ success: true, gallery });
  } catch (error) {
    console.error("Failed to update gallery:", error);
    return NextResponse.json(
      { message: "بروزرسانی گالری با خطا مواجه شد" },
      { status: 500 }
    );
  }
}

export const POST = handleReplace;
export const PATCH = handleReplace;
