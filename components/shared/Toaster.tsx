"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export default function Toaster() {
  return (
    <HotToaster
      position="bottom-left"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#333',
          color: '#fff',
          fontFamily: 'vazirmatn',
        },
        success: {
          style: {
            background: '#059669',
          },
        },
        error: {
          style: {
            background: '#DC2626',
          },
        },
      }}
    />
  );
} 