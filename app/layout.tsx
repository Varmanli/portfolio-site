import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "عنوان سایت",
  description: "توضیح کوتاه سایت",
  icons: {
    icon: "/favicon.svg",
  },
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
