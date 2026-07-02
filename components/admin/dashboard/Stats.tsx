"use client";

import {
  MdMessage,
  MdContentPaste,
  MdMarkEmailUnread,
  MdDrafts,
} from "react-icons/md";
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
      bg: "bg-[#FFE066]",
      shadow: "shadow-[6px_6px_0_#111]",
      badge: "همه پیام‌ها",
    },
    {
      title: "پیام‌های خوانده‌نشده",
      value: unreadMessages,
      icon: MdMarkEmailUnread,
      bg: "bg-[#F196E5]",
      shadow: "shadow-[6px_6px_0_#111]",
      badge: "نیازمند بررسی",
    },
    {
      title: "پیام‌های خوانده‌شده",
      value: readMessages,
      icon: MdDrafts,
      bg: "bg-[#CAF3AB]",
      shadow: "shadow-[6px_6px_0_#111]",
      badge: "بررسی‌شده",
    },
    {
      title: "بخش‌های محتوا",
      value: 2,
      icon: MdContentPaste,
      bg: "bg-sky-200",
      shadow: "shadow-[6px_6px_0_#111]",
      badge: "مدیریت محتوا",
    },
  ];

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <article
          key={stat.title}
          className={`group relative overflow-hidden rounded-[1.75rem] border-2 border-black bg-white p-5 transition ${stat.shadow} hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111]`}
        >
          <div
            className={`absolute -left-8 -top-8 h-24 w-24 rounded-full ${stat.bg} opacity-60 blur-2xl`}
          />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="mb-4 inline-flex rounded-full border-2 border-black bg-white px-3 py-1 text-[11px] font-black text-black shadow-[3px_3px_0_#111]">
                {stat.badge}
              </span>

              <h3 className="text-sm font-black leading-7 text-black/55">
                {stat.title}
              </h3>

              <p className="mt-2 text-4xl font-black leading-none text-black">
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString("fa-IR")
                  : stat.value}
              </p>
            </div>

            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black ${stat.bg} text-black shadow-[4px_4px_0_#111] transition group-hover:-translate-x-0.5 group-hover:-translate-y-0.5`}
            >
              <stat.icon size={30} />
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
