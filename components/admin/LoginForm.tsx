"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MdAdminPanelSettings,
  MdEmail,
  MdLock,
  MdLogin,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

import { LoginFormData, LoginFormErrors } from "@/types/admin";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;

    const newErrors: LoginFormErrors = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "فرمت ایمیل معتبر نیست";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "رمز عبور الزامی است";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      await axios.post("/api/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setErrors((prev) => ({
        ...prev,
        email: "ورود ناموفق بود",
        password: "ایمیل یا رمز عبور اشتباه است",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFFDF5] px-4 py-10"
    >
      <div className="pointer-events-none absolute right-10 top-10 h-72 w-72 rounded-full bg-[#F196E5]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-10 h-80 w-80 rounded-full bg-[#CAF3AB]/50 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-52 w-52 rounded-full bg-sky-200/40 blur-3xl" />

      <section className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[10px_10px_0_#111]">
        <div className="border-b-2 border-black bg-[#FFF7D8] px-6 py-7 text-center">
          <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center rounded-3xl border-2 border-black bg-[#FFE066] text-black shadow-[5px_5px_0_#111]">
            <MdAdminPanelSettings size={38} />
          </div>

          <div className="mx-auto mb-3 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-4 py-1.5 text-xs font-black text-white shadow-[3px_3px_0_#111]">
            پنل مدیریت
          </div>

          <h1 className="text-2xl font-black leading-10 text-black">
            ورود به پنل مدیریت
          </h1>

          <p className="mt-2 text-sm font-bold leading-7 text-black/55">
            برای مدیریت محتوا، نمونه‌کارها و پیام‌ها وارد شوید.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-6 sm:px-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-black text-black"
            >
              ایمیل
            </label>

            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                dir="ltr"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={[
                  "h-12 w-full rounded-2xl border-2 bg-white px-11 text-left text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]",
                  errors.email ? "border-red-500" : "border-black",
                ].join(" ")}
              />

              <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-black/45" />
            </div>

            {errors.email && (
              <p className="mt-2 rounded-2xl border-2 border-black bg-red-100 px-3 py-2 text-xs font-black text-red-600 shadow-[3px_3px_0_#111]">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-black text-black"
            >
              رمز عبور
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                dir="ltr"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={[
                  "h-12 w-full rounded-2xl border-2 bg-white px-11 text-left text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:bg-[#FFF7D8] focus:shadow-[4px_4px_0_#111]",
                  errors.password ? "border-red-500" : "border-black",
                ].join(" ")}
              />

              <MdLock className="absolute right-4 top-1/2 -translate-y-1/2 text-black/45" />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[2px_2px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-[calc(50%+2px)] hover:bg-[#CAF3AB]"
                aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
              >
                {showPassword ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 rounded-2xl border-2 border-black bg-red-100 px-3 py-2 text-xs font-black text-red-600 shadow-[3px_3px_0_#111]">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-black bg-[#CAF3AB] px-5 text-sm font-black text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#111]"
          >
            <MdLogin size={20} className={isLoading ? "animate-pulse" : ""} />
            {isLoading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <div className="border-t-2 border-black bg-[#FFF7D8] px-6 py-4 text-center">
          <p className="text-xs font-bold leading-6 text-black/50">
            دسترسی به این بخش فقط برای مدیر سایت امکان‌پذیر است.
          </p>
        </div>
      </section>
    </main>
  );
}
