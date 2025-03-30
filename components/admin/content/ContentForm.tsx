"use client";

import { useState } from "react";
import RichTextEditor from "@/components/shared/RichTextEditor";
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

interface ContentFormContentProps {
  section: ContentSection;
  setFormData: React.Dispatch<React.SetStateAction<ContentSection>>;
  onSave: () => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  formError: string | null;
  fieldErrors: Record<string, string>;
}

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
    if (!formData.content.trim()) {
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
    } catch (error: unknown) {
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
        section={formData}
        setFormData={setFormData}
        onSave={handleSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
        formError={formError}
        fieldErrors={fieldErrors}
      />
    </ErrorBoundary>
  );
}

function ContentFormContent({
  section,
  setFormData,
  onSave,
  onCancel,
  isLoading,
  formError,
  fieldErrors,
}: ContentFormContentProps) {
  return (
    <div className="space-y-4">
      <RichTextEditor
        value={section.content}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, content: value }))
        }
        placeholder="محتوا را وارد کنید..."
        className="min-h-[200px]"
      />

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
      {Object.keys(fieldErrors).length > 0 && (
        <FormError errors={fieldErrors} />
      )}
    </div>
  );
}
