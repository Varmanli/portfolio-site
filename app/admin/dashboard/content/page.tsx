"use client";

import { useState } from "react";
import { MdContentPaste } from "react-icons/md";
import { ContentSection, ContentData } from "@/types/admin";
import ContentTabs from "@/components/admin/content/ContentTabs";
import ContentDisplay from "@/components/admin/content/ContentDisplay";
import ContentForm from "@/components/admin/content/ContentForm";

/**
 * Content Management Page
 *
 * A page for managing website content including home page and contact information.
 *
 * @returns {JSX.Element} The content management page component
 */
export default function ContentManagement() {
  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: "1",
      contentType: "text",
      sectionType: "home",
      title: "معرفی اولیه",
      content: "سلام من ملیکا شمیرانی هستم",
    },
    {
      id: "2",
      contentType: "text",
      sectionType: "home",
      title: "درباره من",
      content: "متن معرفی کوتاه در صفحه اصلی",
    },
    {
      id: "3",
      contentType: "image",
      sectionType: "home",
      title: "عکس پروفایل",
      content: "",
    },
    {
      id: "4",
      contentType: "text",
      sectionType: "home",
      title: "متن دکمه",
      content: "مشاهده نمونه کارها",
    },
    {
      id: "5",
      contentType: "text",
      sectionType: "contact",
      title: "توضیحات",
      content: "متن کامل درباره من در صفحه تماس",
    },
    {
      id: "6",
      contentType: "text",
      sectionType: "contact",
      title: "شماره تماس",
      content: "شماره تماس شما",
    },
    {
      id: "7",
      contentType: "text",
      sectionType: "contact",
      title: "ایمیل",
      content: "ایمیل شما",
    },
    {
      id: "8",
      contentType: "text",
      sectionType: "contact",
      title: "محل زندگی",
      content: "آدرس محل زندگی",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"home" | "contact">("home");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleContentChange = (id: string, newContent: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  const handleSave = async (id: string, updatedSection: ContentSection) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, ...updatedSection } : section
      )
    );
    setEditingId(null);
  };

  const initialContent: ContentData = {
    title: "",
    content: "",
    contentType: "text",
    sectionType: "home",
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <MdContentPaste size={24} className="text-yellow-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">مدیریت محتوا</h1>
      </div>

      <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="space-y-6">
        {sections
          .filter((section) => section.sectionType === activeTab)
          .map((section) => (
            <div key={section.id}>
              {editingId === section.id ? (
                <ContentForm
                  section={section}
                  onSave={(updatedSection) =>
                    handleSave(section.id, updatedSection)
                  }
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <ContentDisplay
                  section={section}
                  onEdit={() => setEditingId(section.id)}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
