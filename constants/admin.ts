import { Message, SiteSettings, ContentSection } from "@/types/admin";

/**
 * Mock data for messages
 * This will be replaced with actual API data in production
 */
export const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    name: "علی محمدی",
    email: "ali@example.com",
    subject: "پیشنهاد همکاری",
    content: "سلام، من یک پیشنهاد همکاری دارم...",
    isRead: false,
    createdAt: "2024-03-29T12:00:00Z",
  },
  {
    id: "2",
    name: "سارا احمدی",
    email: "sara@example.com",
    subject: "سوال در مورد پروژه",
    content: "سلام، من سوالی در مورد پروژه شما دارم...",
    isRead: true,
    createdAt: "2024-03-28T15:30:00Z",
  },
];

/**
 * Mock data for site settings
 * This will be replaced with actual API data in production
 */
export const MOCK_SETTINGS: SiteSettings = {
  siteTitle: "ملیکا شمیرانی",
  siteDescription: "پورتفولیو شخصی",
  socialLinks: {
    instagram: "https://instagram.com/example",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  },
};

/**
 * Mock data for content sections
 * This will be replaced with actual API data in production
 */
export const MOCK_CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "1",
    type: "home",
    title: "معرفی اولیه",
    content: "سلام من ملیکا شمیرانی هستم",
  },
  {
    id: "2",
    type: "home",
    title: "درباره من",
    content: "متن معرفی کوتاه در صفحه اصلی",
  },
  {
    id: "3",
    type: "home",
    title: "عکس پروفایل",
    content: "",
    isImage: true,
  },
  {
    id: "4",
    type: "home",
    title: "متن دکمه",
    content: "مشاهده نمونه کارها",
  },
  {
    id: "5",
    type: "contact",
    title: "توضیحات",
    content: "متن کامل درباره من در صفحه تماس",
  },
  {
    id: "6",
    type: "contact",
    title: "شماره تماس",
    content: "شماره تماس شما",
  },
  {
    id: "7",
    type: "contact",
    title: "ایمیل",
    content: "ایمیل شما",
  },
  {
    id: "8",
    type: "contact",
    title: "محل زندگی",
    content: "آدرس محل زندگی",
  },
];
