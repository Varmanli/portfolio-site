"use client";

import momentJalaali from "moment-jalaali";
import {
  MdAccessTime,
  MdDelete,
  MdEmail,
  MdMessage,
  MdPerson,
  MdSubject,
} from "react-icons/md";

import { Message } from "@/types/admin";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

interface MessageListProps {
  messages: Message[];
  onDelete: (id: string) => void | Promise<void>;
}

export default function MessageListWrapper({
  messages,
  onDelete,
}: MessageListProps) {
  return (
    <ErrorBoundary>
      <MessageListContent messages={messages} onDelete={onDelete} />
    </ErrorBoundary>
  );
}

function MessageListContent({ messages, onDelete }: MessageListProps) {
  const formatDate = (date: string) => {
    return momentJalaali(date).format("jYYYY/jMM/jDD - HH:mm");
  };

  return (
    <div dir="rtl" className="space-y-4">
      {messages.map((message) => {
        const isRead = Boolean(message.isRead);
        const hasSubject = Boolean(message.subject?.trim());

        return (
          <article
            key={message.id}
            className={[
              "group overflow-hidden rounded-[1.75rem] border-2 border-black transition",
              "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111]",
              isRead
                ? "bg-white shadow-[6px_6px_0_#111]"
                : "bg-[#FFF7D8] shadow-[6px_6px_0_#FFE066]",
            ].join(" ")}
          >
            <div className="flex flex-col gap-4 border-b-2 border-black bg-white/70 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <span
                  className={[
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black text-black shadow-[3px_3px_0_#111]",
                    isRead ? "bg-[#CAF3AB]" : "bg-[#FFE066]",
                  ].join(" ")}
                >
                  <MdMessage size={24} />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-black text-black">
                      {message.name || "کاربر بدون نام"}
                    </h3>

                    <span
                      className={[
                        "rounded-full border-2 border-black px-3 py-1 text-[11px] font-black shadow-[2px_2px_0_#111]",
                        isRead
                          ? "bg-[#CAF3AB] text-black"
                          : "bg-[#F196E5] text-white",
                      ].join(" ")}
                    >
                      {isRead ? "خوانده‌شده" : "جدید"}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 text-xs font-bold text-black/55 sm:flex-row sm:flex-wrap sm:items-center">
                    <span className="inline-flex min-w-0 items-center gap-1.5">
                      <MdEmail className="shrink-0 text-black/45" size={16} />
                      <span dir="ltr" className="truncate text-left">
                        {message.email || "ایمیل ثبت نشده"}
                      </span>
                    </span>

                    <span className="hidden h-1.5 w-1.5 rounded-full bg-black/25 sm:block" />

                    <span className="inline-flex items-center gap-1.5">
                      <MdAccessTime className="text-black/45" size={16} />
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDelete(message.id)}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-2xl border-2 border-black bg-red-100 px-3.5 py-2 text-sm font-black text-red-600 shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]"
              >
                <MdDelete size={18} />
                حذف
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              {hasSubject && (
                <div className="rounded-2xl border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0_#111]">
                  <div className="mb-2 flex items-center gap-2 text-xs font-black text-black/55">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-black bg-[#FFE066] text-black shadow-[2px_2px_0_#111]">
                      <MdSubject size={17} />
                    </span>
                    موضوع پیام
                  </div>

                  <p className="text-sm font-black leading-7 text-black">
                    {message.subject}
                  </p>
                </div>
              )}

              <div className="rounded-2xl border-2 border-black bg-white px-4 py-4 shadow-[4px_4px_0_#111]">
                <div className="mb-2 flex items-center gap-2 text-xs font-black text-black/55">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-black bg-[#CAF3AB] text-black shadow-[2px_2px_0_#111]">
                    <MdPerson size={17} />
                  </span>
                  متن پیام
                </div>

                <p className="whitespace-pre-wrap text-sm font-bold leading-8 text-black/70">
                  {message.message || "متنی برای این پیام ثبت نشده است."}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
