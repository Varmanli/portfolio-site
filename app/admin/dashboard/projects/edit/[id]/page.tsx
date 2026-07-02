"use client";

import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  MdArrowBack,
  MdArticle,
  MdEdit,
  MdPhotoLibrary,
  MdSave,
} from "react-icons/md";

import { ImageUploader } from "@/components/ui/ImageUploader";
import { Gallery } from "@/components/dashboard/projects/Gallery";
import RichTextEditor from "@/components/shared/RichTextEditor";
import Skeleton from "@/components/skeletons/Skeleton";
import { GalleryImage, ProjectFormData } from "@/types/project";
import { generateUniqueId } from "@/utils/id";

type GalleryPreviewItem = {
  id: string;
  src: string;
  file?: File;
};

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const projectId = String(params.id ?? "");

  const getImageUrl = (path: string | null | undefined) => {
    if (!path) return "";
    if (path.startsWith("blob:")) return path;
    return path;
  };

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { data } = await axios.get(`/api/portfolios/${projectId}`);

        const mappedGallery: GalleryPreviewItem[] = data.gallery.map(
          (item: GalleryImage) => ({
            id: String(item.id),
            src: getImageUrl(item.imageUrl),
          }),
        );

        setFormData({
          title: data.title || "",
          caption: data.shortDesc || "",
          mainImage: null,
          mainPreview: getImageUrl(data.thumbnail),
          gallery: [],
          galleryPreviews: mappedGallery,
          content: data.content || "",
        });

        setGalleryItems(mappedGallery);
      } catch {
        toast.error("خطا در دریافت اطلاعات نمونه‌کار");
        router.push("/admin/dashboard/projects");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) loadProject();
  }, [projectId, router]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("لطفاً فقط فایل تصویر انتخاب کنید");
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

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`فایل ${file.name} تصویر معتبر نیست`);
        return false;
      }

      return true;
    });

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

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("عنوان و محتوا الزامی هستند");
      return;
    }

    let toastId: string | undefined;

    try {
      setIsSubmitting(true);
      toastId = toast.loading("در حال بروزرسانی نمونه‌کار...");

      let thumbnailUrl = formData.mainPreview;

      if (formData.mainPreview.startsWith("blob:")) {
        const mainImageForm = new FormData();

        if (!formData.mainImage) {
          toast.error("تصویر اصلی معتبر نیست");
          return;
        }

        mainImageForm.append("files", formData.mainImage);
        mainImageForm.append("folder", "portfolio");

        const mainUploadRes = await axios.post("/api/upload", mainImageForm);
        const mainUploadedImage = mainUploadRes.data?.[0];

        if (mainUploadedImage?.filePath) {
          thumbnailUrl = mainUploadedImage.filePath;
        }
      }

      let galleryUrls = galleryItems
        .filter((item) => !item.src.startsWith("blob:"))
        .map((item) => item.src);

      const newGalleryFiles = galleryItems
        .filter((item) => item.src.startsWith("blob:") && item.file)
        .map((item) => item.file as File);

      if (newGalleryFiles.length > 0) {
        const galleryForm = new FormData();

        newGalleryFiles.forEach((file) => {
          galleryForm.append("files", file);
        });

        galleryForm.append("folder", "portfolio");

        const galleryUploadRes = await axios.post("/api/upload", galleryForm);

        const newGalleryUrls = galleryUploadRes.data.map(
          (img: { filePath: string }) => img.filePath,
        );

        galleryUrls = [...galleryUrls, ...newGalleryUrls];
      }

      const updateData = {
        title: formData.title.trim(),
        slug: formData.title.trim().replace(/\s+/g, "-").toLowerCase(),
        thumbnail: thumbnailUrl,
        shortDesc: formData.caption.trim(),
        content: formData.content,
      };

      await axios.patch(`/api/portfolios/${projectId}`, updateData);

      await axios.patch(`/api/portfolios/${projectId}/gallery`, {
        images: galleryUrls,
      });

      if (toastId) toast.dismiss(toastId);

      toast.success("نمونه‌کار با موفقیت بروزرسانی شد");
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

  if (loading) {
    return (
      <main
        dir="rtl"
        className="relative min-h-screen overflow-hidden bg-[#FFFDF5] px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="pointer-events-none absolute right-10 top-10 h-52 w-52 rounded-full bg-[#F196E5]/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-16 left-10 h-64 w-64 rounded-full bg-[#CAF3AB]/50 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-32 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]">
            <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:px-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
                  <MdEdit size={28} />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-6 w-44 rounded-xl" />
                  <Skeleton className="h-4 w-72 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[340px_1fr]">
              <div className="space-y-6">
                <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                  <Skeleton className="aspect-square rounded-3xl" />
                </div>

                <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                  <Skeleton className="h-36 rounded-3xl" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                  <Skeleton className="h-20 rounded-2xl" />
                </div>

                <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                  <Skeleton className="h-28 rounded-2xl" />
                </div>

                <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                  <Skeleton className="h-72 rounded-3xl" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#FFFDF5] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute right-10 top-10 h-52 w-52 rounded-full bg-[#F196E5]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-10 h-64 w-64 rounded-full bg-[#CAF3AB]/50 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]">
          <div className="flex flex-col gap-5 border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
                <MdEdit size={28} />
              </span>

              <div>
                <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                  ویرایش پورتفولیو
                </div>

                <h1 className="text-xl font-black leading-9 text-black sm:text-2xl">
                  ویرایش نمونه‌کار
                </h1>

                <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                  اطلاعات پروژه، تصویر شاخص، گالری و محتوای کامل نمونه‌کار را
                  ویرایش کنید.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/admin/dashboard/projects")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-white px-4 py-2.5 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111]"
            >
              بازگشت
              <MdArrowBack size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
              <div className="space-y-6">
                <section className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                  <div className="overflow-hidden rounded-3xl border-2 border-black bg-[#FFF7D8] p-2">
                    <ImageUploader
                      label="تصویر اصلی پروژه"
                      preview={formData.mainPreview}
                      onImageChange={handleMainImageChange}
                      onPreviewClick={() => {
                        setLightboxIndex(0);
                        setLightboxOpen(true);
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs font-bold leading-6 text-black/50">
                    پیشنهاد: تصویر شاخص را با نسبت مناسب و کیفیت بالا انتخاب
                    کنید تا در کارت نمونه‌کارها بهتر نمایش داده شود.
                  </p>
                </section>

                <section className="rounded-[1.75rem] border-2 border-black bg-[#CAF3AB] p-4 shadow-[6px_6px_0_#111]">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-white text-black shadow-[3px_3px_0_#111]">
                      <MdPhotoLibrary size={23} />
                    </span>

                    <div>
                      <h2 className="text-sm font-black text-black">
                        گالری تصاویر
                      </h2>
                      <p className="mt-1 text-xs font-bold text-black/50">
                        تصاویر تکمیلی نمونه‌کار
                      </p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-3xl border-2 border-black bg-white p-2">
                    <ImageUploader
                      label="افزودن تصویر به گالری"
                      onImageChange={handleGalleryChange}
                      multiple
                    />
                  </div>

                  {galleryItems.length > 0 ? (
                    <div className="mt-4 rounded-3xl border-2 border-black bg-white p-3 shadow-[4px_4px_0_#111]">
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
                    <div className="mt-4 rounded-2xl border-2 border-dashed border-black/30 bg-white px-4 py-6 text-center text-sm font-bold text-black/45">
                      هنوز تصویری برای گالری ثبت نشده است.
                    </div>
                  )}
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                  <label className="mb-2 block text-sm font-black text-black">
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
                    className="h-13 w-full rounded-2xl border-2 border-black bg-white px-4 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]"
                    placeholder="مثلاً طراحی هویت بصری برند"
                  />

                  <div className="mt-2 flex justify-end text-xs font-bold text-black/45">
                    {formData.title.length.toLocaleString("fa-IR")} کاراکتر
                  </div>
                </section>

                <section className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                  <label className="mb-2 block text-sm font-black text-black">
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
                    className="min-h-28 w-full resize-none rounded-2xl border-2 border-black bg-white px-4 py-3 text-sm font-bold leading-7 text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]"
                    placeholder="یک توضیح کوتاه برای نمایش در کارت نمونه‌کار..."
                  />

                  <div className="mt-2 flex justify-end text-xs font-bold text-black/45">
                    {formData.caption.length.toLocaleString("fa-IR")} کاراکتر
                  </div>
                </section>

                <section className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[3px_3px_0_#111]">
                      <MdArticle size={23} />
                    </span>

                    <div>
                      <label className="text-sm font-black text-black">
                        محتوای پروژه
                      </label>
                      <p className="mt-1 text-xs font-bold text-black/45">
                        توضیحات کامل، روند طراحی و جزئیات پروژه
                      </p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0_#111]">
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
                </section>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end border-t-2 border-black/10 pt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-w-48 items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#CAF3AB] px-6 py-3 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#111]"
              >
                <MdSave size={20} />
                {isSubmitting ? "در حال بروزرسانی..." : "بروزرسانی نمونه‌کار"}
              </button>
            </div>
          </form>
        </section>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </main>
  );
}
