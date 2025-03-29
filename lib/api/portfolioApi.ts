import { Portfolio, CreatePortfolioDto } from "@/types/portfolio";
import { ApiError, NetworkError } from "@/lib/errors";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * پردازش پاسخ‌های API و مدیریت خطاها
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      error.message || "خطا در ارتباط با سرور",
      response.status,
      error.code
    );
  }
  return response.json();
}

export const portfolioApi = {
  /**
   * دریافت همه نمونه‌کارها
   * @returns Promise<Portfolio[]>
   */
  async getAll(): Promise<Portfolio[]> {
    try {
      const response = await fetch(`${API_URL}/portfolios`, {
        cache: "no-store", // غیرفعال کردن cache
      });
      return handleResponse<Portfolio[]>(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof TypeError) throw new NetworkError();
      throw new ApiError("خطا در دریافت نمونه‌کارها", 500);
    }
  },

  /**
   * دریافت یک نمونه‌کار با slug
   * @param slug - شناسه یکتای نمونه‌کار
   */
  async getBySlug(slug: string): Promise<Portfolio> {
    try {
      const response = await fetch(`${API_URL}/portfolios/slug/${slug}`, {
        cache: "no-store",
      });
      return handleResponse<Portfolio>(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof TypeError) throw new NetworkError();
      throw new ApiError("خطا در دریافت نمونه‌کار", 500);
    }
  },

  /**
   * ایجاد نمونه‌کار جدید
   * @param data - اطلاعات نمونه‌کار جدید
   */
  async create(data: CreatePortfolioDto): Promise<Portfolio> {
    try {
      const response = await fetch(`${API_URL}/portfolios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getToken()}`, // TODO: اضافه کردن توکن
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });
      return handleResponse<Portfolio>(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof TypeError) throw new NetworkError();
      throw new ApiError("خطا در ایجاد نمونه‌کار", 500);
    }
  },

  /**
   * حذف نمونه‌کار
   * @param id - شناسه نمونه‌کار
   */
  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/portfolios/${id}`, {
        method: "DELETE",
        headers: {
          // Authorization: `Bearer ${getToken()}`, // TODO: اضافه کردن توکن
        },
        cache: "no-store",
      });
      await handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof TypeError) throw new NetworkError();
      throw new ApiError("خطا در حذف نمونه‌کار", 500);
    }
  },

  /**
   * بروزرسانی نمونه‌کار
   * @param id - شناسه نمونه‌کار
   * @param data - داده‌های جدید
   */
  async update(
    id: number,
    data: Partial<CreatePortfolioDto>
  ): Promise<Portfolio> {
    try {
      const response = await fetch(`${API_URL}/portfolios/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getToken()}`, // TODO: اضافه کردن توکن
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });
      return handleResponse<Portfolio>(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof TypeError) throw new NetworkError();
      throw new ApiError("خطا در بروزرسانی نمونه‌کار", 500);
    }
  },

  /**
   * دریافت یک نمونه‌کار با شناسه
   * @param id - شناسه نمونه‌کار
   */
  async getById(id: number): Promise<Portfolio> {
    try {
      const response = await fetch(`${API_URL}/portfolios/${id}`, {
        cache: "no-store",
      });

      const data = await response.json();
      console.log("Raw API Response:", data);

      return {
        id: data.id,
        title: data.title || "",
        shortDesc: data.shortDesc || "",
        content: data.content || "",
        thumbnail: data.thumbnail || "",
        // تبدیل gallery به فرمت مورد نیاز
        gallery: (data.gallery || []).map((item: any) => ({
          id: item.id,
          imageUrl: item.imageUrl,
          portfolioId: item.portfolioId,
        })),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  /**
   * آپلود تصویر
   * @param file - فایل تصویر
   */
  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/upload/image`, {
        method: "POST",
        body: formData,
      });
      const data = await handleResponse<{ url: string }>(response);
      return data.url;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("خطا در آپلود تصویر", 500);
    }
  },
};
