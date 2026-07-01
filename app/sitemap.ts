import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { listPortfolios } from "@/lib/portfolios";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/hire-me`, changeFrequency: "yearly", priority: 0.5 },
  ];

  // Building the sitemap during `next build` can happen without
  // DATABASE_URL configured (e.g. static analysis environments), so
  // fall back to the static routes instead of failing the build.
  if (!process.env.DATABASE_URL) {
    return staticRoutes;
  }

  try {
    const portfolios = await listPortfolios();

    // Linked by numeric id, matching how the rest of the app links to
    // portfolios (see PortfolioCard) — non-ASCII slug segments don't
    // round-trip through this route's param decoding.
    const portfolioRoutes: MetadataRoute.Sitemap = portfolios.map(
      (portfolio) => ({
        url: `${SITE_URL}/portfolio/${portfolio.id}`,
        lastModified: portfolio.createdAt,
        changeFrequency: "monthly",
        priority: 0.6,
      }),
    );

    return [...staticRoutes, ...portfolioRoutes];
  } catch (error) {
    console.error("Failed to build sitemap portfolio entries:", error);
    return staticRoutes;
  }
}
