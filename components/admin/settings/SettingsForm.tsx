"use client";

import { useState } from "react";
import { MdSave } from "react-icons/md";
import { SiteSettings } from "@/types/admin";
import { ValidationError } from "@/types/errors";
import ErrorMessage from "@/components/shared/ErrorMessage";
import FormError from "@/components/shared/FormError";
import { showSuccess, showError } from "@/lib/utils/toast";

interface SettingsFormProps {
  settings: SiteSettings;
  onSave: (settings: SiteSettings) => Promise<void>;
}

/**
 * SettingsForm Component
 *
 * A form component for managing site settings including social links and other configurations.
 *
 * @param {SettingsFormProps} props - Component props
 * @returns {JSX.Element} The settings form component
 */
export default function SettingsForm({ settings, onSave }: SettingsFormProps) {
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.siteTitle.trim()) {
      errors.siteTitle = "عنوان سایت نمی‌تواند خالی باشد";
    }
    if (!formData.siteDescription.trim()) {
      errors.siteDescription = "توضیحات سایت نمی‌تواند خالی باشد";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      setFormError(null);
      if (!validateForm()) return;

      setIsLoading(true);
      await onSave(formData);
      showSuccess("تنظیمات با موفقیت ذخیره شد");
    } catch (error) {
      if (error instanceof ValidationError) {
        setFormError(error.message);
      } else {
        setFormError("خطا در ذخیره تنظیمات");
      }
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {formError && (
        <FormError errors={{ general: formError }} className="mb-6" />
      )}

      {/* تنظیمات عمومی */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-bold text-gray-800 mb-4">تنظیمات عمومی</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عنوان سایت
            </label>
            <input
              type="text"
              value={formData.siteTitle}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, siteTitle: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <ErrorMessage message={fieldErrors.siteTitle} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              توضیحات سایت
            </label>
            <textarea
              value={formData.siteDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  siteDescription: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={3}
              placeholder="توضیحات سایت"
            />
            <ErrorMessage message={fieldErrors.siteDescription} />
          </div>
        </div>
      </div>

      {/* دکمه ذخیره */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md disabled:opacity-50"
        >
          <MdSave size={20} />
          {isLoading ? "در حال ذخیره..." : "ذخیره تنظیمات"}
        </button>
      </div>
    </div>
  );
}
