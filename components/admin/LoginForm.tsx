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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-4 py-10">
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-yellow-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-20 h-72 w-72 rounded-full bg-yellow-100/70 blur-3xl" />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
        <div className="border-b border-gray-100 bg-gradient-to-l from-yellow-50 via-white to-white px-6 py-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-500 text-white shadow-sm shadow-yellow-200">
            <MdAdminPanelSettings size={34} />
          </div>

          <h1 className="text-2xl font-black text-gray-900">
            ورود به پنل مدیریت
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            برای مدیریت محتوا، نمونه‌کارها و پیام‌ها وارد شوید.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-black text-gray-800"
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
                  "h-12 w-full rounded-2xl border bg-white px-11 text-left text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-4",
                  errors.email
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-yellow-400 focus:ring-yellow-100",
                ].join(" ")}
              />

              <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {errors.email && (
              <p className="mt-2 rounded-2xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-black text-gray-800"
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
                  "h-12 w-full rounded-2xl border bg-white px-11 text-left text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-4",
                  errors.password
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-yellow-400 focus:ring-yellow-100",
                ].join(" ")}
              />

              <MdLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
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
              <p className="mt-2 rounded-2xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-5 text-sm font-black text-white shadow-sm shadow-yellow-200 transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <MdLogin size={20} className={isLoading ? "animate-pulse" : ""} />
            {isLoading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <div className="border-t border-gray-100 bg-gray-50/70 px-6 py-4 text-center">
          <p className="text-xs leading-5 text-gray-400">
            دسترسی به این بخش فقط برای مدیر سایت امکان‌پذیر است.
          </p>
        </div>
      </div>
    </div>
  );
}
