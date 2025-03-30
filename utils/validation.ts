import { MESSAGES } from "@/constants/messages";
import { CONFIG } from "@/constants/config"; // مسیر درست رو بزن

export const validateEmail = (email: string): string | undefined => {
  if (!email) return MESSAGES.VALIDATION.REQUIRED_FIELD;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return MESSAGES.VALIDATION.INVALID_EMAIL;
};

export const validateRequired = (value: string): string | undefined => {
  if (!value) return MESSAGES.VALIDATION.REQUIRED_FIELD;
};

export const validateFileSize = (file: File): string | undefined => {
  if (file.size > CONFIG.MAX_FILE_SIZE) {
    return MESSAGES.ERROR.FILE_TOO_LARGE;
  }
};

export const validateFileType = (file: File): string | undefined => {
  if (
    !CONFIG.ACCEPTED_IMAGE_TYPES.includes(
      file.type as (typeof CONFIG.ACCEPTED_IMAGE_TYPES)[number]
    )
  ) {
    return MESSAGES.ERROR.INVALID_FILE_TYPE;
  }
};
