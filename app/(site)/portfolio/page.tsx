import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import CallToAction from "@/components/sections/CallToAction";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import { listPortfolios } from "@/lib/portfolios";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "نمونه‌کارها | ملیکا شمیرانی",
  description: "مجموعه نمونه‌کارهای طراحی گرافیک ملیکا شمیرانی.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const data = await listPortfolios();

  const portfolios = data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    thumbnail: item.thumbnail,
    shortDesc: item.shortDesc,
    gallery: item.gallery.map((image) => ({
      id: image.id,
      imageUrl: image.imageUrl,
    })),
  }));

  return (
    <>
      <Header />
      <section className="px-4 py-10 max-w-[1440px] mx-auto relative z-10">
        <h1 className="sr-only">نمونه‌کارها</h1>
        <PortfolioGrid items={portfolios} />
        <CallToAction />
      </section>
    </>
  );
}
