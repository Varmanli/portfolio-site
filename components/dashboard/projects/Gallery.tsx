import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { GalleryItem } from "@/types/project";
import { SortableImage } from "./SortableImage";

interface GalleryProps {
  items: GalleryItem[];
  onRemove: (index: number) => void;
  onReorder: (items: GalleryItem[]) => void;
  onImageClick: (index: number) => void;
}

export function Gallery({
  items,
  onRemove,
  onReorder,
  onImageClick,
}: GalleryProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleRemove = (index: number) => {
    console.log("Gallery: Removing image at index:", index);
    onRemove(index);
  };

  if (items.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-xs text-gray-500 mb-2">پیش‌نمایش گالری:</p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {items.map((item, index) => (
              <SortableImage
                key={item.id}
                item={item}
                index={index}
                onRemove={handleRemove}
                onClick={() => {
                  console.log("Gallery: Image clicked at index:", index);
                  onImageClick(index);
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
