"use client";

import type { CSSProperties } from "react";
import { Toaster as HotToaster } from "react-hot-toast";

const baseToastStyle: CSSProperties = {
  fontFamily: "inherit",
  direction: "rtl",
  textAlign: "right",
  fontSize: "0.9rem",
  fontWeight: 500,
  lineHeight: 1.8,
  color: "#374151",
  background: "#ffffff",
  border: "1px solid #f3f4f6",
  borderRadius: "22px",
  padding: "14px 18px",
  minWidth: "260px",
  maxWidth: "min(420px, calc(100vw - 32px))",
  boxShadow:
    "0 20px 45px -18px rgba(15, 23, 42, 0.18), 0 8px 18px -10px rgba(15, 23, 42, 0.08)",
};

export default function Toaster() {
  return (
    <HotToaster
      position="top-center"
      reverseOrder={false}
      gutter={10}
      toastOptions={{
        duration: 4000,
        style: baseToastStyle,
        success: {
          duration: 3000,
          iconTheme: { primary: "#16a34a", secondary: "#f0fdf4" },
          style: { background: "#f0fdf4" },
        },
        error: {
          duration: 5000,
          iconTheme: { primary: "#dc2626", secondary: "#fef2f2" },
          style: { background: "#fef2f2" },
        },
        loading: {
          duration: Infinity,
          iconTheme: { primary: "#f7cb46", secondary: "#fffbeb" },
          style: { background: "#fffbeb" },
        },
      }}
    />
  );
}
