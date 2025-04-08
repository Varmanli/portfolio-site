import type { Metadata } from "next";
import "@/styles/globals.css";
import { PageMetadata } from "@/types/pageContent";
import { Toaster } from "react-hot-toast";
import DisableRightClick from "@/components/DisableRightClick";

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
        <Toaster position="top-center" reverseOrder={false} />
        <DisableRightClick />
        <div className="bg-background min-h-screen w-full pb-10">
          {children}
        </div>
      </body>
    </html>
  );
}
