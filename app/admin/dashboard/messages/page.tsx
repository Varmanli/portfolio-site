"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { MdDelete, MdInbox, MdMessage, MdRefresh } from "react-icons/md";
import toast from "react-hot-toast";

import { Message } from "@/types/admin";
import { showError } from "@/lib/utils/toast";
import MessageList from "@/components/admin/messages/MessageList";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await axios.get<Message[]>("/api/messages");
      setMessages(res.data);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleDeleteMessage = (id: string) => {
    const message = messages.find((item) => item.id === id);

    toast.custom((t) => (
      <div
        dir="rtl"
        className="w-full max-w-sm overflow-hidden rounded-[1.75rem] border-2 border-black bg-white text-right shadow-[8px_8px_0_#111]"
      >
        <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-red-100 text-red-600 shadow-[3px_3px_0_#111]">
              <MdDelete size={22} />
            </span>

            <div>
              <h3 className="text-sm font-black text-black">حذف پیام</h3>
              <p className="mt-1 text-xs font-bold leading-5 text-black/50">
                این عملیات قابل بازگشت نیست.
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm font-bold leading-7 text-black/65">
            آیا از حذف پیام{" "}
            {message?.name ? (
              <span className="font-black text-black">{message.name}</span>
            ) : (
              <span className="font-black text-black">انتخاب‌شده</span>
            )}{" "}
            اطمینان دارید؟
          </p>

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="rounded-2xl border-2 border-black bg-white px-4 py-2 text-sm font-black text-black shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]"
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
              className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-black bg-red-500 px-4 py-2 text-sm font-black text-white shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]"
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
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#FFFDF5] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute right-10 top-10 h-52 w-52 rounded-full bg-[#F196E5]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-10 h-64 w-64 rounded-full bg-[#CAF3AB]/50 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]">
          <div className="flex flex-col gap-5 border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
                <MdMessage size={28} />
              </span>

              <div>
                <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                  صندوق پیام‌ها
                </div>

                <h1 className="text-xl font-black leading-9 text-black sm:text-2xl">
                  پیام‌ها
                </h1>

                <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                  پیام‌های ارسال‌شده از فرم تماس سایت را مشاهده و مدیریت کنید.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={fetchMessages}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-white px-4 py-2.5 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#111]"
            >
              <MdRefresh
                size={18}
                className={isLoading ? "animate-spin" : ""}
              />
              بروزرسانی
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {isLoading ? (
              <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                <TableSkeleton variant="message" rows={4} />
              </div>
            ) : messages.length > 0 ? (
              <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-[#CAF3AB] text-black shadow-[3px_3px_0_#111]">
                      <MdInbox size={23} />
                    </span>

                    <div>
                      <h2 className="text-lg font-black text-black">
                        لیست پیام‌ها
                      </h2>
                      <p className="mt-1 text-xs font-bold text-black/45">
                        جدیدترین پیام‌ها و درخواست‌های کاربران
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border-2 border-black bg-[#F196E5] px-4 py-2 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                    {messages.length.toLocaleString("fa-IR")} پیام
                  </span>
                </div>

                <MessageList
                  messages={messages}
                  onDelete={handleDeleteMessage}
                />
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-black/30 bg-[#FFF7D8] px-6 py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-black bg-white text-black shadow-[4px_4px_0_#111]">
                  <MdInbox size={32} />
                </div>

                <h2 className="text-lg font-black text-black">
                  هنوز پیامی دریافت نشده است
                </h2>

                <p className="mt-2 max-w-md text-sm font-bold leading-7 text-black/55">
                  وقتی کاربران از فرم تماس سایت پیامی ارسال کنند، اینجا نمایش
                  داده می‌شود.
                </p>

                <button
                  type="button"
                  onClick={fetchMessages}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-white px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111]"
                >
                  <MdRefresh size={18} />
                  بررسی دوباره
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
