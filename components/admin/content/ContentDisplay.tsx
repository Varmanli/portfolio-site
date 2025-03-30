import { MdEdit, MdImage } from "react-icons/md";
import { ContentSection } from "@/types/admin";
import Image from "next/image";

interface ContentDisplayProps {
  section: ContentSection;
  onEdit: () => void;
}

/**
 * ContentDisplay Component
 *
 * A component for displaying content sections with edit functionality.
 *
 * @param {ContentDisplayProps} props - Component props
 * @returns {JSX.Element} The content display component
 */
export default function ContentDisplay({
  section,
  onEdit,
}: ContentDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-700">{section.title}</h2>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700"
        >
          <MdEdit size={20} />
          ویرایش
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        {section.isImage ? (
          section.content ? (
            <div className="relative w-full h-48 rounded-lg overflow-hidden border">
              <Image
                src={section.content}
                alt={section.title}
                width={800} // یا مقدار مناسب بر اساس طراحی
                height={400} // یا مقدار مناسب بر اساس طراحی
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
              <MdImage className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-gray-500">تصویر آپلود نشده است</p>
            </div>
          )
        ) : (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        )}
      </div>
    </div>
  );
}
