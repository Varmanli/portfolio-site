"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface contactPageFromTypes {
  contact_desc: string;
  contact_phone: string;
  contact_email: string;
  contact_city: string;
}

export default function ContentContactPageForm() {
  const [contactPageFrom, setContactPageForm] = useState<contactPageFromTypes>({
    contact_desc: "",
    contact_phone: "",
    contact_email: "",
    contact_city: "",
  });

  const handleInputContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactPageForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toKeyValueArray = (
    data: Record<string, any>,
    skipKeys: string[] = []
  ) => {
    return Object.entries(data)
      .filter(([key]) => !skipKeys.includes(key))
      .map(([key, value]) => ({
        key,
        value: String(value),
      }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      toast.loading("در حال ذخیره اطلاعات...");

      const payload = toKeyValueArray(contactPageFrom);

      for (const item of payload) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/home-content`,
          item,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // اگر نیاز به احراز هویت داری
          }
        );
      }

      toast.dismiss();
      toast.success("✅ اطلاعات با موفقیت ذخیره شد");
    } catch (err: any) {
      toast.dismiss();
      toast.error(`❌ ${err.message || "خطایی رخ داد"}`);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await axios.get<{ key: string; value: string }[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/home-content`,
          { withCredentials: true }
        );

        const mappedData = res.data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, string>);

        setContactPageForm((prev) => ({
          ...prev,
          ...mappedData,
        }));
      } catch (err) {
        toast.error("❌ دریافت اطلاعات اولیه با خطا مواجه شد");
        console.error(err);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 ">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            توضیحات
          </label>
          <textarea
            name="contact_desc"
            value={contactPageFrom.contact_desc}
            onChange={handleInputContactChange}
            rows={2}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 h-40"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            شماره
          </label>
          <input
            name="contact_phone"
            value={contactPageFrom.contact_phone}
            onChange={handleInputContactChange}
            type="tel"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            ایمیل
          </label>
          <input
            name="contact_email"
            value={contactPageFrom.contact_email}
            onChange={handleInputContactChange}
            type="email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            شهر
          </label>
          <input
            name="contact_city"
            value={contactPageFrom.contact_city}
            onChange={handleInputContactChange}
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <button
          type="submit"
          className="w-30 ms-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition "
        >
          ثبت تغییرات
        </button>
      </div>
    </form>
  );
}
