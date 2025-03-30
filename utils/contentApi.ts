import { ContentSection } from "@/types/admin";
import {
  ApiError,
  NotFoundError,
  ValidationError,
  NetworkError,
} from "@/types/errors";

export const contentApi = {
  getAll: async (): Promise<ContentSection[]> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content`);
      if (!res.ok) throw new Error("Failed to fetch content sections");
      return res.json();
    } catch (error) {
      throw new NetworkError("خطا در دریافت لیست محتوا");
    }
  },

  getById: async (id: number): Promise<ContentSection> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/content/${id}`
      );
      if (res.status === 404)
        throw new NotFoundError(`محتوا با شناسه ${id} یافت نشد`);
      if (!res.ok) throw new Error("Failed to fetch content section");
      return res.json();
    } catch (error) {
      throw new NetworkError("خطا در دریافت محتوای صفحه");
    }
  },

  update: async (id: number, content: ContentSection): Promise<void> => {
    try {
      if (!content.title || !content.content) {
        throw new ValidationError("عنوان و محتوا نمی‌تواند خالی باشد");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/content/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(content),
        }
      );

      if (!res.ok) throw new Error("خطا در به‌روزرسانی محتوا");
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(`خطا در ذخیره محتوا: ${error.message}`);
      }
      throw new ApiError(`خطا در ذخیره محتوا`);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/content/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("خطا در حذف محتوا");
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(`خطا در حذف محتوا: ${error.message}`);
      }
      throw new ApiError("خطا در حذف محتوا");
    }
  },
};
