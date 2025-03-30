"use client";

import { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { Message } from "@/types/admin";
import { MOCK_MESSAGES } from "@/constants/admin";
import Stats from "@/components/admin/dashboard/Stats";
import RecentMessages from "@/components/admin/dashboard/RecentMessages";

export default function DashboardPage() {
  const [messages] = useState<Message[]>(MOCK_MESSAGES); // بدون setMessages
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // فعلاً لودینگ فیکه، چون API نداری
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <MdDashboard size={24} className="text-yellow-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">داشبورد</h1>
      </div>

      <Stats messages={messages} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentMessages messages={messages} />
      </div>
    </div>
  );
}
