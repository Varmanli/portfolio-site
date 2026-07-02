"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MdDashboard, MdMessage, MdAutoAwesome } from "react-icons/md";
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
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#FFFDF5] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="absolute right-10 top-10 h-52 w-52 rounded-full bg-[#F196E5]/25 blur-3xl" />
      <div className="absolute bottom-16 left-10 h-64 w-64 rounded-full bg-[#CAF3AB]/50 blur-3xl" />
      <div className="absolute left-1/2 top-32 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border-2 border-black bg-white p-5 shadow-[10px_10px_0_#111] sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
                <MdDashboard size={30} />
              </span>

              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                  <MdAutoAwesome size={17} />
                  پنل مدیریت
                </div>

                <h1 className="text-2xl font-black leading-10 text-black sm:text-3xl">
                  داشبورد مدیریت
                </h1>

                <p className="mt-2 max-w-2xl text-sm font-bold leading-7 text-black/55">
                  خلاصه وضعیت سایت، آمار کلی و آخرین پیام‌های دریافتی را از
                  اینجا بررسی کن.
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-black bg-[#CAF3AB] px-4 py-3 shadow-[5px_5px_0_#111] sm:w-auto">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[3px_3px_0_#111]">
                <MdMessage size={24} />
              </span>

              <div className="text-left sm:min-w-32">
                <p className="text-xs font-black text-black/50">کل پیام‌ها</p>
                <p className="mt-1 text-2xl font-black text-black">
                  {messages.length.toLocaleString("fa-IR")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border-2 border-black bg-[#CAF3AB] p-4 shadow-[10px_10px_0_#111] sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-white text-black shadow-[3px_3px_0_#111]">
              <MdAutoAwesome size={23} />
            </span>

            <div>
              <h2 className="text-lg font-black text-black">آمار کلی</h2>
              <p className="mt-1 text-xs font-bold text-black/50">
                نمای سریع از وضعیت فعلی سایت
              </p>
            </div>
          </div>

          <Stats messages={messages} />
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border-2 border-black bg-white p-4 shadow-[10px_10px_0_#F196E5] sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[3px_3px_0_#111]">
                  <MdMessage size={23} />
                </span>

                <div>
                  <h2 className="text-lg font-black text-black">
                    آخرین پیام‌ها
                  </h2>
                  <p className="mt-1 text-xs font-bold text-black/50">
                    جدیدترین پیام‌های ارسال‌شده از سمت کاربران
                  </p>
                </div>
              </div>

              <span className="rounded-full border-2 border-black bg-[#F196E5] px-4 py-2 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                {messages.length.toLocaleString("fa-IR")} پیام
              </span>
            </div>

            <RecentMessages messages={messages} />
          </div>
        </section>
      </div>
    </main>
  );
}
