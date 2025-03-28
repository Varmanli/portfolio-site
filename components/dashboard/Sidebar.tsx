"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "آمار کلی", path: "/admin/dashboard/overview" },
  { name: "نمونه‌کارها", path: "/admin/dashboard/projects" },
  { name: "خدمات", path: "/admin/dashboard/services" },
  { name: "محتوا", path: "/admin/dashboard/content" },
  { name: "پیغام‌ها", path: "/admin/dashboard/messages" },
  { name: "تنظیمات", path: "/admin/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow h-screen p-4">
      <h2 className="text-xl font-bold mb-6 text-center">داشبورد</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded hover:bg-gray-100 transition  text-lg  ${
              pathname === item.path ? "bg-gray-200 font-bold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
