/**
 * Interface for login form data
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Interface for login form validation errors
 */
export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

/**
 * Interface for content sections in the website
 */
export interface ContentSection {
  id: string;
  title: string;
  content: string;
  contentType: "text" | "image";
  sectionType: "home" | "contact";
  createdAt?: string;
  updatedAt?: string;
  isImage?: boolean;
}
export interface ContentFormProps {
  section: ContentSection;
  onSave: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  formError?: string | null;
  fieldErrors?: Record<string, string>;
}
/**
 * Interface for content data
 */
export interface ContentData {
  title: string;
  content: string;
  contentType: "text" | "image";
  sectionType: "home" | "contact";
}

/**
 * Interface for admin user data
 */
export interface Admin {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  lastLogin?: string;
}

/**
 * Interface for social media links
 */
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

/**
 * Interface for site settings
 */
export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    github: string;
  };
}

/**
 * Interface for user messages
 */
export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  // هر چی دیگه هم هست اضافه کن
}
