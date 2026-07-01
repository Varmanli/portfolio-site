import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "تماس با من | ملیکا شمیرانی",
  description: "برای همکاری و سفارش طراحی با ملیکا شمیرانی در تماس باشید.",
  path: "/hire-me",
});

export default function HireMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
