"use client";

import { MdError } from "react-icons/md";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

/**
 * ErrorMessage Component
 *
 * A component for displaying error messages in forms and other parts of the application.
 *
 * @param {ErrorMessageProps} props - Component props
 * @returns {JSX.Element} The error message component
 */
export default function ErrorMessage({
  message,
  className = "",
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={`flex items-center gap-2 text-red-600 text-sm mt-1 ${className}`}
    >
      <MdError size={16} />
      <span>{message}</span>
    </div>
  );
}
