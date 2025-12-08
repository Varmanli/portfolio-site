import ProfileCard from "@/components/sections/ProfileCard";
import IntroText from "@/components/sections/IntroText";
import Decorations from "@/components/sections/Decorations";
import { Header } from "@/components/shared/Header";

type HomeContentItem = {
  key: string;
  value: string;
};

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home-content`,
    {
      cache: "no-store", // 👈 این مهمه
      // next: { revalidate: 0 }, // (اختیاری، برای تاکید بیشتر)
    }
  );

  if (!response.ok) {
    // می‌تونی اینجا یه UI خطا یا fallback برگردونی
    console.error("Failed to fetch home content", response.status);
    // برای ساده بودن، فعلاً یه throw:
    throw new Error("خطا در دریافت محتوای صفحه اصلی");
  }

  const data = (await response.json()) as HomeContentItem[];

  const homeContent = data.reduce<Record<string, string>>((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return (
    <>
      <Header />
      <section className="relative flex w-full max-w-[1440px] flex-col justify-center gap-30 border-t-5 pt-0 lg:flex-row lg:pt-20 mx-auto">
        <ProfileCard image={homeContent.home_image} />
        <IntroText
          title={homeContent.home_title}
          desc={homeContent.home_desc}
        />
        <Decorations />
      </section>
    </>
  );
}
