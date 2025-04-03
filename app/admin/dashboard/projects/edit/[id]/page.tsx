"use client";

import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Gallery } from "@/components/dashboard/projects/Gallery";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { Portfolio, GalleryImage, ProjectFormData } from "@/types/project";
import { generateUniqueId } from "@/utils/id";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import axios from "axios";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);

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

  // تابع کمکی برای ساخت URL تصویر
  const getImageUrl = (path: string | null | undefined) => {
    if (!path) return "";

    // اگر path یک blob باشد
    if (path.startsWith("blob:")) return path;

    // اگر path یک URL کامل باشد
    if (path.startsWith("http")) return path;

    // اگر path با /uploads شروع میشه
    if (path.startsWith("/uploads")) {
      return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
    }

    // در غیر این صورت /uploads/ رو اضافه کن
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${path}`;
  };

  // لود اطلاعات اولیه از API
  useEffect(() => {
    const loadProject = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/portfolio/${params.id}`,
          {
            withCredentials: true,
          }
        );

        setFormData({
          title: data.title || "",
          caption: data.shortDesc || "",
          mainImage: null,
          mainPreview: getImageUrl(data.thumbnail),
          gallery: [],
          galleryPreviews: data.gallery.map((item: GalleryImage) => ({
            id: String(item.id),
            src: getImageUrl(item.imageUrl),
          })),
          content: data.content || "",
        });
      } catch (error) {
        toast.error("خطا در دریافت اطلاعات نمونه‌کار");
        router.push("/admin/dashboard/projects");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) loadProject();
  }, [params.id, router]);

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
    setFormData((prev) => {
      const newGallery = prev.gallery.filter((_, idx) => idx !== indexToRemove);
      const newGalleryPreviews = prev.galleryPreviews.filter(
        (_, idx) => idx !== indexToRemove
      );

      // اگر تصویر جدید آپلود شده بود، URL رو revoke کنیم
      if (prev.gallery[indexToRemove]) {
        URL.revokeObjectURL(prev.galleryPreviews[indexToRemove].src);
      }

      return {
        ...prev,
        gallery: newGallery,
        galleryPreviews: newGalleryPreviews,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("عنوان و محتوا الزامی هستند");
      return;
    }

    try {
      const loadingToast = toast.loading("در حال بروزرسانی نمونه‌کار...");

      const updateData: any = {
        title: formData.title,
        shortDesc: formData.caption,
        content: formData.content,
      };

      if (formData.mainImage) {
        const mainForm = new FormData();
        mainForm.append("file", formData.mainImage);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
          mainForm
        );
        updateData.thumbnail = data.filePath;
      }

      const existingGalleryUrls = formData.galleryPreviews
        .filter((preview) => !preview.src.startsWith("blob:"))
        .map((preview) =>
          preview.src.replace(`${process.env.NEXT_PUBLIC_API_URL}/uploads/`, "")
        );

      const newGalleryUrls = await Promise.all(
        formData.gallery.map(async (file) => {
          const form = new FormData();
          form.append("file", file);
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
            form
          );
          return data.filePath;
        })
      );

      if (existingGalleryUrls.length > 0 || newGalleryUrls.length > 0) {
        updateData.gallery = [...existingGalleryUrls, ...newGalleryUrls];
      }

      updateData.slug = formData.title.replace(/\s+/g, "-").toLowerCase();

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/portfolio/${params.id}`,
        updateData
      );

      toast.dismiss(loadingToast);
      toast.success("نمونه‌کار با موفقیت بروزرسانی شد");
      router.push("/admin/dashboard/projects");
    } catch (err) {
      toast.error("خطا در بروزرسانی نمونه‌کار");
    }
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-yellow-100 text-yellow-600 rounded-full p-2">
          <MdEdit size={20} />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">
          ویرایش نمونه‌کار
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
          بروزرسانی نمونه‌کار
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
