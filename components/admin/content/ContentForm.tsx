"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/shared/RichTextEditor";
import { ContentSection } from "@/types/admin";
import { ValidationError } from "@/types/errors";
import { showSuccess, showError } from "@/lib/utils/toast";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorMessage from "@/components/shared/ErrorMessage";
import FormError from "@/components/shared/FormError";

interface ContentFormProps {
  section: ContentSection;
  onSave: (content: ContentSection) => Promise<void>;
  onCancel: () => void;
}

/**
 * ContentForm Component
 *
 * A form component for editing content sections with rich text editor and image upload.
 *
 * @param {ContentFormProps} props - Component props
 * @returns {JSX.Element} The content form component
 */
export default function ContentFormWrapper({
  section,
  onSave,
  onCancel,
}: ContentFormProps) {
  const [formData, setFormData] = useState<ContentSection>(section);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = "عنوان نمی‌تواند خالی باشد";
    }
    if (!formData.content.trim() && !formData.isImage) {
      errors.content = "محتوا نمی‌تواند خالی باشد";
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
      showSuccess("محتوا با موفقیت ذخیره شد");
      onCancel();
    } catch (error) {
      if (error instanceof ValidationError) {
        setFormError(error.message);
      } else {
        setFormError("خطا در ذخیره محتوا");
      }
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <ContentFormContent
        section={section}
        onSave={handleSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
        formError={formError}
        fieldErrors={fieldErrors}
      />
    </ErrorBoundary>
  );
}

function ContentFormContent({ section, onSave, onCancel, isLoading, formError, fieldErrors }: ContentFormProps) {
  const [content, setContent] = useState(section.content);

  return (
    <div className="space-y-4">
      {section.isImage ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor={`image-upload-${section.id}`}
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">برای آپلود کلیک کنید</span> یا
                  فایل را بکشید
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG یا GIF (حداکثر 2MB)
                </p>
              </div>
              <input
                id={`image-upload-${section.id}`}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setContent(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
          {content && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                پیش‌نمایش تصویر:
              </h3>
              <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                <img
                  src={content}
                  alt="پیش‌نمایش"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <RichTextEditor
          content={content}
          onChange={setContent}
          placeholder="محتوا را وارد کنید..."
          className="min-h-[200px]"
        />
      )}

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          انصراف
        </button>
        <button
          onClick={onSave}
          disabled={isLoading}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md disabled:opacity-50"
        >
          {isLoading ? "در حال ذخیره..." : "ذخیره"}
        </button>
      </div>

      {formError && <ErrorMessage message={formError} />}
      {Object.keys(fieldErrors).length > 0 && <FormError errors={fieldErrors} />}
    </div>
  );
}
