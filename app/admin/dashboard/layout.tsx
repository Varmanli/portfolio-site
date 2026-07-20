"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import DashboardSkeleton from "@/components/admin/dashboard/DashboardSkeleton";
import "@/styles/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/verify", { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        setLoading(false);
      })
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [router]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 text-gray-800">
      {/* Sidebar ثابت */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Content Scrollable */}
      <div className="flex flex-col flex-1 h-full">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4">
          {loading ? <DashboardSkeleton /> : children}
        </main>
      </div>
    </div>
  );
}
