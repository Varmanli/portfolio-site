import LoadingSkeleton from "@/components/shared/LoadingSkeleton";

export default function MessagesLoading() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <LoadingSkeleton count={5} className="h-40" />
    </div>
  );
} 