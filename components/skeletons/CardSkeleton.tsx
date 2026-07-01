import Skeleton, { SkeletonText } from "./Skeleton";

interface CardSkeletonProps {
  variant?: "portfolio" | "project" | "service";
  className?: string;
}

export default function CardSkeleton({
  variant = "project",
  className = "",
}: CardSkeletonProps) {
  if (variant === "portfolio") {
    return (
      <div
        className={`border-5 border-gray-200 bg-white p-5 ${className}`}
      >
        <Skeleton rounded="none" className="h-64 w-full" />
        <div className="flex justify-between items-start p-4 gap-4">
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <SkeletonText lines={2} lineClassName="h-3" />
          </div>
          <Skeleton rounded="full" className="h-8 w-8 shrink-0" />
        </div>
      </div>
    );
  }

  if (variant === "service") {
    return (
      <div
        className={`flex items-center justify-between gap-4 p-5 border-4 border-gray-200 bg-white ${className}`}
      >
        <Skeleton className="h-7 w-2/3" />
        <Skeleton rounded="full" className="h-9 w-9 shrink-0" />
      </div>
    );
  }

  return (
    <div
      className={`bg-white flex flex-col rounded-lg shadow-sm border p-4 ${className}`}
    >
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-6 w-2/3 mb-2" />
      <SkeletonText lines={2} className="mb-4" />
      <div className="flex justify-end gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}
