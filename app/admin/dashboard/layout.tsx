// app/admin/dashboard/layout.tsx
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import type { Metadata } from "next";
import { PageMetadata } from "@/types/pageContent";
import "@/styles/globals.css";

export const metadata: Metadata & PageMetadata = {
  title: "پنل مدیریت | Melika Shemirani",
  description: "داشبورد مدیریتی با طراحی Next.js و Tailwind CSS",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className="antialiased font-sans"
        suppressHydrationWarning
      >
        <div className="min-h-screen w-full ">
          <div className="flex min-h-screen bg-gray-100 text-gray-800 rounded-2xl overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Topbar />
              <main className="p-4">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
