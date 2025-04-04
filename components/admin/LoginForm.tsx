"use client";

import { useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { LoginFormData, LoginFormErrors } from "@/types/admin";
import axios from "axios";
import { useRouter } from "next/navigation";
/**
 * LoginForm Component
 *
 * A form component for admin login with validation and error handling.
 *
 * @returns {JSX.Element} The login form component
 */
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

  /**
   * Handles input changes and clears corresponding errors
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /**
   * Validates the form data
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = () => {
    let valid = true;
    const newErrors: LoginFormErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "رمز عبور الزامی است";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );

      router.push("/admin/dashboard");
    } catch {
      setErrors((prev) => ({
        ...prev,
        email: "ورود ناموفق بود",
        password: "اطلاعات ورود اشتباه است",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-700">
          ورود به پنل مدیریت
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-600">ایمیل</label>
            <div className="relative">
              <input
                name="email"
                type="email"
                className={`w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.email}
                onChange={handleChange}
                placeholder="ایمیل خود را وارد کنید"
              />
              <MdEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              رمز عبور
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className={`w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.password}
                onChange={handleChange}
                placeholder="رمز عبور خود را وارد کنید"
              />
              <MdLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-semibold transition"
            disabled={isLoading}
          >
            {isLoading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}
