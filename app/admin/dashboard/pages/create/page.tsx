"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/shared/RichTextEditor";
import { MdAdd } from "react-icons/md";

export default function CreatePage() {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Page content:", content);
    alert("صفحه ثبت شد (فعلاً فقط لاگ شد)");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-yellow-100 text-yellow-600 rounded-full p-2">
          <MdAdd size={20} />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">
          افزودن صفحه جدید
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            عنوان صفحه
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="مثلاً درباره ما"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            محتوای صفحه
          </label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="محتوای صفحه را اینجا بنویسید..."
            className="min-h-[400px]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition"
        >
          ثبت صفحه
        </button>
      </form>
    </div>
  );
}
