"use client";

import { useState, useRef } from "react";
import {
  MdEdit,
  MdContentPaste,
  MdSave,
  MdCloudUpload,
  MdImage,
} from "react-icons/md";
import { RichTextEditor } from "@/components/shared/RichTextEditor";

interface ContentSection {
  id: string;
  type: "home" | "contact";
  title: string;
  content: string;
  isImage?: boolean;
}

export default function ContentManagement() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: "1",
      type: "home",
      title: "معرفی اولیه",
      content: "سلام من ملیکا شمیرانی هستم",
    },
    {
      id: "2",
      type: "home",
      title: "درباره من",
      content: "متن معرفی کوتاه در صفحه اصلی",
    },
    {
      id: "3",
      type: "home",
      title: "عکس پروفایل",
      content: "",
      isImage: true,
    },
    {
      id: "4",
      type: "home",
      title: "متن دکمه",
      content: "مشاهده نمونه کارها",
    },
    {
      id: "5",
      type: "contact",
      title: "توضیحات",
      content: "متن کامل درباره من در صفحه تماس",
    },
    {
      id: "6",
      type: "contact",
      title: "شماره تماس",
      content: "شماره تماس شما",
    },
    {
      id: "7",
      type: "contact",
      title: "ایمیل",
      content: "ایمیل شما",
    },
    {
      id: "8",
      type: "contact",
      title: "محل زندگی",
      content: "آدرس محل زندگی",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"home" | "contact">("home");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleContentChange = (id: string, newContent: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleContentChange(id, base64String);
        setPreviewUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (id: string) => {
    // اینجا می‌توانید عملیات ذخیره‌سازی در دیتابیس را انجام دهید
    setEditingId(null);
    setPreviewUrl(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <MdContentPaste size={24} className="text-yellow-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">مدیریت محتوا</h1>
      </div>

      {/* تب‌های انتخاب بخش */}
      <div className="flex gap-4 border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "home"
              ? "text-yellow-600 border-b-2 border-yellow-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("home")}
        >
          صفحه اصلی
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "contact"
              ? "text-yellow-600 border-b-2 border-yellow-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("contact")}
        >
          تماس با من
        </button>
      </div>

      {/* بخش‌های محتوا */}
      <div className="space-y-6">
        {sections
          .filter((section) => section.type === activeTab)
          .map((section) => (
            <div
              key={section.id}
              className="bg-white p-6 rounded-lg shadow-sm border space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-700">
                  {section.title}
                </h2>
                {editingId !== section.id ? (
                  <button
                    onClick={() => setEditingId(section.id)}
                    className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700"
                  >
                    <MdEdit size={20} />
                    ویرایش
                  </button>
                ) : (
                  <button
                    onClick={() => handleSave(section.id)}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700"
                  >
                    <MdSave size={20} />
                    ذخیره
                  </button>
                )}
              </div>

              {editingId === section.id ? (
                section.isImage ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor={`image-upload-${section.id}`}
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <MdCloudUpload className="w-10 h-10 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              برای آپلود کلیک کنید
                            </span>{" "}
                            یا فایل را بکشید
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG یا GIF (حداکثر 2MB)
                          </p>
                        </div>
                        <input
                          id={`image-upload-${section.id}`}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, section.id)}
                          ref={fileInputRef}
                        />
                      </label>
                    </div>
                    {(previewUrl || section.content) && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          پیش‌نمایش تصویر:
                        </h3>
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                          <img
                            src={previewUrl || section.content}
                            alt="پیش‌نمایش"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <RichTextEditor
                    content={section.content}
                    onChange={(content: string) =>
                      handleContentChange(section.id, content)
                    }
                    placeholder="محتوا را وارد کنید..."
                    className="min-h-[200px]"
                  />
                )
              ) : (
                <div className="bg-gray-50 p-4 rounded-md">
                  {section.isImage ? (
                    section.content ? (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                        <img
                          src={section.content}
                          alt={section.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                        <MdImage className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-gray-500">تصویر آپلود نشده است</p>
                      </div>
                    )
                  ) : (
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
