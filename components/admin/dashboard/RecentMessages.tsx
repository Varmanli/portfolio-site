"use client";

import {
  MdEmail,
  MdPerson,
  MdAccessTime,
  MdMarkEmailUnread,
} from "react-icons/md";
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
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const formatDate = (date: string) => {
    return momentJalaali(date).format("jYYYY/jMM/jDD HH:mm");
  };

  if (recentMessages.length === 0) {
    return (
      <div className="rounded-[1.5rem] border-2 border-dashed border-black/30 bg-[#FFF7D8] p-8 text-center">
        <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-black bg-white text-black shadow-[4px_4px_0_#111]">
          <MdEmail size={32} />
        </span>

        <h3 className="text-lg font-black text-black">هنوز پیامی ثبت نشده</h3>

        <p className="mt-2 text-sm font-bold leading-7 text-black/50">
          وقتی کاربری از فرم تماس پیام ارسال کند، اینجا نمایش داده می‌شود.
        </p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-4">
      {recentMessages.map((message) => (
        <article
          key={message.id}
          className={`group relative overflow-hidden rounded-[1.5rem] border-2 border-black p-4 transition ${
            !message.isRead
              ? "bg-[#FFF7D8] shadow-[6px_6px_0_#FFE066]"
              : "bg-white shadow-[6px_6px_0_#111]"
          } hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111]`}
        >
          {!message.isRead && (
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-[#F196E5] px-3 py-1 text-[11px] font-black text-white shadow-[3px_3px_0_#111]">
              <MdMarkEmailUnread size={15} />
              خوانده‌نشده
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#CAF3AB] text-black shadow-[3px_3px_0_#111]">
                  <MdPerson size={23} />
                </span>

                <div className="min-w-0">
                  <h3 className="truncate text-base font-black text-black">
                    {message.name || "بدون نام"}
                  </h3>

                  <div className="mt-1 flex min-w-0 items-center gap-2 text-sm font-bold text-black/55">
                    <MdEmail size={18} className="shrink-0" />
                    <span className="truncate ltr text-left">
                      {message.email || "ایمیل ثبت نشده"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-1.5 text-xs font-black text-black shadow-[3px_3px_0_#111]">
                <MdAccessTime size={16} />
                <span>{formatDate(message.createdAt)}</span>
              </div>
            </div>

            <p className="line-clamp-2 rounded-2xl border-2 border-black/10 bg-white/70 px-4 py-3 text-sm font-bold leading-7 text-black/65">
              {message.message}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
