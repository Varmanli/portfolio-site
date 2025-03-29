import LoadingSkeleton from "@/components/shared/LoadingSkeleton";

export default function SettingsLoading() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <div className="space-y-6">
        <LoadingSkeleton count={1} className="h-64" />
        <LoadingSkeleton count={1} className="h-48" />
      </div>
    </div>
  );
} 