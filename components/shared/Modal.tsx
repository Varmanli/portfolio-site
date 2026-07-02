"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="بستن مودال"
        onClick={onClose}
        tabIndex={-1}
      />

      <div className="relative z-10 w-full max-w-lg rounded-[1.5rem] border-2 border-black bg-white p-6 text-right shadow-[10px_10px_0_#111]">
        <button
          type="button"
          onClick={onClose}
          tabIndex={-1}
          className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-lg border-2 border-[#FFE066] bg-white px-2 py-1 text-xs font-bold text-black outline-none transition hover:bg-[#FFF7D8]"
          aria-label="بستن"
        >
          بستن
          <MdClose size={16} />
        </button>

        <div className="pt-8">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
