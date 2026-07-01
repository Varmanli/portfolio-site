"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillSliders } from "react-icons/ai";
import {
  MdArticle,
  MdBuild,
  MdChevronLeft,
  MdMenuOpen,
  MdMessage,
  MdSettings,
  MdWork,
} from "react-icons/md";

const menuItems = [
  {
    name: "آمار کلی",
    description: "نمای کلی و بازدیدها",
    path: "/admin/dashboard/overview",
    icon: AiFillSliders,
  },
  {
    name: "نمونه‌کارها",
    description: "پروژه‌ها و گالری",
    path: "/admin/dashboard/projects",
    icon: MdWork,
  },
  {
    name: "خدمات",
    description: "لیست خدمات سایت",
    path: "/admin/dashboard/services",
    icon: MdBuild,
  },
  {
    name: "محتوای سایت",
    description: "صفحه اصلی و تماس",
    path: "/admin/dashboard/content",
    icon: MdArticle,
  },
  {
    name: "پیام‌ها",
    description: "پیام‌های کاربران",
    path: "/admin/dashboard/messages",
    icon: MdMessage,
  },
  {
    name: "تنظیمات",
    description: "اطلاعات و تنظیمات سایت",
    path: "/admin/dashboard/settings",
    icon: MdSettings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isItemActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  if (!mounted) {
    return (
      <aside className="hidden h-screen w-72 shrink-0 border-l border-gray-100 bg-white p-4 shadow-sm lg:block">
        <div className="mb-4 h-24 animate-pulse rounded-3xl bg-gray-100" />
        <div className="space-y-2 rounded-3xl border border-gray-100 bg-gray-50/60 p-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-16 animate-pulse rounded-2xl bg-white"
            />
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={[
        "sticky top-0 hidden h-screen shrink-0 border-l border-gray-100 bg-white/95 p-4 shadow-sm backdrop-blur transition-all duration-300 lg:block",
        collapsed ? "w-24" : "w-72",
      ].join(" ")}
    >
      <div className="flex h-full flex-col">
        <div
          className={[
            "mb-4 overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white transition-all",
            collapsed ? "p-3" : "p-5",
          ].join(" ")}
        >
          <div
            className={[
              "flex items-center",
              collapsed ? "justify-center" : "gap-3",
            ].join(" ")}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-500 text-lg font-black text-white shadow-sm shadow-yellow-200">
              ش
            </span>

            {!collapsed && (
              <div className="min-w-0">
                <h1 className="text-lg font-black text-gray-900">پنل مدیریت</h1>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  مدیریت سایت
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto rounded-3xl border border-gray-100 bg-gray-50/60 p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                title={collapsed ? item.name : undefined}
                className={[
                  "group relative flex items-center rounded-2xl transition-all duration-200",
                  collapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-3",
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

                {!collapsed && (
                  <>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-black">
                        {item.name}
                      </span>
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
                  </>
                )}

                {collapsed && isActive && (
                  <span className="absolute right-0 h-8 w-1 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 space-y-3">
          {!collapsed && (
            <div className="rounded-3xl border border-gray-100 bg-white p-4">
              <p className="text-xs font-bold text-gray-400">وضعیت سیستم</p>

              <div className="mt-3 flex items-center justify-between rounded-2xl bg-green-50 px-3 py-2">
                <span className="text-xs font-bold text-green-700">
                  آنلاین و فعال
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm shadow-green-200" />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className={[
              "flex w-full items-center rounded-2xl border border-gray-100 bg-white text-sm font-bold text-gray-600 shadow-sm transition hover:border-yellow-200 hover:bg-yellow-50 hover:text-yellow-700",
              collapsed ? "justify-center px-2 py-3" : "gap-3 px-4 py-3",
            ].join(" ")}
            title={collapsed ? "باز کردن فهرست" : undefined}
          >
            <MdMenuOpen
              size={22}
              className={[
                "transition-transform duration-300",
                collapsed ? "rotate-180" : "",
              ].join(" ")}
            />

            {!collapsed && <span>بستن فهرست</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
