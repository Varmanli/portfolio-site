export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** A local asset that is always shipped with the standalone application. */
export const PROFILE_IMAGE_FALLBACK = "/images/melika.png";

const ALLOWED_REMOTE_IMAGE_HOSTS = new Set([
  "personal-tarsier-varmanli-69caf64d.koyeb.app",
  "shemirani.s3.ir-thr-at1.arvanstorage.ir",
]);

/**
 * Returns an image source that Next/Image can safely render, or null when the
 * value is missing/malformed. Keeping this check at the UI boundary prevents
 * nullable database/API values from reaching <Image />.
 */
export function getSafeImageSource(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const source = value.trim();
  if (!source) return null;

  if (source.startsWith("/") && !source.startsWith("//")) return source;
  if (source.startsWith("blob:")) return source;

  try {
    const url = new URL(source);
    return url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.pathname !== "/" &&
      ALLOWED_REMOTE_IMAGE_HOSTS.has(url.hostname)
      ? source
      : null;
  } catch {
    return null;
  }
}

export function getProfileImageSource(value: unknown): string {
  return getSafeImageSource(value) ?? PROFILE_IMAGE_FALLBACK;
}

export function validateImage(file: File): {
  isValid: boolean;
  error?: string;
} {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "فقط تصاویر JPG، PNG، GIF و WEBP مجاز هستند.",
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "حجم تصویر نمی‌تواند بیشتر از ۵ مگابایت باشد.",
    };
  }

  return { isValid: true };
}
