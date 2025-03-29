"use client";

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export default function LoadingSkeleton({
  count = 1,
  className = "",
}: LoadingSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`
            animate-pulse bg-gray-200 
            rounded-lg overflow-hidden
            ${className}
          `}
        >
          <div className="h-24" />
        </div>
      ))}
    </div>
  );
}
