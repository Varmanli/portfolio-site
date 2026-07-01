import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { content } from "@/lib/db/schema";

export interface ContentItem {
  key: string;
  value: string;
}

/**
 * Server-only data access shared by GET /api/content and any server
 * component that needs content rows without a self-referential HTTP fetch
 * (relative fetch URLs don't resolve in server components/RSC render).
 */
export async function getAllContent(): Promise<ContentItem[]> {
  return db
    .select({ key: content.key, value: content.value })
    .from(content)
    .orderBy(asc(content.key));
}
