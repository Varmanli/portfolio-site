import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import { createPortfolio, isSlugTaken, listPortfolios } from "@/lib/portfolios";
import { sanitizeHtml } from "@/lib/sanitize-html";

export async function GET() {
  const items = await listPortfolios();
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

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json(
      { message: "عنوان الزامی است" },
      { status: 400 }
    );
  }

  if (typeof slug !== "string" || !slug.trim()) {
    return NextResponse.json({ message: "slug الزامی است" }, { status: 400 });
  }

  if (typeof thumbnail !== "string" || !thumbnail.trim()) {
    return NextResponse.json(
      { message: "تصویر اصلی الزامی است" },
      { status: 400 }
    );
  }

  if (await isSlugTaken(slug)) {
    return NextResponse.json(
      { message: "این slug قبلاً استفاده شده است" },
      { status: 400 }
    );
  }

  try {
    const portfolio = await createPortfolio({
      title: title.trim(),
      slug: slug.trim(),
      thumbnail: thumbnail.trim(),
      shortDesc: typeof shortDesc === "string" ? shortDesc : "",
      content: typeof content === "string" ? sanitizeHtml(content) : "",
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    console.error("Failed to create portfolio:", error);
    return NextResponse.json(
      { message: "ثبت نمونه‌کار با خطا مواجه شد" },
      { status: 500 }
    );
  }
}
