import { Header } from "@/components/shared/Header";
import StarIcon from "@/components/ui/StarIcon";
import Image from "next/image";
import { SERVICES } from "@/constants/services";

/**
 * Services Page Component
 * Displays a list of services offered with decorative elements
 *
 * @component
 * @returns {JSX.Element} Rendered services page
 *
 * TODO:
 * - Add loading state for future API integration
 * - Add error handling for failed service fetches
 * - Consider pagination for large service lists
 */
export default function ServicesPage() {
  return (
    <>
      <Header />
      <section className="px-6 py-10 max-w-[1440px] mx-auto relative z-10">
        <p className="text-lg lg:text-4xl font-bold mb-8 text-center">
          آنچه می‌توانم برای شما انجام دهم
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-10 lg:gap-15 lg:mx-20">
          {SERVICES.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-4 p-5 border-4 border-black bg-white  shadow-xl shadow-black/60"
            >
              <span className="lg:text-2xl font-semibold">{item}</span>
              <Image
                src="/Service-icon.svg"
                alt="icon"
                width={38}
                height={38}
              />
            </div>
          ))}
        </div>
      </section>
      <StarIcon
        className="absolute bottom-[-80%] left-0 lg:left-0 lg:bottom-[-40%] "
        size={100}
        color="#F3ABCB"
      />
    </>
  );
}
