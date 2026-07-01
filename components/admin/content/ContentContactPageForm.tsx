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
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-5">
          <Skeleton className="h-6 w-44" rounded="full" />
          <Skeleton className="mt-3 h-4 w-72" rounded="full" />
        </div>

        <div className="space-y-6 p-6">
          <Skeleton className="h-44" rounded="2xl" />
          <div className="grid gap-5 md:grid-cols-3">
            <Skeleton className="h-24" rounded="2xl" />
            <Skeleton className="h-24" rounded="2xl" />
            <Skeleton className="h-24" rounded="2xl" />
          </div>
          <Skeleton className="ms-auto h-11 w-36" rounded="2xl" />
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
        <h2 className="text-lg font-bold text-gray-900">محتوای صفحه تماس</h2>
        <p className="mt-1 text-sm text-gray-500">
          توضیحات، شماره تماس، ایمیل و شهر نمایش‌داده‌شده در صفحه تماس را مدیریت
          کنید.
        </p>
      </div>

      <div className="flex flex-col gap-6 p-6">
        <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
          <label
            htmlFor="contact_desc"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800"
          >
            <AlignRight className="h-4 w-4 text-yellow-600" />
            توضیحات صفحه تماس
          </label>

          <textarea
            id="contact_desc"
            name="contact_desc"
            value={contactPageForm.contact_desc}
            onChange={handleInputContactChange}
            placeholder="یک متن کوتاه و صمیمی برای دعوت مخاطب به ارتباط بنویسید..."
            className="min-h-44 w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-8 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
          />

          <div className="mt-2 flex justify-end text-xs text-gray-400">
            {contactPageForm.contact_desc.length} کاراکتر
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
            <label
              htmlFor="contact_phone"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800"
            >
              <Phone className="h-4 w-4 text-yellow-600" />
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
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-left text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
            />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
            <label
              htmlFor="contact_email"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800"
            >
              <Mail className="h-4 w-4 text-yellow-600" />
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
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-left text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
            />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
            <label
              htmlFor="contact_city"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800"
            >
              <Building2 className="h-4 w-4 text-yellow-600" />
              شهر
            </label>

            <input
              id="contact_city"
              name="contact_city"
              value={contactPageForm.contact_city}
              onChange={handleInputContactChange}
              type="text"
              placeholder="مثلاً تهران"
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
            />
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
