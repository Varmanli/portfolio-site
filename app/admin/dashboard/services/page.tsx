"use client";

import axios from "axios";
import { useEffect, useState } from "react";
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

  const fetchServices = async () => {
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
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (service: Service) => {
    toast.custom((t) => (
      <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-gray-100 bg-white text-right shadow-[0_20px_45px_-18px_rgba(15,23,42,0.18),0_8px_18px_-10px_rgba(15,23,42,0.08)]">
        <div className="border-b border-gray-100 bg-red-50/60 px-5 py-4">
          <h3 className="text-sm font-black text-gray-900">حذف خدمت</h3>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            این عملیات قابل بازگشت نیست.
          </p>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm leading-7 text-gray-600">
            آیا از حذف خدمت{" "}
            <span className="font-black text-gray-900">{service.title}</span>{" "}
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

  return (
    <div className="space-y-6 p-4">
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500 text-white shadow-sm shadow-yellow-200">
              <MdBuild size={23} />
            </span>

            <div>
              <h1 className="text-xl font-black text-gray-900">مدیریت خدمات</h1>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                خدمات قابل نمایش در سایت را اضافه، ویرایش یا حذف کنید.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={fetchServices}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
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
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-yellow-200 transition hover:bg-yellow-600"
            >
              <MdAdd size={20} />
              افزودن خدمت
            </button>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4">
              <TableSkeleton variant="row" rows={4} />
            </div>
          ) : services.length > 0 ? (
            <div className="space-y-3">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="group flex flex-col gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-4 transition hover:border-yellow-200 hover:bg-yellow-50/50 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-black text-yellow-700 shadow-sm ring-1 ring-gray-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p className="text-sm font-black text-gray-900">
                        {service.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        شناسه خدمت: {service.id.toLocaleString("fa-IR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(service)}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-blue-50 px-3.5 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
                    >
                      <MdEdit size={18} />
                      ویرایش
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(service)}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-red-50 px-3.5 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      <MdDelete size={18} />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/70 px-6 py-12 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
                <MdBuild size={32} />
              </div>

              <h2 className="text-lg font-black text-gray-900">
                هنوز خدمتی ثبت نشده است
              </h2>

              <p className="mt-2 max-w-md text-sm leading-7 text-gray-500">
                اولین خدمت را اضافه کنید تا در صفحه خدمات سایت نمایش داده شود.
              </p>

              <button
                type="button"
                onClick={openCreateModal}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-yellow-500 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-yellow-200 transition hover:bg-yellow-600"
              >
                <MdAdd size={20} />
                افزودن اولین خدمت
              </button>
            </div>
          )}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full text-right">
          <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
              {editId ? <MdEdit size={22} /> : <MdAdd size={22} />}
            </span>

            <div>
              <h2 className="text-lg font-black text-gray-900">
                {editId ? "ویرایش خدمت" : "افزودن خدمت"}
              </h2>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                عنوان خدمت را کوتاه، واضح و قابل فهم وارد کنید.
              </p>
            </div>
          </div>

          <label className="mb-2 block text-sm font-black text-gray-800">
            عنوان خدمت
          </label>

          <input
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            placeholder="مثلاً طراحی هویت بصری"
            className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddOrEdit();
              }
            }}
          />

          <div className="mt-2 flex justify-end text-xs text-gray-400">
            {currentTitle.length} کاراکتر
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleCloseModal}
              disabled={isSubmitting}
              className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              انصراف
            </button>

            <button
              type="button"
              onClick={handleAddOrEdit}
              disabled={isSubmitting}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-4 py-3 text-sm font-black text-white shadow-sm shadow-yellow-200 transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <MdSave size={18} />
              {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
