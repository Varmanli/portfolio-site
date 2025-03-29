"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/shared/Modal";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { serviceApi } from "@/lib/api/serviceApi";

interface Service {
  id: number;
  title: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await serviceApi.getAll();
      setServices(data);
    } catch (error) {
      toast.error("خطا در دریافت خدمات");
    }
  };

  const handleAddOrEdit = async () => {
    if (!currentTitle.trim()) {
      toast.error("عنوان نمی‌تواند خالی باشد");
      return;
    }

    try {
      if (editId !== null) {
        const updated = await serviceApi.update(editId, {
          title: currentTitle,
        });
        setServices((prev) => prev.map((s) => (s.id === editId ? updated : s)));
        toast.success("خدمت با موفقیت ویرایش شد");
      } else {
        const created = await serviceApi.create({ title: currentTitle });
        setServices((prev) => [created, ...prev]);
        toast.success("خدمت جدید اضافه شد");
      }
      setCurrentTitle("");
      setEditId(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("خطا در ذخیره خدمت");
    }
  };

  const handleEdit = (service: Service) => {
    setCurrentTitle(service.title);
    setEditId(service.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;

    const confirmed = window.confirm(
      `آیا از حذف "${service.title}" اطمینان دارید؟`
    );
    if (!confirmed) return;

    const toastId = toast.loading(`در حال حذف "${service.title}" ...`);
    try {
      await serviceApi.delete(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success("خدمت با موفقیت حذف شد", { id: toastId });
    } catch (error) {
      toast.error("خطا در حذف خدمت", { id: toastId });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-gray-800">مدیریت خدمات</h1>
        <button
          onClick={() => {
            setCurrentTitle("");
            setEditId(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-md transition"
        >
          <MdAdd />
          افزودن خدمت
        </button>
      </div>

      <div className="space-y-4">
        {services.length === 0 && (
          <p className="text-gray-500">هیچ خدمتی ثبت نشده است.</p>
        )}

        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between bg-white shadow rounded-md p-4 border"
          >
            <span className="text-gray-800 font-medium">{service.title}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(service)}
                className="text-blue-600 hover:text-blue-800"
              >
                <MdEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="text-red-600 hover:text-red-800"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">
          {editId ? "ویرایش خدمت" : "افزودن خدمت"}
        </h2>
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          placeholder="عنوان خدمت..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button
          onClick={handleAddOrEdit}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition"
        >
          ذخیره
        </button>
      </Modal>
    </div>
  );
}
