import { Header } from "@/components/shared/Header";
import Skeleton, { SkeletonText } from "@/components/skeletons/Skeleton";

export default function PortfolioDetailLoading() {
  return (
    <>
      <Header />
      <section className="px-4 py-10 max-w-[1440px] mx-auto relative z-10">
        <div className="mx-auto mb-10 w-full sm:w-[700px]">
          <Skeleton className="h-[420px] w-full border-4 border-gray-200" />
        </div>

        <div className="flex flex-col gap-6 bg-white border-4 border-gray-200 rounded-md p-5 sm:p-10">
          <div className="flex items-center gap-3">
            <Skeleton rounded="full" className="h-9 w-9 shrink-0" />
            <Skeleton className="h-9 w-2/3" />
          </div>
          <div className="flex items-start gap-3">
            <Skeleton rounded="full" className="h-8 w-8 shrink-0 mt-1" />
            <SkeletonText lines={4} className="flex-1" lineClassName="h-4" />
          </div>
        </div>
      </section>
    </>
  );
}
