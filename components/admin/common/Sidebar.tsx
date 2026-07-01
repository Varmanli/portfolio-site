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
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-l border-gray-100 bg-white/95 p-4 shadow-sm backdrop-blur lg:block">
      <div className="flex h-full flex-col">
        <div className="mb-4 overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500 text-lg font-black text-white shadow-sm shadow-yellow-200">
              ش
            </span>

            <div>
              <h1 className="text-lg font-black text-gray-900">پنل مدیریت</h1>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                مدیریت سایت 
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto rounded-3xl border border-gray-100 bg-gray-50/60 p-2">
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
                className={[
                  "group relative flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-200",
                  isActive
                    ? "bg-yellow-500 text-white shadow-sm shadow-yellow-200"
                    : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white text-gray-400 ring-1 ring-gray-100 group-hover:text-yellow-600",
                  ].join(" ")}
                >
                  <Icon size={22} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black">{item.title}</span>
                  <span
                    className={[
                      "mt-0.5 block text-xs leading-5",
                      isActive ? "text-white/75" : "text-gray-400",
                    ].join(" ")}
                  >
                    {item.description}
                  </span>
                </span>

                <MdChevronLeft
                  size={20}
                  className={[
                    "shrink-0 transition",
                    isActive
                      ? "text-white"
                      : "text-gray-300 group-hover:-translate-x-1 group-hover:text-yellow-600",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 rounded-3xl border border-gray-100 bg-white p-4">
          <p className="text-xs font-bold text-gray-400">وضعیت سیستم</p>

          <div className="mt-3 flex items-center justify-between rounded-2xl bg-green-50 px-3 py-2">
            <span className="text-xs font-bold text-green-700">
              آنلاین و فعال
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm shadow-green-200" />
          </div>
        </div>
      </div>
    </aside>
  );
}
