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
