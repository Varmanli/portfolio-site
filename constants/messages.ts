export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'ورود با موفقیت انجام شد',
    CONTENT_SAVED: 'محتوا با موفقیت ذخیره شد',
    SETTINGS_UPDATED: 'تنظیمات با موفقیت بروزرسانی شد',
    IMAGE_UPLOADED: 'تصویر با موفقیت آپلود شد',
  },
  ERROR: {
    LOGIN_FAILED: 'ورود ناموفق بود. لطفا مجددا تلاش کنید',
    INVALID_CREDENTIALS: 'ایمیل یا رمز عبور اشتباه است',
    NETWORK_ERROR: 'خطا در ارتباط با سرور',
    UNAUTHORIZED: 'دسترسی غیر مجاز',
    FILE_TOO_LARGE: 'حجم فایل بیش از حد مجاز است',
    INVALID_FILE_TYPE: 'فرمت فایل پشتیبانی نمی‌شود',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'این فیلد الزامی است',
    INVALID_EMAIL: 'ایمیل وارد شده معتبر نیست',
    MIN_LENGTH: (field: string, length: number) => 
      `${field} باید حداقل ${length} کاراکتر باشد`,
  },
} as const; 