"use client";

import axios from "axios";
import {
  ImageIcon,
  UploadCloud,
  X,
  Eye,
  Loader2,
  Type,
  AlignRight,
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

  const setSelectedFile = useCallback((file: File | null) => {
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

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    setMainPageForm((prev) => ({
      ...prev,
      home_image_file: file,
    }));
  }, []);

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleRemoveImage = () => {
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
      window.open(previewUrl, "_blank");
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
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <Skeleton className="mb-8 h-6 w-40" rounded="full" />
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <Skeleton className="aspect-square" rounded="3xl" />
          <div className="space-y-6">
            <Skeleton className="h-28" rounded="2xl" />
            <Skeleton className="h-44" rounded="2xl" />
            <Skeleton className="ms-auto h-11 w-32" rounded="xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5">
        <h2 className="text-lg font-bold text-gray-900">محتوای صفحه اصلی</h2>
        <p className="mt-1 text-sm text-gray-500">
          عنوان، معرفی و تصویر اصلی صفحه خانه را از این بخش مدیریت کنید.
        </p>
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-[340px_1fr]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-800">
              تصویر اصلی
            </label>

            {previewUrl && (
              <button
                type="button"
                onClick={handlePreviewClick}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-yellow-300 hover:text-yellow-700"
              >
                <Eye className="h-3.5 w-3.5" />
                مشاهده
              </button>
            )}
          </div>

          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={[
              "group relative aspect-square cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-200",
              previewUrl
                ? "border-gray-200 bg-gray-50"
                : "border-gray-200 bg-gradient-to-br from-gray-50 to-white",
              isDragging
                ? "scale-[0.99] border-yellow-400 bg-yellow-50"
                : "hover:border-yellow-300 hover:bg-yellow-50/40",
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
                  <div className="rounded-2xl bg-white/95 p-3 text-center shadow-lg backdrop-blur">
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-800">
                      <UploadCloud className="h-4 w-4 text-yellow-600" />
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
                  className="absolute left-4 top-4 rounded-full bg-white/95 p-2 text-gray-600 shadow-md transition hover:bg-red-50 hover:text-red-600"
                  aria-label="حذف تصویر"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mb-5 rounded-3xl bg-yellow-100 p-5 text-yellow-700">
                  <ImageIcon className="h-10 w-10" />
                </div>

                <p className="text-base font-bold text-gray-800">
                  تصویر را اینجا رها کنید
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  یا کلیک کنید و تصویر مربعی صفحه اصلی را انتخاب کنید.
                </p>

                <div className="mt-5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-500">
                  PNG, JPG, WEBP تا ۱۰MB
                </div>
              </div>
            )}
          </div>

          <p className="text-xs leading-6 text-gray-500">
            پیشنهاد: تصویر مربعی با کیفیت بالا آپلود کنید تا در صفحه اصلی تمیزتر
            نمایش داده شود.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
            <label
              htmlFor="home_title"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800"
            >
              <Type className="h-4 w-4 text-yellow-600" />
              عنوان
            </label>

            <textarea
              name="home_title"
              id="home_title"
              value={mainPageForm.home_title}
              onChange={handleInputChange}
              placeholder="مثلاً: هر طرح، فرصتی برای روایت یک احساس است"
              className="min-h-28 w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-7 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
            />

            <div className="mt-2 flex justify-end text-xs text-gray-400">
              {mainPageForm.home_title.length} کاراکتر
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
            <label
              htmlFor="home_desc"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800"
            >
              <AlignRight className="h-4 w-4 text-yellow-600" />
              معرفی
            </label>

            <textarea
              name="home_desc"
              id="home_desc"
              value={mainPageForm.home_desc}
              onChange={handleInputChange}
              placeholder="یک معرفی کوتاه و حرفه‌ای برای صفحه اصلی بنویسید..."
              className="min-h-44 w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-8 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
            />

            <div className="mt-2 flex justify-end text-xs text-gray-400">
              {mainPageForm.home_desc.length} کاراکتر
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-gray-100 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-w-36 items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-yellow-200 transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  در حال ذخیره...
                </>
              ) : (
                "ثبت تغییرات"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
