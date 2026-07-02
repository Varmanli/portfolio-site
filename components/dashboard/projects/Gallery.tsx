import { MdPhotoLibrary } from "react-icons/md";

import { GalleryItem } from "@/types/project";
import { GalleryImage } from "./SortableImage";

interface GalleryProps {
  items: GalleryItem[];
  onRemove: (index: number) => void;
  onImageClick: (index: number) => void;
}

export function Gallery({ items, onRemove, onImageClick }: GalleryProps) {
  if (items.length === 0) {
    return (
      <div
        dir="rtl"
        className="rounded-2xl border-2 border-dashed border-black/30 bg-white px-4 py-6 text-center"
      >
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[3px_3px_0_#111]">
          <MdPhotoLibrary size={24} />
        </span>

        <p className="text-sm font-black text-black">
          هنوز تصویری برای گالری انتخاب نشده است
        </p>

        <p className="mt-1 text-xs font-bold text-black/45">
          بعد از انتخاب تصاویر، پیش‌نمایش آن‌ها اینجا نمایش داده می‌شود.
        </p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-[#FFE066] text-black shadow-[2px_2px_0_#111]">
            <MdPhotoLibrary size={20} />
          </span>

          <div>
            <p className="text-sm font-black text-black">پیش‌نمایش گالری</p>
            <p className="mt-0.5 text-xs font-bold text-black/45">
              برای مشاهده بزرگ‌تر روی تصویر کلیک کنید.
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full border-2 border-black bg-white px-3 py-1.5 text-xs font-black text-black shadow-[2px_2px_0_#111]">
          {items.length.toLocaleString("fa-IR")} تصویر
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item, index) => (
          <GalleryImage
            key={item.id}
            item={item}
            index={index}
            onRemove={onRemove}
            onClick={() => onImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
