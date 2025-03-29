import type { Metadata } from "next";
import "@/styles/globals.css";
import { PageMetadata } from "@/types/pageContent";

export const metadata: Metadata & PageMetadata = {
  title: "Melika shemirani",
  description: "طراحی‌شده با Next.js و Tailwind CSS",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
