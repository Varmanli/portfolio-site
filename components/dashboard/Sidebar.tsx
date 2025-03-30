"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AiFillSliders } from "react-icons/ai";
import {
  MdDashboard,
  MdWork,
  MdBuild,
  MdArticle,
  MdMessage,
  MdSettings,
  MdMenuOpen,
} from "react-icons/md";

const menuItems = [
  {
    name: "آمار کلی",
    path: "/admin/dashboard/overview",
    icon: <AiFillSliders />,
  },
  { name: "نمونه‌کارها", path: "/admin/dashboard/projects", icon: <MdWork /> },
  { name: "خدمات", path: "/admin/dashboard/services", icon: <MdBuild /> },
  {
    name: "محتوای صفحه اصلی",
    path: "/admin/dashboard/content",
    icon: <MdArticle />,
  },
  { name: "پیام‌ها", path: "/admin/dashboard/messages", icon: <MdMessage /> },
  { name: "تنظیمات", path: "/admin/dashboard/settings", icon: <MdSettings /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="h-screen bg-white shadow-md w-64">
        <div className="py-[12.3px] border-b">
          <div className="flex items-center gap-2 px-4 py-2 text-gray-700 text-base font-semibold">
            <MdDashboard size={20} className="text-gray-700" />
            <span className="whitespace-nowrap text-[15px]">داشبورد</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen bg-white shadow-md transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* header */}
      <div className="py-[12.3px] border-b">
        <div className="flex items-center gap-2 px-4 py-2 text-gray-700 text-base font-semibold">
          <MdDashboard size={collapsed ? 24 : 20} className="text-gray-700" />
          {!collapsed && (
            <span className="whitespace-nowrap text-[15px]">داشبورد</span>
          )}
        </div>
      </div>

      {/* menu items */}
      <nav className="flex-1 px-2 py-4 space-y-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all text-base font-medium ${
                isActive
                  ? "bg-yellow-400 text-black font-semibold"
                  : "text-gray-700 hover:bg-yellow-100"
              }`}
            >
              <span className={`${collapsed ? "text-2xl" : "text-xl"}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="whitespace-nowrap">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* toggle button at bottom */}
      <div className="border-t p-3">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all"
        >
          <span className={`${collapsed ? "text-2xl" : "text-xl"}`}>
            <MdMenuOpen />
          </span>
          {!collapsed && <span>بستن فهرست</span>}
        </button>
      </div>
    </div>
  );
}
