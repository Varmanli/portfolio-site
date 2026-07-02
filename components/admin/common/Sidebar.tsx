"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdBuild,
  MdChevronLeft,
  MdContentPaste,
  MdDashboard,
  MdMessage,
  MdSettings,
  MdWork,
} from "react-icons/md";

const menuItems = [
  {
    title: "داشبورد",
    description: "نمای کلی و آمار",
    icon: MdDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "مدیریت محتوا",
    description: "صفحه اصلی و تماس",
    icon: MdContentPaste,
    href: "/admin/dashboard/content",
  },
  {
    title: "نمونه‌کارها",
    description: "پروژه‌ها و گالری",
    icon: MdWork,
    href: "/admin/dashboard/projects",
  },
  {
    title: "خدمات",
    description: "لیست خدمات سایت",
    icon: MdBuild,
    href: "/admin/dashboard/services",
  },
  {
    title: "پیام‌ها",
    description: "پیام‌های کاربران",
    icon: MdMessage,
    href: "/admin/dashboard/messages",
  },
  {
    title: "تنظیمات",
    description: "اطلاعات و تنظیمات سایت",
    icon: MdSettings,
    href: "/admin/dashboard/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-76 shrink-0 border-l-2 border-black bg-[#FFFDF5] p-4 lg:block">
      <div className="flex h-full flex-col">
        <div className="mb-4 overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[8px_8px_0_#111]">
          <div className="relative overflow-hidden bg-[#FFF7D8] p-5">
            <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#F196E5]/35 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 right-8 h-24 w-24 rounded-full bg-[#CAF3AB]/55 blur-2xl" />

            <div className="relative z-10 flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-xl font-black text-black shadow-[4px_4px_0_#111]">
                ش
              </span>

              <div className="min-w-0">
                <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-3 py-1 text-[11px] font-black text-white shadow-[2px_2px_0_#111]">
                  Admin
                </div>

                <h1 className="text-lg font-black text-black">پنل مدیریت</h1>

                <p className="mt-1 text-xs font-bold leading-5 text-black/50">
                  مدیریت سایت
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-3 overflow-y-auto rounded-[2rem] border-2 border-black bg-white p-3 shadow-[8px_8px_0_#111]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "group relative flex items-center gap-3 overflow-hidden rounded-[1.5rem] border-2 border-black px-3 py-3 transition",
                  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]",
                  isActive
                    ? "bg-[#FFF7D8] shadow-[4px_4px_0_#F196E5]"
                    : "bg-white shadow-[3px_3px_0_#111]",
                ].join(" ")}
              >
                <div
                  className={[
                    "pointer-events-none absolute -left-8 -top-8 h-20 w-20 rounded-full blur-2xl transition",
                    isActive
                      ? "bg-[#F196E5]/45"
                      : "bg-[#CAF3AB]/35 opacity-0 group-hover:opacity-100",
                  ].join(" ")}
                />

                <span
                  className={[
                    "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-black text-black shadow-[3px_3px_0_#111] transition",
                    isActive
                      ? "bg-[#FFE066]"
                      : "bg-[#CAF3AB] group-hover:bg-[#FFE066]",
                  ].join(" ")}
                >
                  <Icon size={22} />
                </span>

                <span className="relative z-10 min-w-0 flex-1">
                  <span className="block text-sm font-black text-black">
                    {item.title}
                  </span>

                  <span className="mt-0.5 block truncate text-xs font-bold leading-5 text-black/50">
                    {item.description}
                  </span>
                </span>

                <MdChevronLeft
                  size={20}
                  className={[
                    "relative z-10 shrink-0 transition",
                    isActive
                      ? "text-black"
                      : "text-black/35 group-hover:-translate-x-1 group-hover:text-black",
                  ].join(" ")}
                />

                {isActive && (
                  <span className="absolute left-3 top-3 rounded-full border-2 border-black bg-[#F196E5] px-2.5 py-0.5 text-[10px] font-black text-white shadow-[2px_2px_0_#111]">
                    فعال
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 rounded-[2rem] border-2 border-black bg-white p-4 shadow-[8px_8px_0_#111]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black text-black/45">وضعیت سیستم</p>
              <p className="mt-1 text-sm font-black text-black">
                آنلاین و فعال
              </p>
            </div>

            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-[#CAF3AB] shadow-[3px_3px_0_#111]">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-green-500/50" />
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
