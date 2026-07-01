import Skeleton from "./Skeleton";

interface TableSkeletonProps {
  rows?: number;
  variant?: "message" | "row";
  className?: string;
}

export default function TableSkeleton({
  rows = 4,
  variant = "row",
  className = "",
}: TableSkeletonProps) {
  if (variant === "message") {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton rounded="full" className="h-5 w-5 shrink-0" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton rounded="full" className="h-5 w-5 shrink-0" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton rounded="full" className="h-6 w-20 shrink-0" />
            </div>
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white shadow rounded-md p-4 border"
        >
          <Skeleton className="h-5 w-40" />
          <div className="flex gap-3">
            <Skeleton rounded="full" className="h-6 w-6" />
            <Skeleton rounded="full" className="h-6 w-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
