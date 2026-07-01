"use client";

import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  MdAdd,
  MdArrowBack,
  MdArticle,
  MdImage,
  MdPhotoLibrary,
  MdSave,
} from "react-icons/md";

import { ImageUploader } from "@/components/ui/ImageUploader";
import { Gallery } from "@/components/dashboard/projects/Gallery";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { ProjectFormData } from "@/types/project";
import { generateUniqueId } from "@/utils/id";

type GalleryPreviewItem = {
  id: string;
  src: string;
  file?: File;
};

export default function CreateProjectPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    caption: "",
    mainImage: null,
    mainPreview: "",
    gallery: [],
    galleryPreviews: [],
    content: "",
  });

  const [galleryItems, setGalleryItems] = useState<GalleryPreviewItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("لطفاً فقط فایل تصویر انتخاب کنید");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("حجم تصویر اصلی نباید بیشتر از ۱۰ مگابایت باشد");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      mainImage: file,
      mainPreview: URL.createObjectURL(file),
    }));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const maxSize = 10 * 1024 * 1024;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`فایل ${file.name} تصویر معتبر نیست`);
        return false;
      }

      if (file.size > maxSize) {
        toast.error(`حجم فایل ${file.name} بیشتر از ۱۰ مگابایت است`);
        return false;
      }

      return true;
    });

    if (!validFiles.length) return;

    const newItems: GalleryPreviewItem[] = validFiles.map((file) => ({
      id: generateUniqueId(),
      src: URL.createObjectURL(file),
      file,
    }));

    setGalleryItems((prev) => [...prev, ...newItems]);

    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...validFiles],
      galleryPreviews: [...prev.galleryPreviews, ...newItems],
    }));
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setGalleryItems((prev) => {
      const item = prev[indexToRemove];

      if (item?.src.startsWith("blob:")) {
        URL.revokeObjectURL(item.src);
      }

      const nextItems = prev.filter((_, index) => index !== indexToRemove);

      setFormData((current) => ({
        ...current,
        gallery: nextItems
          .filter((galleryItem) => galleryItem.file)
          .map((galleryItem) => galleryItem.file as File),
        galleryPreviews: nextItems,
      }));

      return nextItems;
    });
  };

  const lightboxSlides = useMemo(
    () => [
      ...(formData.mainPreview ? [{ src: formData.mainPreview }] : []),
      ...galleryItems.map((item) => ({ src: item.src })),
    ],
    [formData.mainPreview, galleryItems],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("عنوان پروژه الزامی است");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("محتوای پروژه الزامی است");
      return;
    }

    if (!formData.mainImage) {
      toast.error("تصویر اصلی پروژه الزامی است");
      return;
    }

    let toastId: string | undefined;

    try {
      setIsSubmitting(true);
      toastId = toast.loading("در حال ثبت نمونه‌کار...");

      const allImagesForm = new FormData();

      allImagesForm.append("files", formData.mainImage);

      galleryItems.forEach((item) => {
        if (item.file) {
          allImagesForm.append("files", item.file);
        }
      });

      allImagesForm.append("folder", "portfolio");

      const uploadRes = await axios.post("/api/upload", allImagesForm);

      const uploadedImages: { filePath: string }[] = uploadRes.data;

      const thumbnailUrl = uploadedImages?.[0]?.filePath;

      if (!thumbnailUrl) {
        toast.error("آدرس تصویر اصلی دریافت نشد");
        return;
      }

      const portfolioRes = await axios.post("/api/portfolios", {
        title: formData.title.trim(),
        slug: formData.title.trim().replace(/\s+/g, "-").toLowerCase(),
        thumbnail: thumbnailUrl,
        shortDesc: formData.caption.trim(),
        content: formData.content,
      });

      const portfolioId = portfolioRes.data.id;

      const galleryImages = uploadedImages.slice(1);

      if (galleryImages.length > 0) {
        await axios.post(`/api/portfolios/${portfolioId}/gallery`, {
          images: galleryImages.map((img) => img.filePath),
        });
      }

      if (toastId) toast.dismiss(toastId);
      toast.success("نمونه‌کار با موفقیت ثبت شد");

      router.push("/admin/dashboard/projects");
    } catch (error: unknown) {
      if (toastId) toast.dismiss(toastId);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "خطای سرور");
      } else if (error instanceof Error) {
        toast.error(error.message || "خطایی رخ داده است");
      } else {
        toast.error("خطای ناشناخته‌ای رخ داده است");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500 text-white shadow-sm shadow-yellow-200">
              <MdAdd size={23} />
            </span>

            <div>
              <h1 className="text-xl font-black text-gray-900">
                افزودن نمونه‌کار جدید
              </h1>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                اطلاعات پروژه، تصویر شاخص، گالری و محتوای کامل نمونه‌کار را ثبت
                کنید.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin/dashboard/projects")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700"
          >
            بازگشت
            <MdArrowBack size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <MdImage className="text-yellow-600" size={20} />
                  <h2 className="text-sm font-black text-gray-900">
                    تصویر اصلی پروژه
                  </h2>
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

                <p className="mt-3 text-xs leading-6 text-gray-500">
                  تصویر شاخص در کارت نمونه‌کار و صفحه جزئیات نمایش داده می‌شود.
                  بهتر است تصویر باکیفیت و نسبت مناسب انتخاب شود.
                </p>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <MdPhotoLibrary className="text-yellow-600" size={20} />
                  <h2 className="text-sm font-black text-gray-900">
                    گالری تصاویر
                  </h2>
                </div>

                <ImageUploader
                  label="افزودن تصویر به گالری"
                  onImageChange={handleGalleryChange}
                  multiple
                />

                {galleryItems.length > 0 ? (
                  <div className="mt-4">
                    <Gallery
                      items={galleryItems}
                      onRemove={handleRemoveImage}
                      onImageClick={(index) => {
                        setLightboxIndex(
                          index + (formData.mainPreview ? 1 : 0),
                        );
                        setLightboxOpen(true);
                      }}
                    />
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-400">
                    هنوز تصویری برای گالری انتخاب نشده است.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4">
                <label className="mb-2 block text-sm font-black text-gray-800">
                  عنوان پروژه
                </label>

                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                  placeholder="مثلاً طراحی هویت بصری برند"
                />

                <div className="mt-2 flex justify-end text-xs text-gray-400">
                  {formData.title.length} کاراکتر
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4">
                <label className="mb-2 block text-sm font-black text-gray-800">
                  کپشن کوتاه
                </label>

                <textarea
                  rows={3}
                  value={formData.caption}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      caption: e.target.value,
                    }))
                  }
                  className="min-h-28 w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-7 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                  placeholder="یک توضیح کوتاه برای نمایش در کارت نمونه‌کار..."
                />

                <div className="mt-2 flex justify-end text-xs text-gray-400">
                  {formData.caption.length} کاراکتر
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <MdArticle className="text-yellow-600" size={20} />
                  <label className="text-sm font-black text-gray-800">
                    محتوای پروژه
                  </label>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <RichTextEditor
                    value={formData.content}
                    onChange={(html) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: html,
                      }))
                    }
                    placeholder="توضیحات کامل پروژه را اینجا بنویسید..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-w-40 items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-6 py-3 text-sm font-black text-white shadow-sm shadow-yellow-200 transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <MdSave size={20} />
              {isSubmitting ? "در حال ثبت..." : "ثبت نمونه‌کار"}
            </button>
          </div>
        </form>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </div>
  );
}
