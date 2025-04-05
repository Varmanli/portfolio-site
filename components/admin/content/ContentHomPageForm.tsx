import { ImageUploader } from "@/components/ui/ImageUploader";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface mainPageFormType {
  home_image: File | null;
  home_title: string;
  home_desc: string;
}
type Primitive = string | number | boolean | null | undefined;

export default function ContentHomPageForm() {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [mainPageForm, setMainPageForm] = useState<mainPageFormType>({
    home_image: null,
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
        value: String(value),
      }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    setMainPageForm((perv) => ({
      ...perv,
      home_image: file,
    }));
  };

  const handlePreviewClick = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank");
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!mainPageForm.home_image) return null;

    const formData = new FormData();
    formData.append("files", mainPageForm.home_image);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/images`,
        formData,
        {
          withCredentials: true,
        }
      );

      return res.data.filePath;
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const error = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        toast.error(
          `❌ خطا در آپلود عکس: ${
            error.response?.data?.message || error.message || "خطای ناشناخته"
          }`
        );
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

    try {
      toast.loading("در حال ذخیره محتوا...");

      const imageUrl = await uploadImage();

      const payload = toKeyValueArray({
        home_title: mainPageForm.home_title,
        home_desc: mainPageForm.home_desc,
        ...(imageUrl ? { home_image: imageUrl } : {}),
      });

      for (const item of payload) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/upload/images`,
          item,
          {
            withCredentials: true, // اگه auth داری
          }
        );
      }

      toast.dismiss();
      toast.success("✅ محتوا با موفقیت ذخیره شد");
    } catch (err: unknown) {
      toast.dismiss();

      if (typeof err === "object" && err !== null && "response" in err) {
        const error = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        toast.error(
          `❌ ${
            error.response?.data?.message || error.message || "خطایی رخ داد"
          }`
        );
      } else if (err instanceof Error) {
        toast.error(`❌ ${err.message}`);
      } else {
        toast.error("❌ خطای ناشناخته‌ای رخ داده است");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMainPageForm((perv) => ({
      ...perv,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data }: { data: { key: string; value: string }[] } =
          await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/home-content`, {
            withCredentials: true,
          });

        const mappedData = data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, string>);

        setMainPageForm((prev) => ({
          ...prev,
          ...mappedData,
        }));

        if (mappedData.home_image) {
          setPreviewUrl(
            `${process.env.NEXT_PUBLIC_API_URL}${mappedData.home_image}`
          );
        }
      } catch (err) {
        toast.error("❌ دریافت اطلاعات اولیه با خطا مواجه شد");
        console.error(err);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 ">
        <ImageUploader
          label="تصویر اصلی"
          preview={previewUrl}
          onImageChange={handleImageChange}
          onPreviewClick={handlePreviewClick}
        />
        <div>
          <label
            htmlFor="1"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            عنوان
          </label>
          <input
            name="home_title"
            value={mainPageForm.home_title}
            onChange={handleInputChange}
            id="1"
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <div>
          <label
            htmlFor="2"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            معرفی
          </label>
          <textarea
            value={mainPageForm.home_desc}
            onChange={handleInputChange}
            name="home_desc"
            id="2"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 h-40"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-30 ms-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition "
        >
          ثبت تغییرات
        </button>
      </div>
    </form>
  );
}
