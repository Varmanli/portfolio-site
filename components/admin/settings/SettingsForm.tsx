"use client";

import axios from "axios";
import {
  FileText,
  Globe,
  Loader2,
  MessageCircle,
  Save,
  Search,
  User,
  UserCircle,
} from "lucide-react";
import {
  FaBehance,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Skeleton from "@/components/skeletons/Skeleton";
import { SiteSettingsForm } from "@/types/admin";
import SettingsTabs, { SettingsTabKey } from "./SettingsTabs";

const EMPTY_SETTINGS: SiteSettingsForm = {
  site_name: "",
  site_description: "",
  owner_name: "",
  job_title: "",
  short_bio: "",
  instagram_url: "",
  behance_url: "",
  telegram_url: "",
  whatsapp_url: "",
  linkedin_url: "",
  default_meta_title: "",
  default_meta_description: "",
  contact_form_enabled: true,
  contact_success_message: "",
};

const URL_FIELDS: (keyof SiteSettingsForm)[] = [
  "instagram_url",
  "behance_url",
  "telegram_url",
  "whatsapp_url",
  "linkedin_url",
];

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const inputClass =
  "h-12 w-full rounded-2xl border-2 border-black bg-white px-4 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]";

const textareaClass =
  "min-h-32 w-full resize-none rounded-2xl border-2 border-black bg-white px-4 py-3 text-sm font-bold leading-8 text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]";

const fieldCardClass =
  "rounded-[1.75rem] border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]";

const labelClass = "mb-3 flex items-center gap-3 text-sm font-black text-black";

const iconBoxClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[3px_3px_0_#111]";

const errorClass = "mt-2 text-xs font-black text-red-600";

const counterClass = "mt-2 flex justify-end text-xs font-bold text-black/45";

export default function SettingsForm() {
  const [activeTab, setActiveTab] = useState<SettingsTabKey>("general");
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState<SiteSettingsForm>(EMPTY_SETTINGS);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SiteSettingsForm, string>>
  >({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res =
          await axios.get<{ key: string; value: string }[]>("/api/content");

        const mapped = res.data.reduce(
          (acc, item) => {
            acc[item.key] = item.value;
            return acc;
          },
          {} as Record<string, string>,
        );

        setSettings((prev) => ({
          ...prev,
          site_name: mapped.site_name ?? prev.site_name,
          site_description: mapped.site_description ?? prev.site_description,
          owner_name: mapped.owner_name ?? prev.owner_name,
          job_title: mapped.job_title ?? prev.job_title,
          short_bio: mapped.short_bio ?? prev.short_bio,
          instagram_url: mapped.instagram_url ?? prev.instagram_url,
          behance_url: mapped.behance_url ?? prev.behance_url,
          telegram_url: mapped.telegram_url ?? prev.telegram_url,
          whatsapp_url: mapped.whatsapp_url ?? prev.whatsapp_url,
          linkedin_url: mapped.linkedin_url ?? prev.linkedin_url,
          default_meta_title:
            mapped.default_meta_title ?? prev.default_meta_title,
          default_meta_description:
            mapped.default_meta_description ?? prev.default_meta_description,
          contact_form_enabled:
            mapped.contact_form_enabled != null
              ? mapped.contact_form_enabled === "true"
              : prev.contact_form_enabled,
          contact_success_message:
            mapped.contact_success_message ?? prev.contact_success_message,
        }));
      } catch (err) {
        toast.error("دریافت تنظیمات با خطا مواجه شد");
        console.error(err);
      } finally {
        setIsLoadingInitial(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setSettings((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleContactForm = () => {
    setSettings((prev) => ({
      ...prev,
      contact_form_enabled: !prev.contact_form_enabled,
    }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof SiteSettingsForm, string>> = {};

    if (!settings.site_name.trim()) {
      nextErrors.site_name = "نام سایت الزامی است";
    }

    if (!settings.owner_name.trim()) {
      nextErrors.owner_name = "نام مالک سایت الزامی است";
    }

    for (const field of URL_FIELDS) {
      const value = settings[field] as string;

      if (value.trim() && !isValidUrl(value.trim())) {
        nextErrors[field] = "آدرس نامعتبر است";
      }
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setActiveTab(
        nextErrors.site_name
          ? "general"
          : nextErrors.owner_name
            ? "personal"
            : "social",
      );
    }

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("لطفاً خطاهای فرم را برطرف کنید");
      return;
    }

    let loadingToastId: string | undefined;

    try {
      setIsSubmitting(true);
      loadingToastId = toast.loading("در حال ذخیره تنظیمات...");

      const entries = Object.entries(settings) as [
        keyof SiteSettingsForm,
        string | boolean,
      ][];

      for (const [key, value] of entries) {
        const stringValue =
          typeof value === "boolean"
            ? value
              ? "true"
              : "false"
            : value.trim();

        await axios.post("/api/content", { key, value: stringValue });
      }

      if (loadingToastId) toast.dismiss(loadingToastId);
      toast.success("تنظیمات با موفقیت ذخیره شد");
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
      <div dir="rtl" className="space-y-6">
        <Skeleton className="h-24 rounded-[2rem]" />

        <div className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]">
          <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:px-6">
            <Skeleton className="h-6 w-44 rounded-xl" />
            <Skeleton className="mt-3 h-4 w-72 rounded-xl" />
          </div>

          <div className="space-y-6 p-4 sm:p-6">
            <div className={fieldCardClass}>
              <Skeleton className="h-24 rounded-2xl" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className={fieldCardClass}>
                <Skeleton className="h-24 rounded-2xl" />
              </div>

              <div className={fieldCardClass}>
                <Skeleton className="h-24 rounded-2xl" />
              </div>
            </div>

            <div className="flex justify-end">
              <Skeleton className="h-12 w-40 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form dir="rtl" onSubmit={handleSubmit} className="space-y-6">
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]">
        {activeTab === "general" && (
          <>
            <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className={iconBoxClass}>
                  <Globe className="h-5 w-5" />
                </span>

                <div>
                  <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                    تنظیمات عمومی
                  </div>

                  <h2 className="text-xl font-black leading-9 text-black">
                    اطلاعات عمومی
                  </h2>

                  <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                    نام و توضیح کلی سایت که در سربرگ‌ها و متادیتا استفاده
                    می‌شود.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-4 sm:p-6">
              <div className={fieldCardClass}>
                <label htmlFor="site_name" className={labelClass}>
                  <span className={iconBoxClass}>
                    <Globe className="h-5 w-5" />
                  </span>
                  نام سایت
                </label>

                <input
                  id="site_name"
                  name="site_name"
                  value={settings.site_name}
                  onChange={handleChange}
                  placeholder="مثلاً ملیکا شمیرانی"
                  className={inputClass}
                />

                {errors.site_name && (
                  <p className={errorClass}>{errors.site_name}</p>
                )}
              </div>

              <div className={fieldCardClass}>
                <label htmlFor="site_description" className={labelClass}>
                  <span className={iconBoxClass}>
                    <FileText className="h-5 w-5" />
                  </span>
                  توضیحات سایت
                </label>

                <textarea
                  id="site_description"
                  name="site_description"
                  value={settings.site_description}
                  onChange={handleChange}
                  placeholder="یک توضیح کوتاه درباره سایت بنویسید..."
                  className={textareaClass}
                  maxLength={300}
                />

                <div className={counterClass}>
                  {settings.site_description.length.toLocaleString("fa-IR")} /
                  ۳۰۰ کاراکتر
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "personal" && (
          <>
            <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className={iconBoxClass}>
                  <User className="h-5 w-5" />
                </span>

                <div>
                  <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                    پروفایل
                  </div>

                  <h2 className="text-xl font-black leading-9 text-black">
                    اطلاعات شخصی
                  </h2>

                  <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                    نام، عنوان شغلی و بیوگرافی کوتاه که در سایت نمایش داده
                    می‌شود.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-4 sm:p-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div className={fieldCardClass}>
                  <label htmlFor="owner_name" className={labelClass}>
                    <span className={iconBoxClass}>
                      <User className="h-5 w-5" />
                    </span>
                    نام مالک سایت
                  </label>

                  <input
                    id="owner_name"
                    name="owner_name"
                    value={settings.owner_name}
                    onChange={handleChange}
                    placeholder="مثلاً ملیکا شمیرانی"
                    className={inputClass}
                  />

                  {errors.owner_name && (
                    <p className={errorClass}>{errors.owner_name}</p>
                  )}
                </div>

                <div className={fieldCardClass}>
                  <label htmlFor="job_title" className={labelClass}>
                    <span className={iconBoxClass}>
                      <UserCircle className="h-5 w-5" />
                    </span>
                    عنوان شغلی
                  </label>

                  <input
                    id="job_title"
                    name="job_title"
                    value={settings.job_title}
                    onChange={handleChange}
                    placeholder="مثلاً طراح گرافیک"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className={fieldCardClass}>
                <label htmlFor="short_bio" className={labelClass}>
                  <span className={iconBoxClass}>
                    <FileText className="h-5 w-5" />
                  </span>
                  بیوگرافی کوتاه
                </label>

                <textarea
                  id="short_bio"
                  name="short_bio"
                  value={settings.short_bio}
                  onChange={handleChange}
                  placeholder="چند جمله کوتاه درباره خودتان بنویسید..."
                  className={textareaClass}
                  maxLength={400}
                />

                <div className={counterClass}>
                  {settings.short_bio.length.toLocaleString("fa-IR")} / ۴۰۰
                  کاراکتر
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "social" && (
          <>
            <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className={iconBoxClass}>
                  <MessageCircle className="h-5 w-5" />
                </span>

                <div>
                  <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                    شبکه‌ها
                  </div>

                  <h2 className="text-xl font-black leading-9 text-black">
                    شبکه‌های اجتماعی
                  </h2>

                  <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                    لینک صفحات و پیام‌رسان‌های شما در سایت نمایش داده می‌شود.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-2">
              {(
                [
                  {
                    key: "instagram_url",
                    label: "اینستاگرام",
                    icon: FaInstagram,
                    placeholder: "https://instagram.com/username",
                  },
                  {
                    key: "behance_url",
                    label: "بیهانس",
                    icon: FaBehance,
                    placeholder: "https://behance.net/username",
                  },
                  {
                    key: "telegram_url",
                    label: "تلگرام",
                    icon: FaTelegramPlane,
                    placeholder: "https://t.me/username",
                  },
                  {
                    key: "whatsapp_url",
                    label: "واتساپ",
                    icon: FaWhatsapp,
                    placeholder: "https://wa.me/98912xxxxxxx",
                  },
                  {
                    key: "linkedin_url",
                    label: "لینکدین",
                    icon: FaLinkedin,
                    placeholder: "https://linkedin.com/in/username",
                  },
                ] as const
              ).map((field) => {
                const Icon = field.icon;

                return (
                  <div key={field.key} className={fieldCardClass}>
                    <label htmlFor={field.key} className={labelClass}>
                      <span className={iconBoxClass}>
                        <Icon className="h-5 w-5" />
                      </span>
                      {field.label}
                    </label>

                    <input
                      id={field.key}
                      name={field.key}
                      value={settings[field.key]}
                      onChange={handleChange}
                      dir="ltr"
                      placeholder={field.placeholder}
                      className={`${inputClass} text-left`}
                    />

                    {errors[field.key] && (
                      <p className={errorClass}>{errors[field.key]}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "seo" && (
          <>
            <div className="border-b-2 border-black bg-[#FFF7D8] px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className={iconBoxClass}>
                  <Search className="h-5 w-5" />
                </span>

                <div>
                  <div className="mb-2 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
                    SEO
                  </div>

                  <h2 className="text-xl font-black leading-9 text-black">
                    سئو و فرم تماس
                  </h2>

                  <p className="mt-1 text-sm font-bold leading-7 text-black/55">
                    متادیتای پیش‌فرض سایت و رفتار فرم تماس را مدیریت کنید.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-4 sm:p-6">
              <div className={fieldCardClass}>
                <label htmlFor="default_meta_title" className={labelClass}>
                  <span className={iconBoxClass}>
                    <Search className="h-5 w-5" />
                  </span>
                  عنوان پیش‌فرض متا
                </label>

                <input
                  id="default_meta_title"
                  name="default_meta_title"
                  value={settings.default_meta_title}
                  onChange={handleChange}
                  placeholder="عنوانی که در نتایج جستجو نمایش داده می‌شود"
                  className={inputClass}
                  maxLength={70}
                />

                <div className={counterClass}>
                  {settings.default_meta_title.length.toLocaleString("fa-IR")} /
                  ۷۰ کاراکتر
                </div>
              </div>

              <div className={fieldCardClass}>
                <label
                  htmlFor="default_meta_description"
                  className={labelClass}
                >
                  <span className={iconBoxClass}>
                    <FileText className="h-5 w-5" />
                  </span>
                  توضیحات پیش‌فرض متا
                </label>

                <textarea
                  id="default_meta_description"
                  name="default_meta_description"
                  value={settings.default_meta_description}
                  onChange={handleChange}
                  placeholder="توضیحی که در نتایج جستجو نمایش داده می‌شود"
                  className={textareaClass}
                  maxLength={160}
                />

                <div className={counterClass}>
                  {settings.default_meta_description.length.toLocaleString(
                    "fa-IR",
                  )}{" "}
                  / ۱۶۰ کاراکتر
                </div>
              </div>

              <div
                className={`${fieldCardClass} flex items-center justify-between gap-4`}
              >
                <div>
                  <p className="text-sm font-black text-black">
                    فعال بودن فرم تماس
                  </p>
                  <p className="mt-1 text-xs font-bold leading-5 text-black/50">
                    در صورت غیرفعال بودن، فرم تماس در سایت نمایش داده نمی‌شود.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.contact_form_enabled}
                  onClick={toggleContactForm}
                  className={[
                    "relative h-9 w-16 shrink-0 rounded-full border-2 border-black shadow-[3px_3px_0_#111] transition",
                    settings.contact_form_enabled ? "bg-[#CAF3AB]" : "bg-white",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute top-1 h-6 w-6 rounded-full border-2 border-black bg-[#FFE066] transition-all",
                      settings.contact_form_enabled ? "right-1" : "right-8",
                    ].join(" ")}
                  />
                </button>
              </div>

              <div className={fieldCardClass}>
                <label htmlFor="contact_success_message" className={labelClass}>
                  <span className={iconBoxClass}>
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  پیام موفقیت فرم تماس
                </label>

                <textarea
                  id="contact_success_message"
                  name="contact_success_message"
                  value={settings.contact_success_message}
                  onChange={handleChange}
                  placeholder="پیام با موفقیت ارسال شد! 🙌"
                  className={textareaClass}
                  maxLength={200}
                />

                <div className={counterClass}>
                  {settings.contact_success_message.length.toLocaleString(
                    "fa-IR",
                  )}{" "}
                  / ۲۰۰ کاراکتر
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center justify-end border-t-2 border-black/10 p-4 sm:p-6">
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
    </form>
  );
}
