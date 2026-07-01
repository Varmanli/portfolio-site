import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import PortfolioContent from "@/components/ui/PortfolioContent";
import { notFound } from "next/navigation";
import { getPortfolioByIdentifier } from "@/lib/portfolios";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await getPortfolioByIdentifier(slug);

  if (!portfolio) {
    return buildMetadata({
      title: "نمونه‌کار یافت نشد | ملیکا شمیرانی",
      description: "این نمونه‌کار پیدا نشد.",
      path: `/portfolio/${slug}`,
    });
  }

  return buildMetadata({
    title: `${portfolio.title} | ملیکا شمیرانی`,
    description:
      portfolio.shortDesc || "مشاهده جزئیات این نمونه‌کار طراحی گرافیک.",
    // Use the numeric id (not the slug) for the canonical URL: non-ASCII
    // slug segments don't round-trip through this route's decoding, so
    // linking by slug would produce a canonical URL that 404s. The rest
    // of the app already links to portfolios by id (see PortfolioCard).
    path: `/portfolio/${portfolio.id}`,
    image: portfolio.thumbnail,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  try {
    const portfolio = await getPortfolioByIdentifier(slug);

    if (!portfolio) return notFound();

    return (
      <>
        <Header />
        <PortfolioContent
          portfolio={{
            ...portfolio,
            createdAt: portfolio.createdAt.toISOString(),
          }}
        />
      </>
    );
  } catch (error) {
    console.error("❌ Error loading portfolio:", error);
    return notFound();
  }
}
