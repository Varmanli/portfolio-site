import Skeleton from "@/components/skeletons/Skeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Skeleton className="w-10 h-10" />
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border flex items-center gap-4"
          >
            <Skeleton className="h-12 w-12 shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-12" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <Skeleton className="h-6 w-32 mb-4" />
          <TableSkeleton variant="message" rows={3} />
        </div>
      </div>
    </div>
  );
}
