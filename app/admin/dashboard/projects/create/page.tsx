"use client";

import axios from "axios";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Gallery } from "@/components/dashboard/projects/Gallery";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { ProjectFormData } from "@/types/project";
import { generateUniqueId } from "@/utils/id";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CreateProjectPage() {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    caption: "",
    mainImage: null,
    mainPreview: "",
    gallery: [],
    galleryPreviews: [],
    content: "",
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      mainImage: file,
      mainPreview: URL.createObjectURL(file),
    }));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...files],
      galleryPreviews: [
        ...prev.galleryPreviews,
        ...files.map((file) => ({
          id: generateUniqueId(),
          src: URL.createObjectURL(file),
        })),
      ],
    }));
  };

  const handleRemoveImage = (indexToRemove: number) => {
    console.log("Page: Removing image at index:", indexToRemove);
    setFormData((prev) => {
      // Create new arrays without the removed item
      const newGallery = prev.gallery.filter((_, idx) => idx !== indexToRemove);
      const newGalleryPreviews = prev.galleryPreviews.filter(
        (_, idx) => idx !== indexToRemove
      );

      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(prev.galleryPreviews[indexToRemove].src);

      return {
        ...prev,
        gallery: newGallery,
        galleryPreviews: newGalleryPreviews,
      };
    });
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.mainImage) {
      toast.error("عنوان، محتوا و تصویر اصلی الزامی هستند");
      return;
    }

    try {
      toast.loading("در حال ثبت نمونه‌کار...");

      // 🟡 1. آپلود تصویر اصلی
      const mainForm = new FormData();
      mainForm.append("file", formData.mainImage);

      const thumbnailRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
        mainForm,
        {
          withCredentials: true, // 👈 این حتماً باشه
        }
      );
      const thumbnailUrl = thumbnailRes.data.filePath;

      // 🟡 2. ساخت نمونه‌کار
      const portfolioRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/portfolio`,
        {
          title: formData.title,
          slug: formData.title.replace(/\s+/g, "-").toLowerCase(),
          thumbnail: thumbnailUrl,
          shortDesc: formData.caption,
          content: formData.content,
        }
      );

      const portfolioId = portfolioRes.data.id;

      // 🟡 3. آپلود گالری اگر وجود دارد
      if (formData.gallery.length > 0) {
        for (const file of formData.gallery) {
          const galleryForm = new FormData();
          galleryForm.append("file", file);

          const galleryUploadRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
            galleryForm
          );

          const imageUrl = galleryUploadRes.data.filePath;

          // ارسال آدرس به گالری
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, {
            portfolioId,
            imageUrl,
          });
        }
      }

      toast.dismiss();
      toast.success("نمونه‌کار با موفقیت ثبت شد ✅");
      router.push("/admin/dashboard/projects/");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.message || "خطایی رخ داده است");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-yellow-100 text-yellow-600 rounded-full p-2">
          <MdAdd size={20} />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">
          افزودن نمونه‌کار جدید
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            عنوان پروژه
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="مثلاً طراحی فروشگاه آنلاین"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            کپشن کوتاه
          </label>
          <textarea
            rows={2}
            value={formData.caption}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, caption: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="توضیح کوتاه درباره پروژه..."
          />
        </div>

        <ImageUploader
          label="تصویر اصلی پروژه"
          preview={formData.mainPreview}
          onImageChange={handleMainImageChange}
          onPreviewClick={() => {
            setLightboxIndex(0);
            setLightboxOpen(true);
          }}
        />

        <ImageUploader
          label="گالری تصاویر"
          onImageChange={handleGalleryChange}
          multiple
        />

        <Gallery
          items={formData.galleryPreviews}
          onRemove={handleRemoveImage}
          onImageClick={(index) => {
            setLightboxIndex(index + (formData.mainPreview ? 1 : 0));
            setLightboxOpen(true);
          }}
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            محتوای پروژه
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(html) =>
              setFormData((prev) => ({ ...prev, content: html }))
            }
            placeholder="توضیحات کامل پروژه را اینجا بنویسید..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition"
        >
          ثبت نمونه‌کار
        </button>
      </form>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={[
          ...(formData.mainPreview ? [{ src: formData.mainPreview }] : []),
          ...formData.galleryPreviews.map((item) => ({ src: item.src })),
        ]}
      />
    </div>
  );
}
