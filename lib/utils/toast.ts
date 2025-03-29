import toast from "react-hot-toast";
import { AppError } from "@/types/errors";

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (error: unknown) => {
  if (error instanceof AppError) {
    toast.error(error.message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("خطای ناشناخته رخ داده است");
  }
}; 