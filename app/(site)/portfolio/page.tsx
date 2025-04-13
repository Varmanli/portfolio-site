import { Header } from "@/components/shared/Header";
import CallToAction from "@/components/sections/CallToAction";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import { PortfolioItem } from "@/types/pageContent";

export default async function PortfolioPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/portfolios`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!response.ok) {
    // اختیاری: لاگ خطا یا ریدایرکت یا نمایش fallback
    console.error("Failed to fetch portfolios:", response.status);
    throw new Error("Failed to load portfolios"); // یا return fallback
  }

  const data: PortfolioItem[] = await response.json();

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
        <PortfolioGrid items={portfolios} />
        <CallToAction />
      </section>
    </>
  );
};
