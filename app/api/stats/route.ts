import { NextRequest, NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { db } from "@/lib/db";
import { messages, portfolios, services } from "@/lib/db/schema";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import { getAnalyticsSummary } from "@/lib/analytics";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json(
      { message: "احراز هویت لازم است" },
      { status: 401 }
    );
  }

  const [[serviceRow], [portfolioRow], [messageRow], analytics] =
    await Promise.all([
      db.select({ count: count() }).from(services),
      db.select({ count: count() }).from(portfolios),
      db.select({ count: count() }).from(messages),
      getAnalyticsSummary(),
    ]);

  return NextResponse.json({
    serviceCount: serviceRow.count,
    portfolioCount: portfolioRow.count,
    messageCount: messageRow.count,
    ...analytics,
  });
}
