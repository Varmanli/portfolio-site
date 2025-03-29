import Image from "next/image";
import { GalleryItem } from "@/types/project";

interface ImageUploaderProps {
  label: string;
  preview?: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPreviewClick?: () => void;
  multiple?: boolean;
}

export function ImageUploader({
  label,
  preview,
  onImageChange,
  onPreviewClick,
  multiple = false,
}: ImageUploaderProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <label className="inline-block cursor-pointer bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-sm font-medium px-4 py-2 rounded-md shadow-sm transition">
        {multiple ? "🖼 انتخاب تصاویر" : "📎 انتخاب تصویر"}
        <input
          type="file"
          onChange={onImageChange}
          className="hidden"
          multiple={multiple}
        />
      </label>

      {preview && (
        <div className="mt-3 cursor-pointer" onClick={onPreviewClick}>
          <p className="text-xs text-gray-500 mb-1">پیش‌نمایش تصویر:</p>
          <Image
            src={preview}
            alt="preview"
            width={500}
            height={200}
            className="w-full h-56 object-cover rounded-lg border border-gray-200 shadow-sm"
          />
        </div>
      )}
    </div>
  );
}
