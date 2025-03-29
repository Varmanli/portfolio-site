import { GalleryItem } from "@/types/project";
import { GalleryImage } from "./SortableImage";

interface GalleryProps {
  items: GalleryItem[];
  onRemove: (index: number) => void;
  onImageClick: (index: number) => void;
}

export function Gallery({ items, onRemove, onImageClick }: GalleryProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-xs text-gray-500 mb-2">پیش‌نمایش گالری:</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <GalleryImage
            key={item.id}
            item={item}
            index={index}
            onRemove={onRemove}
            onClick={() => {
              console.log("Gallery: Image clicked at index:", index);
              onImageClick(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}
