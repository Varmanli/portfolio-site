"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { portfolioApi } from "@/lib/api/portfolioApi";
import { Portfolio } from "@/types/portfolio";
import toast from "react-hot-toast";
import LoadingOverlay from "@/components/shared/LoadingOverlay";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await portfolioApi.getAll();
      setProjects(data);
    } catch (error) {
      toast.error("خطا در دریافت نمونه‌کارها");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (project: Portfolio) => {
    toast.custom((t) => (
      <div className="bg-white rounded-xl border p-4 shadow-md w-full max-w-sm text-right">
        <p className="text-sm text-gray-700 mb-3">
          آیا از حذف "<span className="font-bold">{project.title}</span>"
          اطمینان دارید؟
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition"
          >
            انصراف
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const toastId = toast.loading(
                `در حال حذف "${project.title}" ...`
              );

              try {
                await portfolioApi.delete(project.id);
                setProjects((prev) => prev.filter((p) => p.id !== project.id));
                toast.success("نمونه‌کار با موفقیت حذف شد", { id: toastId });
              } catch (error) {
                toast.error("خطا در حذف نمونه‌کار", { id: toastId });
              }
            }}
            className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            حذف
          </button>
        </div>
      </div>
    ));
  };

  const getImageUrl = (path: string) => {
    if (!path) return "/images/placeholder.jpg";
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${process.env.NEXT_PUBLIC_API_URL}/${cleanPath}`;
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">نمونه‌کارها</h1>
        <Link
          href="/admin/dashboard/projects/create"
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <MdAdd size={20} />
          <span>افزودن نمونه‌کار</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white flex flex-col justify-between rounded-lg shadow-sm border p-4"
          >
            <div className="relative w-full h-48 mb-4">
              <img
                src={getImageUrl(project.thumbnail)}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {project.shortDesc}
            </p>

            <div className="flex justify-end gap-2">
              <Link
                href={`/admin/dashboard/projects/edit/${project.id}`}
                className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                <MdEdit size={18} />
                <span>ویرایش</span>
              </Link>
              <button
                onClick={() => handleDelete(project)}
                className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <MdDelete size={18} />
                <span>حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">هنوز نمونه‌کاری ثبت نشده است</p>
        </div>
      )}
    </div>
  );
}
