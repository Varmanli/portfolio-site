import type { Metadata } from "next";
import "@/styles/globals.css";
import DisableRightClick from "@/components/DisableRightClick";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { getAllContent } from "@/lib/content";

const DEFAULT_TITLE = "Melika shemirani";
const DEFAULT_DESCRIPTION = "طراحی‌شده با Next.js و Tailwind CSS";

export async function generateMetadata(): Promise<Metadata> {
  const rows = await getAllContent();
  const content = Object.fromEntries(rows.map((row) => [row.key, row.value]));

  return {
    title: content.default_meta_title?.trim() || DEFAULT_TITLE,
    description: content.default_meta_description?.trim() || DEFAULT_DESCRIPTION,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="antialiased font-sans bg-black p-[8px] lg:p-[20px]">
      <PageViewTracker />
      <DisableRightClick />
      <div className="bg-background min-h-screen w-full pb-10">
        {children}
      </div>
    </div>
  );
}
