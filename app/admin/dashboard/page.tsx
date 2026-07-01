"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MdDashboard } from "react-icons/md";
import { Message } from "@/types/admin";
import Stats from "@/components/admin/dashboard/Stats";
import RecentMessages from "@/components/admin/dashboard/RecentMessages";
import DashboardSkeleton from "@/components/admin/dashboard/DashboardSkeleton";
import { showError } from "@/lib/utils/toast";

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<Message[]>("/api/messages");
        setMessages(response.data);
      } catch (error) {
        showError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
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
