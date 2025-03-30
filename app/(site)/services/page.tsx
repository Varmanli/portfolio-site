import { Header } from "@/components/shared/Header";
import StarIcon from "@/components/ui/StarIcon";

/**
 * Services Page Component
 * Displays a list of services offered with decorative elements
 *
 * @component
 * @returns {JSX.Element} Rendered services page
 */
export default function ServicesPage() {
  return (
    <>
      <Header />
      <section className="px-6 py-10 max-w-[1440px] mx-auto relative z-10">
        <p className="text-lg lg:text-4xl font-bold mb-8 text-center">
          آنچه می‌توانم برای شما انجام دهم
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-15 lg:mx-20">
          {/* داده‌ها به‌زودی از API دریافت می‌شوند */}
        </div>
      </section>
      <StarIcon
        className="absolute bottom-[-80%] left-0 lg:left-0 lg:bottom-[-40%]"
        size={100}
        color="#F3ABCB"
      />
    </>
  );
}
