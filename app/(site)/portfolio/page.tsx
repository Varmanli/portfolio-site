import { Header } from "@/components/shared/Header";
import StarIcon from "@/components/ui/StarIcon";
import { PORTFOLIO_ITEMS } from "@/constants/portfolio";
import CallToAction from "@/components/sections/CallToAction";
import PortfolioGrid from "@/components/sections/PortfolioGrid";

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <section className="px-4 py-10 max-w-[1440px] mx-auto relative z-10">
        <PortfolioGrid items={PORTFOLIO_ITEMS} />
        <CallToAction />
      </section>
      {/* آیکون دکوری ستاره */}
      <StarIcon
        className="absolute bottom-[-40px] right-[10px] lg:bottom-[-60px] lg:right-[90px] z-0"
        size={100}
        color="#F3ABCB"
      />
    </>
  );
}
