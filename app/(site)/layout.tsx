import type { Metadata } from "next";
import "@/styles/globals.css";
import { PageMetadata } from "@/types/pageContent";

export const metadata: Metadata & PageMetadata = {
  title: "Melika shemirani",
  description: "طراحی‌شده با Next.js و Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className="antialiased font-sans bg-black p-[8px] lg:p-[20px]"
        suppressHydrationWarning
      >
        <div className="bg-background min-h-screen w-full pb-10">
          {children}
        </div>
      </body>
    </html>
  );
}
