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
      <aside className="sticky top-0 hidden h-screen w-[304px] shrink-0 border-l-2 border-black bg-[#FFFDF5] p-4 lg:block">
        <div className="flex h-full flex-col">
          <div className="mb-4 rounded-[2rem] border-2 border-black bg-white p-5 shadow-[8px_8px_0_#111]">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 animate-pulse rounded-2xl bg-[#FFE066]" />
              <div className="space-y-2">
                <div className="h-5 w-28 animate-pulse rounded-full bg-black/10" />
                <div className="h-3 w-20 animate-pulse rounded-full bg-black/10" />
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 rounded-[2rem] border-2 border-black bg-white p-3 shadow-[8px_8px_0_#111]">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[74px] animate-pulse rounded-[1.5rem] border-2 border-black bg-[#FFF7D8] shadow-[3px_3px_0_#111]"
              />
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={[
        "sticky top-0 hidden h-screen shrink-0 border-l-2 border-black bg-[#FFFDF5] p-4 transition-all duration-300 lg:block",
        collapsed ? "w-[104px]" : "w-[304px]",
      ].join(" ")}
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[8px_8px_0_#111]">
          <div
            className={[
              "relative overflow-hidden bg-[#FFF7D8] transition-all",
              collapsed ? "p-3" : "p-5",
            ].join(" ")}
          >
            <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#F196E5]/35 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 right-8 h-24 w-24 rounded-full bg-[#CAF3AB]/55 blur-2xl" />

            <div
              className={[
                "relative z-10 flex items-center",
                collapsed ? "justify-center" : "gap-3",
              ].join(" ")}
            >
              {!collapsed && (
                <div className="min-w-0">
                  <h1 className="text-lg font-black text-black">پنل مدیریت</h1>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav
          className={[
            "flex-1 overflow-y-auto rounded-[2rem] border-2 border-black bg-white shadow-[8px_8px_0_#111]",
            collapsed ? "space-y-3 p-2" : "space-y-3 p-3",
          ].join(" ")}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                title={collapsed ? item.name : undefined}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "group relative flex items-center overflow-hidden rounded-[1.5rem] border-2 border-black transition",
                  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]",
                  collapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-3",
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

                {!collapsed && (
                  <>
                    <span className="relative z-10 min-w-0 flex-1">
                      <span className="block text-sm font-black text-black">
                        {item.name}
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
                  </>
                )}

                {collapsed && isActive && (
                  <span className="absolute right-1 top-1/2 h-8 w-1.5 -translate-y-1/2 rounded-full border border-black bg-[#F196E5]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 space-y-3">
          {!collapsed && (
            <div className="rounded-[2rem] border-2 border-black bg-white p-4 shadow-[8px_8px_0_#111]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-black/45">
                    وضعیت سیستم
                  </p>
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
          )}

          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className={[
              "flex w-full items-center rounded-2xl border-2 border-black bg-white text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#FFF7D8] hover:shadow-[6px_6px_0_#111]",
              collapsed ? "justify-center px-2 py-3" : "gap-3 px-4 py-3",
            ].join(" ")}
            title={collapsed ? "باز کردن فهرست" : undefined}
            aria-label={collapsed ? "باز کردن فهرست" : "بستن فهرست"}
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
