import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "melika shemirani",
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
        className="antialiased font-sans bg-black p-[20px]"
        suppressHydrationWarning
      >
        <div className="bg-background min-h-screen w-full">{children}</div>
      </body>
    </html>
  );
}
