import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { content } from "@/lib/db/schema";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import { getAllContent } from "@/lib/content";
import { sanitizeHtml } from "@/lib/sanitize-html";

export async function GET() {
  const rows = await getAllContent();
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json({ message: "احراز هویت لازم است" }, { status: 401 });
  }

  let body: { key?: unknown; value?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "بدنه درخواست نامعتبر است" },
      { status: 400 }
    );
  }

  const { key, value } = body;

  if (typeof key !== "string" || !key.trim() || typeof value !== "string") {
    return NextResponse.json(
      { message: "key و value الزامی هستند" },
      { status: 400 }
    );
  }

  const sanitizedValue = sanitizeHtml(value);

  const [row] = await db
    .insert(content)
    .values({ key, value: sanitizedValue })
    .onConflictDoUpdate({
      target: content.key,
      set: { value: sanitizedValue, updatedAt: sql`now()` },
    })
    .returning({ key: content.key, value: content.value });

  return NextResponse.json({ success: true, content: row });
}
