"use client";

import { MdSettings } from "react-icons/md";
import SettingsForm from "@/components/admin/settings/SettingsForm";

export default function SettingsPage() {
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
                <MdSettings size={28} />
              </span>

              <div>
                <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                  پیکربندی سایت
                </div>

                <h1 className="text-xl font-black leading-9 text-black sm:text-2xl">
                  تنظیمات سایت
                </h1>

                <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                  اطلاعات عمومی، شبکه‌های اجتماعی و تنظیمات نمایش سایت را مدیریت
                  کنید.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border-2 border-black bg-white p-4 shadow-[10px_10px_0_#111] sm:p-6">
          <SettingsForm />
        </section>
      </div>
    </main>
  );
}
