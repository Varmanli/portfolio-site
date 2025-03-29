"use client";

import { MdEmail, MdPerson } from "react-icons/md";
import momentJalaali from "moment-jalaali";
import { Message } from "@/types/admin";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

interface RecentMessagesProps {
  messages: Message[];
}

/**
 * RecentMessages Component
 *
 * A component for displaying the most recent messages in the dashboard.
 *
 * @param {RecentMessagesProps} props - Component props
 * @returns {JSX.Element} The recent messages component
 */
export default function RecentMessagesWrapper(props: RecentMessagesProps) {
  return (
    <ErrorBoundary>
      <RecentMessagesContent {...props} />
    </ErrorBoundary>
  );
}

function RecentMessagesContent({ messages }: RecentMessagesProps) {
  const recentMessages = [...messages]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const formatDate = (date: string) => {
    return momentJalaali(date).format("jYYYY/jMM/jDD HH:mm");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-bold text-gray-800 mb-4">آخرین پیام‌ها</h2>
      <div className="space-y-4">
        {recentMessages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg border ${
              !message.isRead ? "border-yellow-500 bg-yellow-50" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MdPerson className="text-gray-500" size={20} />
                <span className="font-medium text-gray-800">
                  {message.name}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(message.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail className="text-gray-500" size={20} />
              <span className="text-gray-600">{message.email}</span>
            </div>
            <p className="mt-2 text-gray-700 line-clamp-2">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
