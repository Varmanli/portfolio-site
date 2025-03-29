"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export default function Toaster() {
  return (
    <HotToaster
      position="bottom-left"
      toastOptions={{
        duration: 4000,
        className: "font-vazirmatn",
        success: {
          className: "bg-green-50 text-green-800 border border-green-200",
          iconTheme: {
            primary: "#22c55e",
            secondary: "#f0fdf4",
          },
        },
        error: {
          className: "bg-red-50 text-red-800 border border-red-200",
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
        },
      }}
    />
  );
} 