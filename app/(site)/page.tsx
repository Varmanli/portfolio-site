import type { Metadata } from "next";
import ProfileCard from "@/components/sections/ProfileCard";
import IntroText from "@/components/sections/IntroText";
import Decorations from "@/components/sections/Decorations";
import { Header } from "@/components/shared/Header";
import { getAllContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "ملیکا شمیرانی | صفحه اصلی",
  description:
    "به پرتفولیوی ملیکا شمیرانی خوش آمدید؛ مشاهده نمونه‌کارها و خدمات طراحی گرافیک.",
  path: "/",
});

export default async function Home() {
  const data = await getAllContent();

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
