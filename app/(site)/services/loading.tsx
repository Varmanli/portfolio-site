import { Header } from "@/components/shared/Header";
import Skeleton from "@/components/skeletons/Skeleton";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

export default function ServicesLoading() {
  return (
    <>
      <Header />
      <section className="px-6 pb-10 max-w-[1440px] mx-auto relative z-10">
        <div className="flex justify-center items-center mt-3 lg:mt-0 mb-6">
          <Skeleton className="h-8 lg:h-12 w-2/3 max-w-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-15 lg:mx-20">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} variant="service" />
          ))}
        </div>
      </section>
    </>
  );
}
