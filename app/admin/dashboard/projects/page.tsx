"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get<Portfolio[]>("/api/portfolios");
      setProjects(res.data);
    } catch {
      toast.error("خطا در دریافت نمونه‌کارها");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleDelete = (project: Portfolio) => {
    toast.custom((t) => (
      <div
        dir="rtl"
        className="w-full max-w-sm overflow-hidden rounded-[1.75rem] border-2 border-black bg-white text-right shadow-[8px_8px_0_#111]"
      >
        <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-red-100 text-red-600 shadow-[3px_3px_0_#111]">
              <MdDelete size={22} />
            </span>

            <div>
              <h3 className="text-sm font-black text-black">حذف نمونه‌کار</h3>
              <p className="mt-1 text-xs font-bold leading-5 text-black/50">
                این عملیات قابل بازگشت نیست.
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm font-bold leading-7 text-black/65">
            آیا از حذف نمونه‌کار{" "}
            <span className="font-black text-black">{project.title}</span>{" "}
            اطمینان دارید؟
          </p>

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="rounded-2xl border-2 border-black bg-white px-4 py-2 text-sm font-black text-black shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]"
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
              className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-black bg-red-500 px-4 py-2 text-sm font-black text-white shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]"
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
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#FFFDF5] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute right-10 top-10 h-52 w-52 rounded-full bg-[#F196E5]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-10 h-64 w-64 rounded-full bg-[#CAF3AB]/50 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]">
          <div className="flex flex-col gap-5 border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
                <MdWork size={28} />
              </span>

              <div>
                <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                  مدیریت پورتفولیو
                </div>

                <h1 className="text-xl font-black leading-9 text-black sm:text-2xl">
                  مدیریت نمونه‌کارها
                </h1>

                <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                  پروژه‌ها، تصاویر شاخص و توضیحات نمونه‌کارها را از این بخش
                  مدیریت کنید.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={loadProjects}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-white px-4 py-2.5 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#111]"
              >
                <MdRefresh
                  size={18}
                  className={loading ? "animate-spin" : ""}
                />
                بروزرسانی
              </button>

              <Link
                href="/admin/dashboard/projects/create"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#CAF3AB] px-5 py-2.5 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111]"
              >
                <MdAdd size={20} />
                افزودن نمونه‌کار
              </Link>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-[1.75rem] border-2 border-black bg-white p-3 shadow-[6px_6px_0_#111]"
                  >
                    <CardSkeleton variant="project" />
                  </div>
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="group overflow-hidden rounded-[1.75rem] border-2 border-black bg-white p-3 shadow-[6px_6px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border-2 border-black bg-gray-100">
                      <Image
                        src={getImageUrl(project.thumbnail)}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80" />

                      <div className="absolute bottom-3 right-3 rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black text-black shadow-[3px_3px_0_#111]">
                        #{project.id.toLocaleString("fa-IR")}
                      </div>

                      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black opacity-0 shadow-[3px_3px_0_#111] transition group-hover:opacity-100">
                        <MdImage size={22} />
                      </div>
                    </div>

                    <div className="px-2 pb-2 pt-4">
                      <h2 className="line-clamp-1 text-base font-black text-black">
                        {project.title}
                      </h2>

                      <p className="mt-2 min-h-12 line-clamp-2 text-sm font-bold leading-7 text-black/55">
                        {project.shortDesc ||
                          "توضیح کوتاهی برای این نمونه‌کار ثبت نشده است."}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-2 border-t-2 border-black/10 pt-4">
                        <Link
                          href={`/admin/dashboard/projects/edit/${project.id}`}
                          className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-black bg-sky-100 px-3.5 py-2 text-sm font-black text-black shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]"
                        >
                          <MdEdit size={18} />
                          ویرایش
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(project)}
                          className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-black bg-red-100 px-3.5 py-2 text-sm font-black text-red-600 shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]"
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
              <div className="flex min-h-80 flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-black/30 bg-[#FFF7D8] px-6 py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-black bg-white text-black shadow-[4px_4px_0_#111]">
                  <MdImage size={32} />
                </div>

                <h2 className="text-lg font-black text-black">
                  هنوز نمونه‌کاری ثبت نشده است
                </h2>

                <p className="mt-2 max-w-md text-sm font-bold leading-7 text-black/55">
                  اولین نمونه‌کار را اضافه کنید تا در صفحه پورتفولیو نمایش داده
                  شود.
                </p>

                <Link
                  href="/admin/dashboard/projects/create"
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-[#CAF3AB] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111]"
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
    </main>
  );
}
