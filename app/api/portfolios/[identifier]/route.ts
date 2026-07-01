import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import {
  deletePortfolio,
  getPortfolioByIdentifier,
  isSlugTaken,
  updatePortfolio,
} from "@/lib/portfolios";
import { sanitizeHtml } from "@/lib/sanitize-html";

type Params = { params: Promise<{ identifier: string }> };

function parsePortfolioId(identifier: string): number | null {
  const id = Number(identifier);
  if (!Number.isInteger(id) || String(id) !== identifier) return null;
  return id;
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { identifier } = await params;
  const portfolio = await getPortfolioByIdentifier(identifier);

  if (!portfolio) {
    return NextResponse.json(
      { message: "نمونه‌کار یافت نشد" },
      { status: 404 }
    );
  }

  return NextResponse.json(portfolio);
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

  const { identifier } = await params;
  const id = parsePortfolioId(identifier);
  if (id === null) {
    return NextResponse.json(
      { message: "شناسه نامعتبر است" },
      { status: 400 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "بدنه درخواست نامعتبر است" },
      { status: 400 }
    );
  }

  const { title, slug, thumbnail, shortDesc, content } = body;
  const update: Partial<{
    title: string;
    slug: string;
    thumbnail: string;
    shortDesc: string;
    content: string;
  }> = {};

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { message: "عنوان نامعتبر است" },
        { status: 400 }
      );
    }
    update.title = title.trim();
  }

  if (slug !== undefined) {
    if (typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json(
        { message: "slug نامعتبر است" },
        { status: 400 }
      );
    }
    if (await isSlugTaken(slug, id)) {
      return NextResponse.json(
        { message: "این slug قبلاً استفاده شده است" },
        { status: 400 }
      );
    }
    update.slug = slug.trim();
  }

  if (thumbnail !== undefined) {
    if (typeof thumbnail !== "string" || !thumbnail.trim()) {
      return NextResponse.json(
        { message: "تصویر اصلی نامعتبر است" },
        { status: 400 }
      );
    }
    update.thumbnail = thumbnail.trim();
  }

  if (shortDesc !== undefined) {
    if (typeof shortDesc !== "string") {
      return NextResponse.json(
        { message: "کپشن نامعتبر است" },
        { status: 400 }
      );
    }
    update.shortDesc = shortDesc;
  }

  if (content !== undefined) {
    if (typeof content !== "string") {
      return NextResponse.json(
        { message: "محتوا نامعتبر است" },
        { status: 400 }
      );
    }
    update.content = sanitizeHtml(content);
  }

  try {
    const portfolio = await updatePortfolio(id, update);
    if (!portfolio) {
      return NextResponse.json(
        { message: "نمونه‌کار یافت نشد" },
        { status: 404 }
      );
    }
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("Failed to update portfolio:", error);
    return NextResponse.json(
      { message: "بروزرسانی نمونه‌کار با خطا مواجه شد" },
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

  const { identifier } = await params;
  const id = parsePortfolioId(identifier);
  if (id === null) {
    return NextResponse.json(
      { message: "شناسه نامعتبر است" },
      { status: 400 }
    );
  }

  const deleted = await deletePortfolio(id);
  if (!deleted) {
    return NextResponse.json(
      { message: "نمونه‌کار یافت نشد" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
