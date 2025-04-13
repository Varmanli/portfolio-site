import { Header } from "@/components/shared/Header";
import PortfolioContent from "@/components/ui/PortfolioContent";
import { notFound } from "next/navigation";

interface GalleryImage {
  id: number;
  imageUrl: string;
  portfolioId: number;
}

interface PortfolioData {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  createdAt: string;
  shortDesc: string;
  gallery: GalleryImage[];
}

interface PageProps {
  params: { slug: string };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/portfolios/${params.slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return notFound();

    const portfolio: PortfolioData = await res.json();

    return (
      <>
        <Header />
        <PortfolioContent portfolio={portfolio} />
      </>
    );
  } catch (error) {
    console.error("❌ Error loading portfolio:", error);
    return notFound();
  }
}
