"use client";

import ErrorBoundary from "@/components/shared/ErrorBoundary";
import Toaster from "@/components/shared/Toaster";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">{children}</div>
      <Toaster />
    </ErrorBoundary>
  );
}
