"use client";

import { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { Message } from "@/types/admin";
import { MOCK_MESSAGES } from "@/constants/admin";
import { messageApi } from "@/lib/api/admin";
import Stats from "@/components/admin/dashboard/Stats";
import RecentMessages from "@/components/admin/dashboard/RecentMessages";

/**
 * Dashboard Page
 *
 * The main dashboard page showing overview statistics and recent messages.
 *
 * @returns {JSX.Element} The dashboard page component
 */
export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // TODO: Replace with actual API call
        // const data = await messageApi.getAll();
        // setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
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
