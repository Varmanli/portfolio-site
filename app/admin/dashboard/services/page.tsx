"use client";

import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

interface Service {
  id: string;
  title: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleAddOrEdit = () => {
    if (editId) {
      // ویرایش
      setServices((prev) =>
        prev.map((s) => (s.id === editId ? { ...s, title: currentTitle } : s))
      );
    } else {
      // افزودن جدید
      setServices((prev) => [
        ...prev,
        { id: Date.now().toString(), title: currentTitle },
      ]);
    }

    setCurrentTitle("");
    setEditId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (service: Service) => {
    setCurrentTitle(service.title);
    setEditId(service.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
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
