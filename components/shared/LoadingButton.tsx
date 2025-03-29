"use client";

import LoadingSpinner from "./LoadingSpinner";

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingButton({
  isLoading,
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}: LoadingButtonProps) {
  const baseClasses =
    "flex items-center justify-center rounded-md font-medium transition-colors";

  const variantClasses = {
    primary:
      "bg-yellow-500 hover:bg-yellow-600 text-white disabled:bg-yellow-300",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100",
    danger: "bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" color="yellow" className="mr-2" />
          <span>در حال پردازش...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
