import { ServiceItem, ContactInfo } from "@/types/pageContent";

/**
 * Static content and configuration for the application
 * TODO: Replace with API calls when backend is ready
 */

/**
 * List of services offered
 * @type {ServiceItem[]} Array of service items
 */
export const SERVICES: ServiceItem[] = [
  {
    id: "1",
    title: "آماده‌سازی فایل برای انواع چاپ",
    description: "آماده‌سازی فایل‌های گرافیکی برای انواع چاپ",
    categoryId: "print",
    tags: ["چاپ", "گرافیک"],
  },
  {
    id: "2",
    title: "طراحی لیبل و لفاف بسته‌بندی",
    description: "طراحی حرفه‌ای لیبل و بسته‌بندی محصولات",
    categoryId: "packaging",
    tags: ["بسته‌بندی", "لیبل"],
  },
  // ... other services
];

/**
 * Contact information
 * @type {ContactInfo[]} Array of contact methods
 */
export const CONTACT_INFO: ContactInfo[] = [
  {
    id: "1",
    type: "phone",
    value: "+989102408010",
    icon: "phone",
    isPrimary: true,
  },
  {
    id: "2",
    type: "email",
    value: "m.shemirani33@gmail.com",
    icon: "email",
  },
  {
    id: "3",
    type: "location",
    value: "تهران",
    icon: "location",
  },
];

/**
 * Navigation menu items
 */
export const NAV_ITEMS = [
  {
    id: "home",
    label: "خانه",
    href: "/",
  },
  {
    id: "portfolio",
    label: "نمونه کارها",
    href: "/portfolio",
  },
  {
    id: "services",
    label: "خدمات",
    href: "/services",
  },
  {
    id: "hire-me",
    label: "همکاری",
    href: "/hire-me",
  },
];

/**
 * Social media links
 */
export const SOCIAL_LINKS = [
  {
    id: "instagram",
    label: "اینستاگرام",
    href: "https://instagram.com/your-username",
    icon: "instagram",
  },
  {
    id: "telegram",
    label: "تلگرام",
    href: "https://t.me/your-username",
    icon: "telegram",
  },
  {
    id: "whatsapp",
    label: "واتساپ",
    href: "https://wa.me/your-number",
    icon: "whatsapp",
  },
];
