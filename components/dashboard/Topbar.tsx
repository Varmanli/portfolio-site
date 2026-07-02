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
    <header
      dir="rtl"
      className="sticky top-0 z-30 border-b-2 border-black bg-[#FFFDF5]/95 px-4 py-3 backdrop-blur"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
            <MdWavingHand size={24} />
          </span>

          <div className="min-w-0">
            <div className="mb-1 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-3 py-0.5 text-[10px] font-black text-white shadow-[2px_2px_0_#111]">
              Admin Panel
            </div>

            <h2 className="truncate text-sm font-black text-black sm:text-base">
              خوش‌اومدی
            </h2>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-white px-4 py-2.5 text-sm font-black text-black shadow-[4px_4px_0_#111]">
            <MdAccessTime size={18} className="text-black/60" />

            <span>{dateText}</span>

            <span className="h-1.5 w-1.5 rounded-full bg-black/25" />

            <span dir="ltr">{timeText}</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#CAF3AB] px-4 py-2.5 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111]"
          >
            <FiHome size={18} />
            مشاهده سایت
          </Link>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#CAF3AB] text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] md:hidden"
          aria-label="مشاهده سایت"
        >
          <FiHome size={19} />
        </Link>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border-2 border-black bg-white px-4 py-2 text-xs font-black text-black shadow-[4px_4px_0_#111] md:hidden">
        <span className="truncate">{dateText}</span>

        <span
          className="shrink-0 rounded-full border-2 border-black bg-[#FFE066] px-3 py-1 text-[11px] font-black text-black shadow-[2px_2px_0_#111]"
          dir="ltr"
        >
          {timeText}
        </span>
      </div>
    </header>
  );
}
