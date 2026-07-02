"use client";

import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MdAdd,
  MdBuild,
  MdDelete,
  MdEdit,
  MdRefresh,
  MdSave,
} from "react-icons/md";
import toast from "react-hot-toast";

import Modal from "@/components/shared/Modal";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

interface Service {
  id: number;
  title: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const titleInputRef = useRef<HTMLInputElement | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<Service[]>("/api/services");
      setServices(res.data);
    } catch (err) {
      toast.error("خطا در دریافت خدمات");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (!isModalOpen) return;

    const focusTimer = window.setTimeout(() => {
      titleInputRef.current?.focus();
      titleInputRef.current?.setSelectionRange(
        titleInputRef.current.value.length,
        titleInputRef.current.value.length,
      );
    }, 80);

    return () => window.clearTimeout(focusTimer);
  }, [isModalOpen, editId]);

  const openCreateModal = () => {
    setCurrentTitle("");
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setCurrentTitle(service.title);
    setEditId(service.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    setCurrentTitle("");
    setEditId(null);
  };

  const handleAddOrEdit = async () => {
    const title = currentTitle.trim();

    if (!title) {
      toast.error("عنوان نمی‌تواند خالی باشد");
      titleInputRef.current?.focus();
      return;
    }

    try {
      setIsSubmitting(true);

      if (editId !== null) {
        const { data: updated } = await axios.patch<Service>(
          `/api/services/${editId}`,
          { title },
        );

        setServices((prev) =>
          prev.map((service) => (service.id === editId ? updated : service)),
        );

        toast.success("خدمت با موفقیت ویرایش شد");
      } else {
        const { data: created } = await axios.post<Service>("/api/services", {
          title,
        });

        setServices((prev) => [created, ...prev]);
        toast.success("خدمت جدید اضافه شد");
      }

      setCurrentTitle("");
      setEditId(null);
      setIsModalOpen(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "خطا در ذخیره خدمت");
      } else {
        toast.error("خطا در ذخیره خدمت");
      }

      console.error(err);
      titleInputRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (service: Service) => {
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
              <h3 className="text-sm font-black text-black">حذف خدمت</h3>
              <p className="mt-1 text-xs font-bold leading-5 text-black/50">
                این عملیات قابل بازگشت نیست.
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm font-bold leading-7 text-black/65">
            آیا از حذف خدمت{" "}
            <span className="font-black text-black">{service.title}</span>{" "}
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
                  `در حال حذف "${service.title}" ...`,
                );

                try {
                  await axios.delete(`/api/services/${service.id}`);

                  setServices((prev) =>
                    prev.filter((item) => item.id !== service.id),
                  );

                  toast.success("خدمت با موفقیت حذف شد", { id: toastId });
                } catch (err) {
                  toast.error("خطا در حذف خدمت", { id: toastId });
                  console.error(err);
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
                <MdBuild size={28} />
              </span>

              <div>
                <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                  مدیریت محتوا
                </div>

                <h1 className="text-xl font-black leading-9 text-black sm:text-2xl">
                  مدیریت خدمات
                </h1>

                <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                  خدمات قابل نمایش در سایت را اضافه، ویرایش یا حذف کنید.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={fetchServices}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-white px-4 py-2.5 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#111]"
              >
                <MdRefresh
                  size={18}
                  className={isLoading ? "animate-spin" : ""}
                />
                بروزرسانی
              </button>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#CAF3AB] px-5 py-2.5 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111]"
              >
                <MdAdd size={20} />
                افزودن خدمت
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {isLoading ? (
              <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                <TableSkeleton variant="row" rows={4} />
              </div>
            ) : services.length > 0 ? (
              <div className="space-y-4">
                {services.map((service, index) => (
                  <article
                    key={service.id}
                    className="group flex flex-col gap-4 rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-sm font-black text-black shadow-[3px_3px_0_#111]">
                        {(index + 1).toLocaleString("fa-IR", {
                          minimumIntegerDigits: 2,
                        })}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-base font-black text-black">
                          {service.title}
                        </p>
                        <p className="mt-1 text-xs font-bold text-black/45">
                          شناسه خدمت: {service.id.toLocaleString("fa-IR")}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(service)}
                        className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-black bg-sky-100 px-3.5 py-2 text-sm font-black text-black shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]"
                      >
                        <MdEdit size={18} />
                        ویرایش
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(service)}
                        className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-black bg-red-100 px-3.5 py-2 text-sm font-black text-red-600 shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]"
                      >
                        <MdDelete size={18} />
                        حذف
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-black/30 bg-[#FFF7D8] px-6 py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-black bg-white text-black shadow-[4px_4px_0_#111]">
                  <MdBuild size={32} />
                </div>

                <h2 className="text-lg font-black text-black">
                  هنوز خدمتی ثبت نشده است
                </h2>

                <p className="mt-2 max-w-md text-sm font-bold leading-7 text-black/55">
                  اولین خدمت را اضافه کنید تا در صفحه خدمات سایت نمایش داده شود.
                </p>

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-[#CAF3AB] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111]"
                >
                  <MdAdd size={20} />
                  افزودن اولین خدمت
                </button>
              </div>
            )}
          </div>
        </section>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div dir="rtl" className="w-full text-right">
            <div className="mb-5 flex items-start gap-3 border-b-2 border-black pb-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[3px_3px_0_#111]">
                {editId ? <MdEdit size={24} /> : <MdAdd size={24} />}
              </span>

              <div>
                <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-3 py-1 text-[11px] font-black text-white shadow-[2px_2px_0_#111]">
                  {editId ? "ویرایش آیتم" : "آیتم جدید"}
                </div>

                <h2 className="text-lg font-black text-black">
                  {editId ? "ویرایش خدمت" : "افزودن خدمت"}
                </h2>

                <p className="mt-1 text-xs font-bold leading-6 text-black/50">
                  عنوان خدمت را کوتاه، واضح و قابل فهم وارد کنید.
                </p>
              </div>
            </div>

            <label
              htmlFor="service-title"
              className="mb-2 block text-sm font-black text-black"
            >
              عنوان خدمت
            </label>

            <input
              ref={titleInputRef}
              id="service-title"
              type="text"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              placeholder="مثلاً طراحی هویت بصری"
              disabled={isSubmitting}
              className="h-13 w-full rounded-2xl border-2 border-black bg-white px-4 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111] disabled:cursor-not-allowed disabled:opacity-60"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddOrEdit();
                }

                if (e.key === "Escape") {
                  e.preventDefault();
                  handleCloseModal();
                }
              }}
            />

            <div className="mt-2 flex justify-end text-xs font-bold text-black/45">
              {currentTitle.length.toLocaleString("fa-IR")} کاراکتر
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="flex-1 rounded-2xl border-2 border-black bg-white px-4 py-3 text-sm font-black text-black shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_#111]"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={handleAddOrEdit}
                disabled={isSubmitting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#CAF3AB] px-4 py-3 text-sm font-black text-black shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_#111]"
              >
                <MdSave size={18} />
                {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}
