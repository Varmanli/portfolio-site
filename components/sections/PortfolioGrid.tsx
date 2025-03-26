import PortfolioCard from "@/components/ui/PortfolioCard";
import { PortfolioItem } from "@/types/pageContent";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:mx-50 gap-10 lg:gap-24">
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  );
}
