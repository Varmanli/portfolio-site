import { ImageUploader } from "@/components/ui/ImageUploader";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type Primitive = string | number | boolean | null | undefined;

interface MainPageFormState {
  home_image_file: File | null; // فقط برای فایل جدید
  home_image_url: string;       // آدرس ذخیره شده در سرور
  home_title: string;
  home_desc: string;
}

type HomeContentItem = {
  key: string;
  value: string;
};

export default function ContentHomePageForm() {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [mainPageForm, setMainPageForm] = useState<MainPageFormState>({
    home_image_file: null,
    home_image_url: "",
    home_title: "",
    home_desc: "",
  });

  const toKeyValueArray = (
    data: Record<string, Primitive>,
    skipKeys: string[] = []
  ) => {
    return Object.entries(data)
      .filter(([key]) => !skipKeys.includes(key))
      .map(([key, value]) => ({
        key,
        value: String(value ?? ""),
      }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    setMainPageForm((prev) => ({
      ...prev,
      home_image_file: file,
    }));
  };

  const handlePreviewClick = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank");
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data } = await axios.get<HomeContentItem[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/home-content`,
          {
            withCredentials: true,
          }
        );

        const mappedData = data.reduce(
          (acc, item) => {
            acc[item.key] = item.value;
            return acc;
          },
          {} as Record<string, string>
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
        toast.error("❌ دریافت اطلاعات اولیه با خطا مواجه شد");
        console.error(err);
      }
    };

    fetchInitialData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    // اگر فایل جدید انتخاب نشده، آدرس قبلی را برگردان
    if (!mainPageForm.home_image_file) {
      return mainPageForm.home_image_url || null;
    }

    const formData = new FormData();
    formData.append("files", mainPageForm.home_image_file);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/images`,
        formData,
        {
          withCredentials: true,
        }
      );

      const uploadedUrl: string | undefined = res.data?.[0]?.filePath;
      if (!uploadedUrl) {
        toast.error("❌ آدرس تصویر آپلود شده دریافت نشد");
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

        toast.error(`❌ خطا در آپلود عکس: ${message || "خطای ناشناخته"}`);
      } else if (err instanceof Error) {
        toast.error(`❌ ${err.message}`);
      } else {
        toast.error("❌ خطای ناشناخته");
      }

      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mainPageForm.home_title || !mainPageForm.home_desc) {
      toast.error("عنوان و معرفی الزامی هستند");
      return;
    }

    let loadingToastId: string | undefined;

    try {
      loadingToastId = toast.loading("در حال ذخیره محتوا...");

      const imageUrl = await uploadImage();

      const body = toKeyValueArray({
        home_title: mainPageForm.home_title,
        home_desc: mainPageForm.home_desc,
        ...(imageUrl && { home_image: imageUrl }),
      });

      for (const item of body) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/home-content`,
          item,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
      }

      if (loadingToastId) toast.dismiss(loadingToastId);
      toast.success("✅ محتوا با موفقیت ذخیره شد");

      // اگر تصویر جدید آپلود شد، استیت URL را هم به‌روزرسانی کن
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

        toast.error(`❌ ${message || "خطایی رخ داد"}`);
      } else if (err instanceof Error) {
        toast.error(`❌ ${err.message}`);
      } else {
        toast.error("❌ خطای ناشناخته‌ای رخ داده است");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <ImageUploader
          label="تصویر اصلی"
          preview={previewUrl}
          onImageChange={handleImageChange}
          onPreviewClick={handlePreviewClick}
        />

        <div>
          <label
            htmlFor="home_title"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            عنوان
          </label>
          <textarea
            name="home_title"
            id="home_title"
            value={mainPageForm.home_title}
            onChange={handleInputChange}
            className="h-30 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div>
          <label
            htmlFor="home_desc"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            معرفی
          </label>
          <textarea
            name="home_desc"
            id="home_desc"
            value={mainPageForm.home_desc}
            onChange={handleInputChange}
            className="h-40 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <button
          type="submit"
          className="ms-auto w-30 rounded-md bg-yellow-500 px-4 py-2 font-medium text-white transition hover:bg-yellow-600"
        >
          ثبت تغییرات
        </button>
      </div>
    </form>
  );
}
