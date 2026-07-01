import { Header } from "@/components/shared/Header";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

export default function PortfolioLoading() {
  return (
    <>
      <Header />
      <section className="px-4 py-10 max-w-[1440px] mx-auto relative z-10">
        <div className="columns-1 sm:columns-2 gap-25 lg:mx-25">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="break-inside-avoid mb-20">
              <CardSkeleton variant="portfolio" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
