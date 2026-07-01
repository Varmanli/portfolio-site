"use client";

import { MdSettings } from "react-icons/md";
import SettingsForm from "@/components/admin/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-4">
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500 text-white shadow-sm shadow-yellow-200">
              <MdSettings size={23} />
            </span>

            <div>
              <h1 className="text-xl font-black text-gray-900">
                تنظیمات سایت
              </h1>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                اطلاعات عمومی، شبکه‌های اجتماعی و تنظیمات نمایش سایت را مدیریت
                کنید.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SettingsForm />
    </div>
  );
}
