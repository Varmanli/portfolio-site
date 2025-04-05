import PortfolioCard from "@/components/ui/PortfolioCard";
import { PortfolioItem } from "@/types/pageContent";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="columns-1 sm:columns-2  gap-20">
      {items.map((item) => (
        <div key={item.id} className="break-inside-avoid mb-20 lg:mx-20">
          <PortfolioCard item={item} />
        </div>
      ))}
    </div>
  );
}
