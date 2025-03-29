import LoadingSkeleton from "@/components/shared/LoadingSkeleton";

export default function DashboardLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* آمار */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>

      {/* آخرین پیام‌ها */}
      <LoadingSkeleton count={3} className="h-32" />
    </div>
  );
}
