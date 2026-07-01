import Skeleton from "./Skeleton";

type FieldType = "input" | "textarea" | "image";

interface FormSkeletonField {
  type?: FieldType;
  height?: string;
}

interface FormSkeletonProps {
  fields?: FormSkeletonField[];
  columns?: 1 | 2 | 3;
  withButton?: boolean;
  className?: string;
}

const defaultFields: FormSkeletonField[] = [
  { type: "input" },
  { type: "textarea" },
];

export default function FormSkeleton({
  fields = defaultFields,
  columns = 1,
  withButton = true,
  className = "",
}: FormSkeletonProps) {
  const gridClass =
    columns === 2
      ? "grid gap-5 md:grid-cols-2"
      : columns === 3
        ? "grid gap-5 md:grid-cols-3"
        : "space-y-6";

  return (
    <div className={`space-y-6 ${className}`}>
      <div className={gridClass}>
        {fields.map((field, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 space-y-3"
          >
            <Skeleton className="h-4 w-24" />
            {field.type === "image" ? (
              <Skeleton
                rounded="2xl"
                className={field.height ?? "aspect-square w-full"}
              />
            ) : (
              <Skeleton
                rounded="xl"
                className={
                  field.height ?? (field.type === "textarea" ? "h-28" : "h-11")
                }
              />
            )}
          </div>
        ))}
      </div>

      {withButton && (
        <div className="flex items-center justify-end border-t border-gray-100 pt-2">
          <Skeleton rounded="2xl" className="h-11 w-36" />
        </div>
      )}
    </div>
  );
}
