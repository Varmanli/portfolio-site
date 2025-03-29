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
      <body className="flex h-screen overflow-hidden bg-gray-100 text-gray-800">
        {/* Sidebar ثابت */}
        <div className=" flex-shrink-0">
          <Sidebar />
        </div>

        {/* Content Scrollable */}
        <div className="flex flex-col flex-1 h-full">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
