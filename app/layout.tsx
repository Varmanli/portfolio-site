import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/shared/Header";

// ایمپورت فونت

export const metadata: Metadata = {
  title: "وبسایت من",
  description: "طراحی‌شده با Next.js و Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased font-sans">
        <div className="h-screen  bg-background m-5">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
