"use client";

import { useState } from "react";
import Link from "next/link";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";

type Project = {
  id: number;
  title: string;
  thumbnail: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "طراحی سایت فروشگاهی",
      thumbnail: "/placeholder.jpg",
    },
    {
      id: 2,
      title: "طراحی لندینگ‌پیج محصول",
      thumbnail: "/placeholder.jpg",
    },
  ]);

  return (
    <div className="p-4 space-y-6">
      {/* هدر و دکمه افزودن */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">نمونه‌کارها</h2>
        <Link
          href="/admin/dashboard/projects/create"
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-medium px-4 py-2 rounded-md transition shadow"
        >
          <MdAdd size={20} />
          <span>افزودن نمونه‌کار</span>
        </Link>
      </div>

      {/* لیست نمونه‌کارها */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-32 sm:h-40 object-cover rounded-md transition"
              />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                <button className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md transition">
                  <MdEdit size={16} />
                  <span className="hidden sm:inline">ویرایش</span>
                </button>
                <button className="flex items-center gap-1 text-sm bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-md transition">
                  <MdDelete size={16} />
                  <span className="hidden sm:inline">حذف</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          هنوز هیچ نمونه‌کاری ثبت نشده است.
        </div>
      )}
    </div>
  );
}
