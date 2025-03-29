import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GalleryItem } from "@/types/project";

interface SortableImageProps {
  item: GalleryItem;
  index: number;
  onRemove: (idx: number) => void;
  onClick: () => void;
}

export function SortableImage({
  item,
  index,
  onRemove,
  onClick,
}: SortableImageProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("SortableImage: Removing image at index:", index);
    onRemove(index);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group rounded-md overflow-hidden border border-gray-200 shadow-sm"
    >
      <div
        {...attributes}
        {...listeners}
        className="relative h-28 w-full cursor-pointer"
        onClick={onClick}
      >
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
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition hover:bg-red-600 z-10 shadow-md"
        title="حذف تصویر"
      >
        ✕
      </button>
    </div>
  );
}
