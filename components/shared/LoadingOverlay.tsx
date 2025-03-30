"use client";

interface LoadingOverlayProps {
  message?: string;
}

export default function LoadingOverlay({
  message = "در حال بارگذاری...",
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-yellow-500/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border-4 border-t-yellow-500 border-r-yellow-500 border-b-transparent border-l-transparent animate-spin" />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {message}
          </h2>
          <p className="text-gray-500">لطفاً چند لحظه صبر کنید</p>
        </div>
      </div>
    </div>
  );
}
