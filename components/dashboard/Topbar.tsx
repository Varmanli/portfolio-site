"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import moment from "moment-jalaali";

// فعال‌سازی تقویم و اعداد فارسی
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function Topbar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = moment();
      const formatted = now.format("dddd jD jMMMM jYYYY"); // سه‌شنبه ۲۴ فروردین ۱۴۰۳
      setTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-16 bg-white shadow-sm rounded-t-2xl flex items-center justify-between px-6 border-b">
      {/* تاریخ و خوش‌آمدگویی */}
      <div className="flex items-center gap-4">
        <div className="text-gray-800 text-lg font-bold whitespace-nowrap">
          خوش‌اومدی 👋
        </div>
        <div className="hidden sm:flex items-center bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-lg shadow-inner">
          {time}
        </div>
      </div>

      {/* مشاهده سایت */}
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-2 bg-background hover:bg-yellow-300 text-black text-sm font-medium px-4 py-2 rounded-md transition shadow"
      >
        <FiHome size={18} />
        <span>مشاهده سایت</span>
      </Link>
    </div>
  );
}
