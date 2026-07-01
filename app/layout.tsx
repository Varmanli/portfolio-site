import type { Metadata } from "next";
import "@/styles/globals.css";
import Toaster from "@/components/shared/Toaster";
import { SITE_URL, buildMetadata } from "@/lib/seo";

const DEFAULT_TITLE = "ملیکا شمیرانی | طراح گرافیک";
const DEFAULT_DESCRIPTION =
  "پرتفولیوی ملیکا شمیرانی، طراح گرافیک؛ مشاهده نمونه‌کارها، خدمات طراحی و راه‌های ارتباطی.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
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
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
