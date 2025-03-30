"use client";

interface FormErrorProps {
  errors: Record<string, string>;
  className?: string;
}

export default function FormError({ errors }: FormErrorProps) {
  return (
    <div className="bg-red-100 text-red-700 p-3 rounded-md space-y-1">
      {Object.entries(errors).map(([field, message]) => (
        <p key={field}>
          <strong>{field}:</strong> {message}
        </p>
      ))}
    </div>
  );
}
