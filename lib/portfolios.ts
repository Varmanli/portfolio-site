import { cache } from "react";
import { asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { portfolioGallery, portfolios } from "@/lib/db/schema";

export interface GalleryImageDto {
  id: number;
  imageUrl: string;
  portfolioId: number;
}

export interface PortfolioDto {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  shortDesc: string;
  content: string;
  createdAt: Date;
  gallery: GalleryImageDto[];
}

export interface PortfolioInput {
  title: string;
  slug: string;
  thumbnail: string;
  shortDesc: string;
  content: string;
}

async function attachGallery(
  rows: (typeof portfolios.$inferSelect)[]
): Promise<PortfolioDto[]> {
  if (rows.length === 0) return [];

  const galleryRows = await db
    .select()
    .from(portfolioGallery)
    .where(
      inArray(
        portfolioGallery.portfolioId,
        rows.map((row) => row.id)
      )
    )
    .orderBy(asc(portfolioGallery.sortOrder));

  const galleryByPortfolio = new Map<number, GalleryImageDto[]>();
  for (const image of galleryRows) {
    const list = galleryByPortfolio.get(image.portfolioId) ?? [];
    list.push({
      id: image.id,
      imageUrl: image.image,
      portfolioId: image.portfolioId,
    });
    galleryByPortfolio.set(image.portfolioId, list);
  }

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    thumbnail: row.thumbnail,
    shortDesc: row.shortDesc,
    content: row.content,
    createdAt: row.createdAt,
    gallery: galleryByPortfolio.get(row.id) ?? [],
  }));
}

export async function listPortfolios(): Promise<PortfolioDto[]> {
  const rows = await db
    .select()
    .from(portfolios)
    .orderBy(desc(portfolios.createdAt));

  return attachGallery(rows);
}

export async function getPortfolioBySlug(
  slug: string
): Promise<PortfolioDto | null> {
  const [row] = await db
    .select()
    .from(portfolios)
    .where(eq(portfolios.slug, slug))
    .limit(1);

  if (!row) return null;
  const [dto] = await attachGallery([row]);
  return dto;
}

export async function getPortfolioById(
  id: number
): Promise<PortfolioDto | null> {
  const [row] = await db
    .select()
    .from(portfolios)
    .where(eq(portfolios.id, id))
    .limit(1);

  if (!row) return null;
  const [dto] = await attachGallery([row]);
  return dto;
}

/**
 * Looks a portfolio up by numeric id or by slug, matching the legacy
 * behavior where the public detail page used slugs and the admin edit
 * page used ids against the same underlying endpoint shape.
 */
export const getPortfolioByIdentifier = cache(async function getPortfolioByIdentifier(
  identifier: string
): Promise<PortfolioDto | null> {
  const numericId = Number(identifier);
  if (Number.isInteger(numericId) && String(numericId) === identifier) {
    return getPortfolioById(numericId);
  }
  return getPortfolioBySlug(identifier);
});

export async function isSlugTaken(
  slug: string,
  excludeId?: number
): Promise<boolean> {
  const [row] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(eq(portfolios.slug, slug))
    .limit(1);

  if (!row) return false;
  return row.id !== excludeId;
}

export async function createPortfolio(
  input: PortfolioInput
): Promise<PortfolioDto> {
  const [row] = await db.insert(portfolios).values(input).returning();
  const [dto] = await attachGallery([row]);
  return dto;
}

export async function updatePortfolio(
  id: number,
  input: Partial<PortfolioInput>
): Promise<PortfolioDto | null> {
  const [row] = await db
    .update(portfolios)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(portfolios.id, id))
    .returning();

  if (!row) return null;
  const [dto] = await attachGallery([row]);
  return dto;
}

export async function deletePortfolio(id: number): Promise<boolean> {
  const [row] = await db
    .delete(portfolios)
    .where(eq(portfolios.id, id))
    .returning({ id: portfolios.id });

  return Boolean(row);
}

/**
 * Replaces the full set of gallery images for a portfolio with the
 * given URLs, matching the legacy /gallery endpoints' "set gallery to
 * this list" behavior (used both on initial creation and full edits).
 */
export async function replaceGalleryImages(
  portfolioId: number,
  imageUrls: string[]
): Promise<GalleryImageDto[]> {
  await db
    .delete(portfolioGallery)
    .where(eq(portfolioGallery.portfolioId, portfolioId));

  if (imageUrls.length === 0) return [];

  const rows = await db
    .insert(portfolioGallery)
    .values(
      imageUrls.map((image, index) => ({
        portfolioId,
        image,
        sortOrder: index,
      }))
    )
    .returning();

  return rows.map((row) => ({
    id: row.id,
    imageUrl: row.image,
    portfolioId: row.portfolioId,
  }));
}

export async function portfolioExists(id: number): Promise<boolean> {
  const [row] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(eq(portfolios.id, id))
    .limit(1);

  return Boolean(row);
}
