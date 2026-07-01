import { Header } from "@/components/shared/Header";
import Skeleton from "@/components/skeletons/Skeleton";

export default function Loading() {
  return (
    <>
      <Header />
      <section className="relative flex w-full max-w-[1440px] flex-col justify-center items-center gap-10 border-t-5 pt-0 lg:flex-row lg:items-start lg:gap-30 lg:pt-20 mx-auto px-4">
        <Skeleton
          rounded="none"
          className="w-[350px] h-[360px] border-6 border-gray-200 mt-5 lg:mt-15"
        />
        <div className="flex flex-col items-center gap-5 w-full max-w-[590px] lg:items-end">
          <Skeleton className="h-[60px] w-2/3" />
          <Skeleton className="h-[240px] w-full" rounded="xl" />
          <Skeleton className="h-12 w-48 mb-10 lg:mb-0" rounded="full" />
        </div>
      </section>
    </>
  );
}
