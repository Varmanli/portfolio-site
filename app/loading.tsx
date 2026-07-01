import Skeleton from "@/components/skeletons/Skeleton";

export default function RootLoading() {
  return (
    <div className="flex flex-col items-center gap-6 max-w-[1440px] mx-auto px-4 py-16">
      <Skeleton className="h-10 w-56" />
      <Skeleton className="h-64 w-full max-w-3xl" rounded="xl" />
      <Skeleton className="h-40 w-full max-w-3xl" rounded="xl" />
    </div>
  );
}
