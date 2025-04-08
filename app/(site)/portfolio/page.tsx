import { Header } from "@/components/shared/Header";
import CallToAction from "@/components/sections/CallToAction";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import { PortfolioItem } from "@/types/pageContent";

const PortfolioPage = async () => {
  // فچ کردن داده‌ها در سرور کامپوننت
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/portfolios`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  const data: PortfolioItem[] = await response.json();

  // فرمت‌دهی داده‌ها به شکلی که نیاز دارید
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

export default PortfolioPage;
