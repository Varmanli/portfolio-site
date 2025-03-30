"use client";

import { MdMessage, MdContentPaste } from "react-icons/md";
import { Message } from "@/types/admin";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

interface StatsProps {
  messages: Message[];
}

/**
 * Stats Component
 *
 * A component for displaying dashboard statistics including message counts and other metrics.
 *
 * @param {StatsProps} props - Component props
 * @returns {JSX.Element} The stats component
 */
export default function StatsWrapper(props: StatsProps) {
  return (
    <ErrorBoundary>
      <StatsContent {...props} />
    </ErrorBoundary>
  );
}

function StatsContent({ messages }: StatsProps) {
  const totalMessages = messages.length;
  const unreadMessages = messages.filter((msg) => !msg.isRead).length;
  const readMessages = messages.filter((msg) => msg.isRead).length;

  const stats = [
    {
      title: "کل پیام‌ها",
      value: totalMessages,
      icon: MdMessage,
      color: "yellow",
    },
    {
      title: "پیام‌های خوانده نشده",
      value: unreadMessages,
      icon: MdMessage,
      color: "red",
    },
    {
      title: "پیام‌های خوانده شده",
      value: readMessages,
      icon: MdMessage,
      color: "green",
    },
    {
      title: "بخش‌های محتوا",
      value: "2",
      icon: MdContentPaste,
      color: "blue",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}
            >
              <stat.icon size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
