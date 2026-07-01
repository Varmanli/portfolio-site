import Skeleton from "@/components/skeletons/Skeleton";

export default function OverviewSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="mt-3 h-4 w-72" />
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} rounded="3xl" className="h-36" />
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} rounded="3xl" className="h-32" />
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} rounded="3xl" className="h-28" />
          ))}
        </div>
      </div>
    </div>
  );
}
