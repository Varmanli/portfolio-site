"use client";

import { useState } from "react";
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
import { showError, showSuccess } from "@/lib/utils/toast";

interface MessageListProps {
  messages: Message[];
  onDelete: (id: string) => void | Promise<void>;
}

export default function MessageListWrapper({
  messages,
  onDelete,
}: MessageListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await onDelete(id);
      showSuccess("پیام با موفقیت حذف شد");
    } catch (err) {
      showError(err);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <ErrorBoundary>
      <MessageListContent
        messages={messages}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </ErrorBoundary>
  );
}

interface MessageListContentProps {
  messages: Message[];
  onDelete: (id: string) => Promise<void>;
  isDeleting: string | null;
}

function MessageListContent({
  messages,
  onDelete,
  isDeleting,
}: MessageListContentProps) {
  const formatDate = (date: string) => {
    return momentJalaali(date).format("jYYYY/jMM/jDD - HH:mm");
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isRead = Boolean(message.isRead);
        const hasSubject = Boolean(message.subject?.trim());

        return (
          <article
            key={message.id}
            className={[
              "group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
              isRead
                ? "border-gray-100 hover:border-yellow-200"
                : "border-yellow-200 ring-1 ring-yellow-100",
            ].join(" ")}
          >
            <div className="flex flex-col gap-4 border-b border-gray-100 bg-gradient-to-l from-gray-50 via-white to-white px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <span
                  className={[
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm",
                    isRead
                      ? "bg-gray-100 text-gray-500"
                      : "bg-yellow-500 text-white shadow-yellow-200",
                  ].join(" ")}
                >
                  <MdMessage size={23} />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-black text-gray-900">
                      {message.name || "کاربر بدون نام"}
                    </h3>

                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-xs font-bold",
                        isRead
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-100 text-yellow-700",
                      ].join(" ")}
                    >
                      {isRead ? "خوانده شده" : "جدید"}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:flex-wrap sm:items-center">
                    <span className="inline-flex items-center gap-1.5">
                      <MdEmail className="text-gray-400" size={16} />
                      <span dir="ltr" className="font-medium">
                        {message.email}
                      </span>
                    </span>

                    <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

                    <span className="inline-flex items-center gap-1.5">
                      <MdAccessTime className="text-gray-400" size={16} />
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDelete(message.id)}
                disabled={isDeleting === message.id}
                className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-red-50 px-3.5 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <MdDelete size={18} />
                {isDeleting === message.id ? "در حال حذف..." : "حذف"}
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              {hasSubject && (
                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-3">
                  <div className="mb-1 flex items-center gap-2 text-xs font-black text-gray-500">
                    <MdSubject size={17} className="text-yellow-600" />
                    موضوع پیام
                  </div>

                  <p className="text-sm font-bold leading-7 text-gray-800">
                    {message.subject}
                  </p>
                </div>
              )}

              <div className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-black text-gray-500">
                  <MdPerson size={17} className="text-yellow-600" />
                  متن پیام
                </div>

                <p className="whitespace-pre-wrap text-sm leading-8 text-gray-700">
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
