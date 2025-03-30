"use client";

import { useEffect, useState } from "react";
import { MdContentPaste } from "react-icons/md";
import { ContentSection } from "@/types/admin";
import ContentTabs from "@/components/admin/content/ContentTabs";
import ContentDisplay from "@/components/admin/content/ContentDisplay";
import ContentForm from "@/components/admin/content/ContentForm";
import { contentApi } from "@/utils/contentApi";
import toast from "react-hot-toast";

export default function ContentManagement() {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [activeTab, setActiveTab] = useState<"home" | "contact">("home");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // گرفتن دیتا از API در اولین بار
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await contentApi.getAll();
        setSections(data);
      } catch (error: any) {
        toast.error(error.message || "خطا در دریافت محتوای سایت");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // ذخیره تغییرات محتوا
  const handleSave = async (id: string, updatedSection: ContentSection) => {
    const toastId = toast.loading("در حال ذخیره تغییرات...");
    try {
      await contentApi.update(+id, updatedSection);
      setSections((prev) =>
        prev.map((section) =>
          section.id === id ? { ...section, ...updatedSection } : section
        )
      );
      toast.success("تغییرات ذخیره شد", { id: toastId });
      setEditingId(null);
    } catch (error: any) {
      toast.error(error.message || "خطا در ذخیره تغییرات", { id: toastId });
    }
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

      {loading ? (
        <p className="text-center text-gray-500 mt-10">
          در حال بارگذاری محتوا...
        </p>
      ) : (
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
      )}
    </div>
  );
}
