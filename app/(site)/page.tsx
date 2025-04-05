import ProfileCard from "@/components/sections/ProfileCard";
import IntroText from "@/components/sections/IntroText";
import Decorations from "@/components/sections/Decorations";
import { Header } from "@/components/shared/Header";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home-content`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await response.json();

  const homeContent = data.reduce(
    (acc: Record<string, string>, item: { key: string; value: string }) => {
      acc[item.key] = item.value;
      return acc;
    },
    {} as Record<string, string>
  );
  return (
    <>
      <Header />
      <section className="flex flex-col lg:flex-row justify-center gap-30 pt-0 lg:pt-20 relative border-t-5 w-full max-w-[1440px] mx-auto">
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
