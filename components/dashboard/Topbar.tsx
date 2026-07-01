"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { MdAccessTime, MdWavingHand } from "react-icons/md";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function Topbar() {
  const [dateText, setDateText] = useState<string>("");
  const [timeText, setTimeText] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = moment();

      setDateText(now.format("dddd jD jMMMM jYYYY"));
      setTimeText(now.format("HH:mm"));
    };

    updateTime();

    const timer = setInterval(updateTime, 1000 * 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
            <MdWavingHand size={23} />
          </span>

          <div className="min-w-0">
            <h2 className="text-sm font-black text-gray-900 sm:text-base">
              خوش‌اومدی
            </h2>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-bold text-gray-700">
            <MdAccessTime size={18} className="text-yellow-600" />
            <span>{dateText}</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span dir="ltr">{timeText}</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-4 py-2.5 text-sm font-black text-white shadow-sm shadow-yellow-200 transition hover:bg-yellow-600"
          >
            <FiHome size={18} />
            مشاهده سایت
          </Link>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-500 text-white shadow-sm shadow-yellow-200 transition hover:bg-yellow-600 md:hidden"
          aria-label="مشاهده سایت"
        >
          <FiHome size={19} />
        </Link>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-2 text-xs font-bold text-gray-600 md:hidden">
        <span>{dateText}</span>
        <span dir="ltr">{timeText}</span>
      </div>
    </header>
  );
}
