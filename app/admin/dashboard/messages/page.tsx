"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdInbox, MdMessage, MdRefresh } from "react-icons/md";
import toast from "react-hot-toast";

import { Message } from "@/types/admin";
import { showError } from "@/lib/utils/toast";
import MessageList from "@/components/admin/messages/MessageList";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get<Message[]>("/api/messages");
      setMessages(res.data);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteMessage = (id: string) => {
    const message = messages.find((item) => item.id === id);

    toast.custom((t) => (
      <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-gray-100 bg-white text-right shadow-xl">
        <div className="border-b border-gray-100 bg-red-50/60 px-5 py-4">
          <h3 className="text-sm font-black text-gray-900">حذف پیام</h3>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            این عملیات قابل بازگشت نیست.
          </p>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm leading-7 text-gray-600">
            آیا از حذف پیام{" "}
            {message?.name ? (
              <span className="font-black text-gray-900">{message.name}</span>
            ) : (
              "انتخاب‌شده"
            )}{" "}
            اطمینان دارید؟
          </p>

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
            >
              انصراف
            </button>

            <button
              type="button"
              onClick={async () => {
                toast.dismiss(t.id);

                const toastId = toast.loading("در حال حذف پیام...");

                try {
                  await axios.delete(`/api/messages/${id}`);

                  setMessages((prev) => prev.filter((item) => item.id !== id));

                  toast.success("پیام با موفقیت حذف شد", { id: toastId });
                } catch (error) {
                  toast.error("خطا در حذف پیام", { id: toastId });
                  showError(error);
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600"
            >
              <MdDelete size={17} />
              حذف
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6 p-4">
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500 text-white shadow-sm shadow-yellow-200">
              <MdMessage size={23} />
            </span>

            <div>
              <h1 className="text-xl font-black text-gray-900">پیام‌ها</h1>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                پیام‌های ارسال‌شده از فرم تماس سایت را مشاهده و مدیریت کنید.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchMessages}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <MdRefresh size={18} className={isLoading ? "animate-spin" : ""} />
            بروزرسانی
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4">
              <TableSkeleton variant="message" rows={4} />
            </div>
          ) : messages.length > 0 ? (
            <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4">
              <MessageList messages={messages} onDelete={handleDeleteMessage} />
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/70 px-6 py-12 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
                <MdInbox size={32} />
              </div>

              <h2 className="text-lg font-black text-gray-900">
                هنوز پیامی دریافت نشده است
              </h2>

              <p className="mt-2 max-w-md text-sm leading-7 text-gray-500">
                وقتی کاربران از فرم تماس سایت پیامی ارسال کنند، اینجا نمایش داده
                می‌شود.
              </p>

              <button
                type="button"
                onClick={fetchMessages}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700"
              >
                <MdRefresh size={18} />
                بررسی دوباره
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
