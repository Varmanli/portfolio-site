import PortfolioCard from "@/components/ui/PortfolioCard";
import { PortfolioItem } from "@/types/pageContent";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10 max-w-[1440px] mx-auto">
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </section>
  );
}
