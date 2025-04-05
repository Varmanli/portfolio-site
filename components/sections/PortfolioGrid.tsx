import PortfolioCard from "@/components/ui/PortfolioCard";
import { PortfolioItem } from "@/types/pageContent";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="columns-1 sm:columns-2  gap-25 lg:mx-25">
      {items.map((item) => (
        <div key={item.id} className="break-inside-avoid mb-20">
          <PortfolioCard item={item} />
        </div>
      ))}
    </div>
  );
}
