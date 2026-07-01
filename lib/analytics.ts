import crypto from "crypto";
import { and, count, gte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { pageViews } from "@/lib/db/schema";

const MAX_PATH_LENGTH = 512;

export function isTrackablePath(path: unknown): path is string {
  if (typeof path !== "string") return false;
  const trimmed = path.trim();
  if (!trimmed || trimmed.length > MAX_PATH_LENGTH) return false;
  return trimmed.startsWith("/");
}

function getAnalyticsSecret(): string {
  const secret = process.env.AUTH_SECRET;

  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "AUTH_SECRET is not set. Set it in the production environment before recording analytics (IP hashing depends on it).",
    );
  }

  return "portfolio-analytics-dev";
}

export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const secret = getAnalyticsSecret();
  return crypto.createHash("sha256").update(`${secret}:${ip}`).digest("hex");
}

export function getClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }
  return headers.get("x-real-ip");
}

export async function recordPageView(input: {
  path: string;
  userAgent: string | null;
  referer: string | null;
  ip: string | null;
}): Promise<void> {
  await db.insert(pageViews).values({
    path: input.path.trim().slice(0, MAX_PATH_LENGTH),
    userAgent: input.userAgent?.slice(0, 512) ?? null,
    referer: input.referer?.slice(0, 512) ?? null,
    ipHash: hashIp(input.ip),
  });
}

export interface AnalyticsSummary {
  totalViews: number;
  todayViews: number;
  last7DaysViews: number;
  uniqueVisitorsEstimate: number;
  topPages: { path: string; views: number }[];
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [
    [totalRow],
    [todayRow],
    [last7DaysRow],
    [uniqueRow],
    topPagesRows,
  ] = await Promise.all([
    db.select({ count: count() }).from(pageViews),
    db
      .select({ count: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startOfToday)),
    db
      .select({ count: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, sevenDaysAgo)),
    db
      .select({ count: sql<number>`count(distinct ${pageViews.ipHash})` })
      .from(pageViews)
      .where(and(gte(pageViews.createdAt, sevenDaysAgo))),
    db
      .select({ path: pageViews.path, views: count() })
      .from(pageViews)
      .groupBy(pageViews.path)
      .orderBy(sql`count(*) desc`)
      .limit(5),
  ]);

  return {
    totalViews: totalRow?.count ?? 0,
    todayViews: todayRow?.count ?? 0,
    last7DaysViews: last7DaysRow?.count ?? 0,
    uniqueVisitorsEstimate: Number(uniqueRow?.count ?? 0),
    topPages: topPagesRows.map((row) => ({
      path: row.path,
      views: row.views,
    })),
  };
}
