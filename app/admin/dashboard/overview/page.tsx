"use client";

import { MdMessage, MdBuild, MdWork, MdAddCircleOutline } from "react-icons/md";
import Link from "next/link";

export default function OverviewPage() {
  const stats = [
    {
      label: "پیام‌ها",
      value: 2,
      icon: <MdMessage size={22} />,
    },
    {
      label: "خدمات",
      value: 5,
      icon: <MdBuild size={22} />,
    },
    {
      label: "نمونه‌کارها",
      value: 12,
      icon: <MdWork size={22} />,
    },
  ];

  const quickActions = [
    {
      label: "ویرایش محتوا",
      href: "/admin/dashboard/content",
    },
    {
      label: "افزودن خدمت",
      href: "/admin/dashboard/services",
    },
    {
      label: "افزودن نمونه‌کار",
      href: "/admin/dashboard/projects",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* آمار کلی */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              {/* عنوان بالا */}
              <p className="text-gray-500 text-lg font-semibold ">
                {item.label}
              </p>
              <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full">
                {item.icon}
              </div>
            </div>
            {/* عدد و آیکون در یک ردیف */}
            <div className="flex justify-center items-center mt-5">
              <p className="text-4xl font-extrabold text-gray-800 text-center">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* میانبر سریع */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          میانبر سریع
        </h3>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-sm px-4 py-2 rounded-md shadow font-medium transition"
            >
              <MdAddCircleOutline size={18} />
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
