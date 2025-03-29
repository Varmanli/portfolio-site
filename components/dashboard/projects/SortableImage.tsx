import Image from "next/image";
import { GalleryItem } from "@/types/project";

interface GalleryImageProps {
  item: GalleryItem;
  index: number;
  onRemove: (idx: number) => void;
  onClick: () => void;
}

export function GalleryImage({
  item,
  index,
  onRemove,
  onClick,
}: GalleryImageProps) {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("GalleryImage: Removing image at index:", index);
    onRemove(index);
  };

  return (
    <div className="relative group rounded-md overflow-hidden border border-gray-200 shadow-sm">
      <div className="relative h-28 w-full cursor-pointer" onClick={onClick}>
        <Image
          src={item.src}
          alt={`gallery-${index}`}
          fill
          className="object-cover"
        />
      </div>
      <button
        onClick={handleRemove}
        type="button"
        className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition hover:bg-red-600 z-10"
        title="حذف تصویر"
      >
        ✕
      </button>
    </div>
  );
}
