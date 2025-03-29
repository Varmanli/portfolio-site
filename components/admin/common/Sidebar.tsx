"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdSettings,
  MdMessage,
  MdContentPaste,
} from "react-icons/md";

const menuItems = [
  {
    title: "داشبورد",
    icon: <MdDashboard size={24} />,
    href: "/admin/dashboard",
  },
  {
    title: "مدیریت محتوا",
    icon: <MdContentPaste size={24} />,
    href: "/admin/dashboard/content",
  },
  {
    title: "پیام‌ها",
    icon: <MdMessage size={24} />,
    href: "/admin/dashboard/messages",
  },
  {
    title: "تنظیمات",
    icon: <MdSettings size={24} />,
    href: "/admin/dashboard/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-l border-gray-200 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">پنل مدیریت</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-yellow-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
