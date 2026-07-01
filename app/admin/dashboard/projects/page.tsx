"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdAdd,
  MdArrowBack,
  MdDelete,
  MdEdit,
  MdImage,
  MdRefresh,
  MdWork,
} from "react-icons/md";
import toast from "react-hot-toast";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { Portfolio } from "@/types/portfolio";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Portfolio[]>("/api/portfolios");
      setProjects(res.data);
    } catch {
      toast.error("خطا در دریافت نمونه‌کارها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = (project: Portfolio) => {
    toast.custom((t) => (
      <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-gray-100 bg-white text-right shadow-[0_20px_45px_-18px_rgba(15,23,42,0.18),0_8px_18px_-10px_rgba(15,23,42,0.08)]">
        <div className="border-b border-gray-100 bg-red-50/60 px-5 py-4">
          <h3 className="text-sm font-black text-gray-900">حذف نمونه‌کار</h3>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            این عملیات قابل بازگشت نیست.
          </p>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm leading-7 text-gray-600">
            آیا از حذف نمونه‌کار{" "}
            <span className="font-black text-gray-900">{project.title}</span>{" "}
            اطمینان دارید؟
          </p>

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
            >
              انصراف
            </button>

            <button
              type="button"
              onClick={async () => {
                toast.dismiss(t.id);

                const toastId = toast.loading(
                  `در حال حذف "${project.title}" ...`,
                );

                try {
                  await axios.delete(`/api/portfolios/${project.id}`);
                  setProjects((prev) =>
                    prev.filter((item) => item.id !== project.id),
                  );
                  toast.success("نمونه‌کار با موفقیت حذف شد", {
                    id: toastId,
                  });
                } catch {
                  toast.error("خطا در حذف نمونه‌کار", { id: toastId });
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600"
            >
              <MdDelete size={17} />
              حذف
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const getImageUrl = (path: string): string => {
    if (!path) return "/images/placeholder.jpg";
    return path;
  };

  return (
    <div className="space-y-6 p-4">
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500 text-white shadow-sm shadow-yellow-200">
                <MdWork size={23} />
              </span>

              <div>
                <h1 className="text-xl font-black text-gray-900">
                  مدیریت نمونه‌کارها
                </h1>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  پروژه‌ها، تصاویر شاخص و توضیحات نمونه‌کارها را از این بخش
                  مدیریت کنید.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={loadProjects}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MdRefresh size={18} className={loading ? "animate-spin" : ""} />
              بروزرسانی
            </button>

            <Link
              href="/admin/dashboard/projects/create"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-yellow-200 transition hover:bg-yellow-600"
            >
              <MdAdd size={20} />
              افزودن نمونه‌کار
            </Link>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} variant="project" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/60 p-3 transition hover:-translate-y-0.5 hover:border-yellow-200 hover:bg-yellow-50/40 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                    <Image
                      src={getImageUrl(project.thumbnail)}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-80" />

                    <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700 shadow-sm backdrop-blur">
                      #{project.id}
                    </div>
                  </div>

                  <div className="px-2 pb-2 pt-4">
                    <h2 className="line-clamp-1 text-base font-black text-gray-900">
                      {project.title}
                    </h2>

                    <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500 line-clamp-2">
                      {project.shortDesc ||
                        "توضیح کوتاهی برای این نمونه‌کار ثبت نشده است."}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <Link
                        href={`/admin/dashboard/projects/edit/${project.id}`}
                        className="inline-flex items-center gap-1.5 rounded-2xl bg-blue-50 px-3.5 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
                      >
                        <MdEdit size={18} />
                        ویرایش
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        className="inline-flex items-center gap-1.5 rounded-2xl bg-red-50 px-3.5 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                      >
                        <MdDelete size={18} />
                        حذف
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/70 px-6 py-12 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
                <MdImage size={32} />
              </div>

              <h2 className="text-lg font-black text-gray-900">
                هنوز نمونه‌کاری ثبت نشده است
              </h2>

              <p className="mt-2 max-w-md text-sm leading-7 text-gray-500">
                اولین نمونه‌کار را اضافه کنید تا در صفحه پورتفولیو نمایش داده
                شود.
              </p>

              <Link
                href="/admin/dashboard/projects/create"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-yellow-500 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-yellow-200 transition hover:bg-yellow-600"
              >
                <MdAdd size={20} />
                افزودن اولین نمونه‌کار
                <MdArrowBack size={18} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
