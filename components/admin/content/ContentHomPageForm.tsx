"use client";

import axios from "axios";
import {
  AlignRight,
  Eye,
  ImageIcon,
  Loader2,
  Save,
  Type,
  UploadCloud,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import Skeleton from "@/components/skeletons/Skeleton";

type Primitive = string | number | boolean | null | undefined;

interface MainPageFormState {
  home_image_file: File | null;
  home_image_url: string;
  home_title: string;
  home_desc: string;
}

type HomeContentItem = {
  key: string;
  value: string;
};

export default function ContentHomePageForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mainPageForm, setMainPageForm] = useState<MainPageFormState>({
    home_image_file: null,
    home_image_url: "",
    home_title: "",
    home_desc: "",
  });

  const toKeyValueArray = (
    data: Record<string, Primitive>,
    skipKeys: string[] = [],
  ) => {
    return Object.entries(data)
      .filter(([key]) => !skipKeys.includes(key))
      .map(([key, value]) => ({
        key,
        value: String(value ?? ""),
      }));
  };

  const setSelectedFile = useCallback(
    (file: File | null) => {
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("لطفاً فقط فایل تصویر انتخاب کنید");
        return;
      }

      const maxSize = 10 * 1024 * 1024;

      if (file.size > maxSize) {
        toast.error("حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد");
        return;
      }

      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }

      const url = URL.createObjectURL(file);

      setPreviewUrl(url);

      setMainPageForm((prev) => ({
        ...prev,
        home_image_file: file,
      }));
    },
    [previewUrl],
  );

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  };

  const handleRemoveImage = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(undefined);

    setMainPageForm((prev) => ({
      ...prev,
      home_image_file: null,
      home_image_url: "",
    }));

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handlePreviewClick = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data } = await axios.get<HomeContentItem[]>("/api/content");

        const mappedData = data.reduce(
          (acc, item) => {
            acc[item.key] = item.value;
            return acc;
          },
          {} as Record<string, string>,
        );

        setMainPageForm((prev) => ({
          ...prev,
          home_title: mappedData.home_title ?? prev.home_title,
          home_desc: mappedData.home_desc ?? prev.home_desc,
          home_image_url: mappedData.home_image ?? prev.home_image_url,
          home_image_file: null,
        }));

        if (mappedData.home_image) {
          setPreviewUrl(mappedData.home_image);
        }
      } catch (err) {
        toast.error("دریافت اطلاعات اولیه با خطا مواجه شد");
        console.error(err);
      } finally {
        setIsLoadingInitial(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "home_title" || name === "home_desc") {
      setMainPageForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!mainPageForm.home_image_file) {
      return mainPageForm.home_image_url || null;
    }

    const formData = new FormData();

    formData.append("files", mainPageForm.home_image_file);
    formData.append("folder", "content");

    try {
      const res = await axios.post("/api/upload", formData);
      const uploadedUrl: string | undefined = res.data?.[0]?.filePath;

      if (!uploadedUrl) {
        toast.error("آدرس تصویر آپلود شده دریافت نشد");
        return null;
      }

      return uploadedUrl;
    } catch (err) {
      console.error("Error uploading image:", err);

      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data &&
          typeof err.response.data === "object" &&
          "message" in err.response.data
            ? (err.response.data as { message?: string }).message
            : err.message;

        toast.error(`خطا در آپلود عکس: ${message || "خطای ناشناخته"}`);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("خطای ناشناخته در آپلود تصویر");
      }

      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mainPageForm.home_title.trim() || !mainPageForm.home_desc.trim()) {
      toast.error("عنوان و معرفی الزامی هستند");
      return;
    }

    let loadingToastId: string | undefined;

    try {
      setIsSubmitting(true);
      loadingToastId = toast.loading("در حال ذخیره محتوا...");

      const imageUrl = await uploadImage();

      const body = toKeyValueArray({
        home_title: mainPageForm.home_title.trim(),
        home_desc: mainPageForm.home_desc.trim(),
        ...(imageUrl && { home_image: imageUrl }),
      });

      for (const item of body) {
        await axios.post("/api/content", item);
      }

      if (loadingToastId) toast.dismiss(loadingToastId);

      toast.success("محتوای صفحه اصلی با موفقیت ذخیره شد");

      if (imageUrl) {
        setMainPageForm((prev) => ({
          ...prev,
          home_image_url: imageUrl,
          home_image_file: null,
        }));
      }
    } catch (err) {
      if (loadingToastId) toast.dismiss(loadingToastId);

      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data &&
          typeof err.response.data === "object" &&
          "message" in err.response.data
            ? (err.response.data as { message?: string }).message
            : err.message;

        toast.error(message || "خطایی رخ داد");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("خطای ناشناخته‌ای رخ داده است");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingInitial) {
    return (
      <section
        dir="rtl"
        className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]"
      >
        <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
              <ImageIcon className="h-7 w-7" />
            </span>

            <div className="space-y-2">
              <Skeleton className="h-6 w-44 rounded-xl" />
              <Skeleton className="h-4 w-72 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[340px_1fr]">
          <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
            <Skeleton className="aspect-square rounded-3xl" />
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
              <Skeleton className="h-28 rounded-2xl" />
            </div>

            <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
              <Skeleton className="h-44 rounded-2xl" />
            </div>

            <div className="flex justify-end">
              <Skeleton className="h-12 w-40 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]"
    >
      <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:px-6">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
            <ImageIcon className="h-7 w-7" />
          </span>

          <div>
            <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
              محتوای سایت
            </div>

            <h2 className="text-xl font-black leading-9 text-black">
              محتوای صفحه اصلی
            </h2>

            <p className="mt-1 text-sm font-bold leading-7 text-black/55">
              عنوان، معرفی و تصویر اصلی صفحه خانه را از این بخش مدیریت کنید.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[340px_1fr]">
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-3 text-sm font-black text-black">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[3px_3px_0_#111]">
                <ImageIcon className="h-5 w-5" />
              </span>
              تصویر اصلی
            </label>

            {previewUrl && (
              <button
                type="button"
                onClick={handlePreviewClick}
                className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-black bg-white px-3 py-1.5 text-xs font-black text-black shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111]"
              >
                <Eye className="h-3.5 w-3.5" />
                مشاهده
              </button>
            )}
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            className={[
              "group relative aspect-square cursor-pointer overflow-hidden rounded-[1.75rem] border-2 border-dashed outline-none transition",
              previewUrl
                ? "border-black bg-white shadow-[6px_6px_0_#111]"
                : "border-black/35 bg-white hover:border-black hover:bg-[#FFF7D8] hover:shadow-[6px_6px_0_#111]",
              isDragging
                ? "scale-[0.99] border-black bg-[#CAF3AB] shadow-[6px_6px_0_#111]"
                : "",
            ].join(" ")}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleImageInputChange}
              className="hidden"
            />

            {previewUrl ? (
              <>
                <Image
                  src={previewUrl}
                  alt="پیش‌نمایش تصویر اصلی"
                  fill
                  unoptimized
                  sizes="340px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />

                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-2xl border-2 border-black bg-white/95 p-3 text-center shadow-[4px_4px_0_#111] backdrop-blur">
                    <div className="flex items-center justify-center gap-2 text-sm font-black text-black">
                      <UploadCloud className="h-4 w-4" />
                      برای تغییر تصویر کلیک کنید یا فایل را بکشید
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute left-4 top-4 rounded-2xl border-2 border-black bg-white p-2 text-black shadow-[3px_3px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-red-100 hover:text-red-600 hover:shadow-[5px_5px_0_#111]"
                  aria-label="حذف تصویر"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mb-5 rounded-3xl border-2 border-black bg-[#FFE066] p-5 text-black shadow-[4px_4px_0_#111]">
                  <ImageIcon className="h-10 w-10" />
                </div>

                <p className="text-base font-black text-black">
                  تصویر را اینجا رها کنید
                </p>

                <p className="mt-2 text-sm font-bold leading-7 text-black/50">
                  یا کلیک کنید و تصویر مربعی صفحه اصلی را انتخاب کنید.
                </p>

                <div className="mt-5 rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black text-black shadow-[3px_3px_0_#111]">
                  PNG, JPG, WEBP تا ۱۰MB
                </div>
              </div>
            )}
          </div>

          <p className="text-xs font-bold leading-6 text-black/50">
            پیشنهاد: تصویر مربعی با کیفیت بالا آپلود کنید تا در صفحه اصلی تمیزتر
            نمایش داده شود.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
            <label
              htmlFor="home_title"
              className="mb-3 flex items-center gap-3 text-sm font-black text-black"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[3px_3px_0_#111]">
                <Type className="h-5 w-5" />
              </span>
              عنوان
            </label>

            <textarea
              name="home_title"
              id="home_title"
              value={mainPageForm.home_title}
              onChange={handleInputChange}
              placeholder="مثلاً: هر طرح، فرصتی برای روایت یک احساس است"
              className="min-h-28 w-full resize-none rounded-2xl border-2 border-black bg-white px-4 py-3 text-sm font-bold leading-7 text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]"
            />

            <div className="mt-2 flex justify-end text-xs font-bold text-black/45">
              {mainPageForm.home_title.length.toLocaleString("fa-IR")} کاراکتر
            </div>
          </div>

          <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
            <label
              htmlFor="home_desc"
              className="mb-3 flex items-center gap-3 text-sm font-black text-black"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-black bg-[#CAF3AB] text-black shadow-[3px_3px_0_#111]">
                <AlignRight className="h-5 w-5" />
              </span>
              معرفی
            </label>

            <textarea
              name="home_desc"
              id="home_desc"
              value={mainPageForm.home_desc}
              onChange={handleInputChange}
              placeholder="یک معرفی کوتاه و حرفه‌ای برای صفحه اصلی بنویسید..."
              className="min-h-44 w-full resize-none rounded-2xl border-2 border-black bg-white px-4 py-3 text-sm font-bold leading-8 text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]"
            />

            <div className="mt-2 flex justify-end text-xs font-bold text-black/45">
              {mainPageForm.home_desc.length.toLocaleString("fa-IR")} کاراکتر
            </div>
          </div>

          <div className="flex items-center justify-end border-t-2 border-black/10 pt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-w-40 items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#CAF3AB] px-6 py-3 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#111]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  در حال ذخیره...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  ثبت تغییرات
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </form>
  );
}
