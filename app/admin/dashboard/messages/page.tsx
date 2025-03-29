"use client";

import { useState } from "react";
import { MdDeleteOutline, MdMailOutline } from "react-icons/md";
import momentJalaali from "moment-jalaali";

momentJalaali.loadPersian({
  dialect: "persian-modern",
  usePersianDigits: true,
});

interface Message {
  id: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      name: "محمد رضایی",
      email: "mohammad@example.com",
      content: "سلام، درباره خدماتتون سوال دارم.",
      createdAt: "2025-03-29 12:00",
    },
    {
      id: "2",
      name: "زهرا احمدی",
      email: "zahra@example.com",
      content: "امکان همکاری پروژه‌ای دارید؟",
      createdAt: "2025-03-28 09:30",
    },
  ]);

  const handleDelete = (id: string) => {
    const confirmed = confirm("آیا مطمئنی می‌خوای این پیام حذف بشه؟");
    if (confirmed) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return momentJalaali(dateString).format("jYYYY/jMM/jDD HH:mm");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
          <MdMailOutline size={20} />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">
          پیام‌های دریافتی
        </h1>
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-500 text-sm">هیچ پیامی دریافت نشده است.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-700">{msg.name}</p>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-500 hover:text-red-700"
                  title="حذف پیام"
                >
                  <MdDeleteOutline size={20} />
                </button>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed">
                {msg.content}
              </p>
              <p className="text-xs text-gray-400 text-left">
                {formatDate(msg.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
