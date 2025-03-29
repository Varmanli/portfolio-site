"use client";

import { MdError } from "react-icons/md";

interface FormErrorProps {
  error: string | null;
  className?: string;
}

export default function FormError({ error, className = "" }: FormErrorProps) {
  if (!error) return null;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 text-red-700">
        <MdError size={20} />
        <p className="text-sm font-medium">{error}</p>
      </div>
    </div>
  );
} 