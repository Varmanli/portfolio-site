"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "yellow" | "blue" | "red" | "green";
  className?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  color = "yellow",
  className = "" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4"
  };

  const colorClasses = {
    yellow: "border-yellow-500",
    blue: "border-blue-500",
    red: "border-red-500",
    green: "border-green-500"
  };

  return (
    <div className={`inline-block ${className}`}>
      <div
        className={`
          animate-spin rounded-full 
          border-solid border-t-transparent
          ${sizeClasses[size]}
          ${colorClasses[color]}
        `}
      />
    </div>
  );
} 