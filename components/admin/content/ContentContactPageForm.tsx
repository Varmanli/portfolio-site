"use client";

import axios from "axios";
import {
  AlignRight,
  Building2,
  Loader2,
  Mail,
  Phone,
  Save,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Skeleton from "@/components/skeletons/Skeleton";

interface ContactPageFormTypes {
  contact_desc: string;
  contact_phone: string;
  contact_email: string;
  contact_city: string;
  [key: string]: string;
}

type Primitive = string | number | boolean | null | undefined;

interface KeyValueItem {
  key: string;
  value: string;
}

export default function ContentContactPageForm() {
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contactPageForm, setContactPageForm] = useState<ContactPageFormTypes>({
    contact_desc: "",
    contact_phone: "",
    contact_email: "",
    contact_city: "",
  });

  const handleInputContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setContactPageForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toKeyValueArray = (
    data: Record<string, Primitive>,
    skipKeys: string[] = [],
  ): KeyValueItem[] => {
    return Object.entries(data)
      .filter(([key]) => !skipKeys.includes(key))
      .map(([key, value]) => ({
        key,
        value: value != null ? String(value) : "",
      }));
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res =
          await axios.get<{ key: string; value: string }[]>("/api/content");

        const mappedData = res.data.reduce(
          (acc, item) => {
            acc[item.key] = item.value;
            return acc;
          },
          {} as Record<string, string>,
        );

        setContactPageForm((prev) => ({
          ...prev,
          contact_desc: mappedData.contact_desc ?? prev.contact_desc,
          contact_phone: mappedData.contact_phone ?? prev.contact_phone,
          contact_email: mappedData.contact_email ?? prev.contact_email,
          contact_city: mappedData.contact_city ?? prev.contact_city,
        }));
      } catch (err) {
        toast.error("دریافت اطلاعات اولیه با خطا مواجه شد");
        console.error(err);
      } finally {
        setIsLoadingInitial(false);
      }
    };

    fetchInitialData();
  }, []);

  const validateForm = () => {
    if (!contactPageForm.contact_desc.trim()) {
      toast.error("توضیحات صفحه تماس الزامی است");
      return false;
    }

    if (!contactPageForm.contact_phone.trim()) {
      toast.error("شماره تماس الزامی است");
      return false;
    }

    if (!contactPageForm.contact_email.trim()) {
      toast.error("ایمیل الزامی است");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactPageForm.contact_email)) {
      toast.error("فرمت ایمیل معتبر نیست");
      return false;
    }

    if (!contactPageForm.contact_city.trim()) {
      toast.error("شهر الزامی است");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    let loadingToastId: string | undefined;

    try {
      setIsSubmitting(true);
      loadingToastId = toast.loading("در حال ذخیره اطلاعات تماس...");

      const payload = toKeyValueArray({
        contact_desc: contactPageForm.contact_desc.trim(),
        contact_phone: contactPageForm.contact_phone.trim(),
        contact_email: contactPageForm.contact_email.trim(),
        contact_city: contactPageForm.contact_city.trim(),
      });

      for (const item of payload) {
        await axios.post("/api/content", item);
      }

      if (loadingToastId) toast.dismiss(loadingToastId);
      toast.success("اطلاعات تماس با موفقیت ذخیره شد");
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
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] shadow-[4px_4px_0_#111]">
              <Mail className="h-7 w-7 text-black" />
            </span>

            <div className="space-y-2">
              <Skeleton className="h-6 w-44 rounded-xl" />
              <Skeleton className="h-4 w-72 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="space-y-6 p-4 sm:p-6">
          <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
            <Skeleton className="h-44 rounded-2xl" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
              <Skeleton className="h-24 rounded-2xl" />
            </div>

            <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
              <Skeleton className="h-24 rounded-2xl" />
            </div>

            <div className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
              <Skeleton className="h-24 rounded-2xl" />
            </div>
          </div>

          <div className="flex justify-end">
            <Skeleton className="h-12 w-40 rounded-2xl" />
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
            <Mail className="h-7 w-7" />
          </span>

          <div>
            <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
              محتوای سایت
            </div>

            <h2 className="text-xl font-black leading-9 text-black">
              محتوای صفحه تماس
            </h2>

            <p className="mt-1 text-sm font-bold leading-7 text-black/55">
              توضیحات، شماره تماس، ایمیل و شهر نمایش‌داده‌شده در صفحه تماس را
              مدیریت کنید.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4 sm:p-6">
        <section className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
          <label
            htmlFor="contact_desc"
            className="mb-3 flex items-center gap-3 text-sm font-black text-black"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[3px_3px_0_#111]">
              <AlignRight className="h-5 w-5" />
            </span>
            توضیحات صفحه تماس
          </label>

          <textarea
            id="contact_desc"
            name="contact_desc"
            value={contactPageForm.contact_desc}
            onChange={handleInputContactChange}
            placeholder="یک متن کوتاه و صمیمی برای دعوت مخاطب به ارتباط بنویسید..."
            className="min-h-44 w-full resize-none rounded-2xl border-2 border-black bg-white px-4 py-3 text-sm font-bold leading-8 text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]"
          />

          <div className="mt-2 flex justify-end text-xs font-bold text-black/45">
            {contactPageForm.contact_desc.length.toLocaleString("fa-IR")}{" "}
            کاراکتر
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-3">
          <section className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
            <label
              htmlFor="contact_phone"
              className="mb-3 flex items-center gap-3 text-sm font-black text-black"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-black bg-[#CAF3AB] text-black shadow-[3px_3px_0_#111]">
                <Phone className="h-5 w-5" />
              </span>
              شماره تماس
            </label>

            <input
              id="contact_phone"
              name="contact_phone"
              value={contactPageForm.contact_phone}
              onChange={handleInputContactChange}
              type="tel"
              dir="ltr"
              placeholder="0912..."
              className="h-12 w-full rounded-2xl border-2 border-black bg-white px-4 text-left text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]"
            />
          </section>

          <section className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
            <label
              htmlFor="contact_email"
              className="mb-3 flex items-center gap-3 text-sm font-black text-black"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-black bg-[#CAF3AB] text-black shadow-[3px_3px_0_#111]">
                <Mail className="h-5 w-5" />
              </span>
              ایمیل
            </label>

            <input
              id="contact_email"
              name="contact_email"
              value={contactPageForm.contact_email}
              onChange={handleInputContactChange}
              type="email"
              dir="ltr"
              placeholder="example@email.com"
              className="h-12 w-full rounded-2xl border-2 border-black bg-white px-4 text-left text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]"
            />
          </section>

          <section className="rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
            <label
              htmlFor="contact_city"
              className="mb-3 flex items-center gap-3 text-sm font-black text-black"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-black bg-[#CAF3AB] text-black shadow-[3px_3px_0_#111]">
                <Building2 className="h-5 w-5" />
              </span>
              شهر
            </label>

            <input
              id="contact_city"
              name="contact_city"
              value={contactPageForm.contact_city}
              onChange={handleInputContactChange}
              type="text"
              placeholder="مثلاً تهران"
              className="h-12 w-full rounded-2xl border-2 border-black bg-white px-4 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]"
            />
          </section>
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
      </div>
    </form>
  );
}
