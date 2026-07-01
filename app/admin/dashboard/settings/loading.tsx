import Skeleton from "@/components/skeletons/Skeleton";

export default function SettingsLoading() {
  return (
    <div className="space-y-6 p-4">
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center gap-4 border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5">
          <Skeleton className="h-11 w-11" rounded="2xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" rounded="full" />
            <Skeleton className="h-4 w-64" rounded="full" />
          </div>
        </div>
      </section>

      <Skeleton className="h-24" rounded="3xl" />

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5">
          <Skeleton className="h-6 w-44" rounded="full" />
          <Skeleton className="mt-3 h-4 w-72" rounded="full" />
        </div>
        <div className="space-y-6 p-6">
          <Skeleton className="h-24" rounded="2xl" />
          <div className="grid gap-5 md:grid-cols-2">
            <Skeleton className="h-24" rounded="2xl" />
            <Skeleton className="h-24" rounded="2xl" />
          </div>
          <Skeleton className="ms-auto h-11 w-36" rounded="2xl" />
        </div>
      </div>
    </div>
  );
}
