import { Service } from "@/types/service";
import {
  ApiError,
  NetworkError,
  ValidationError,
  NotFoundError,
} from "@/types/errors";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/services`;

export const serviceApi = {
  /**
   * دریافت همه سرویس‌ها
   */
  getAll: async (): Promise<Service[]> => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("خطا در دریافت سرویس‌ها");
      return await res.json();
    } catch (error) {
      throw new NetworkError("ارتباط با سرور برقرار نشد");
    }
  },

  /**
   * ساخت سرویس جدید
   */
  create: async (data: { title: string }): Promise<Service> => {
    try {
      if (!data.title) {
        throw new ValidationError("عنوان نمی‌تواند خالی باشد");
      }

      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("خطا در ساخت سرویس جدید");
      return await res.json();
    } catch (error) {
      throw new ApiError("خطا در ساخت سرویس");
    }
  },

  /**
   * ویرایش یک سرویس
   */
  update: async (id: number, data: { title: string }): Promise<Service> => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("خطا در ویرایش سرویس");
      return await res.json();
    } catch (error) {
      throw new ApiError("خطا در ویرایش سرویس");
    }
  },

  /**
   * حذف سرویس
   */
  delete: async (id: number): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("خطا در حذف سرویس");
    } catch (error) {
      throw new ApiError("خطا در حذف سرویس");
    }
  },
};
