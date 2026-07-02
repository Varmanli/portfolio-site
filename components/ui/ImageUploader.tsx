"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { MdCloudUpload, MdImage, MdOpenInFull } from "react-icons/md";

interface ImageUploaderProps {
  label: string;
  preview?: string;
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPreviewClick?: () => void;
  multiple?: boolean;
}

export function ImageUploader({
  label,
  preview,
  onImageChange,
  onPreviewClick,
  multiple = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const emitFilesAsInputChange = (files: FileList) => {
    if (!files.length || !onImageChange) return;

    const selectedFiles = multiple ? Array.from(files) : [files[0]];
    const dataTransfer = new DataTransfer();

    selectedFiles.forEach((file) => {
      if (file) dataTransfer.items.add(file);
    });

    const syntheticEvent = {
      target: {
        files: dataTransfer.files,
        value: "",
      },
      currentTarget: {
        files: dataTransfer.files,
        value: "",
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onImageChange(syntheticEvent);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const files = e.dataTransfer.files;
    emitFilesAsInputChange(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  };

  return (
    <div dir="rtl" className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
        multiple={multiple}
      />

      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-[#FFE066] text-black shadow-[2px_2px_0_#111]">
          <MdImage size={20} />
        </span>

        <label className="text-sm font-black text-black">{label}</label>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={openFilePicker}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFilePicker();
          }
        }}
        className={`group flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center outline-none transition ${
          isDragging
            ? "border-black bg-[#CAF3AB] shadow-[5px_5px_0_#111]"
            : "border-black/35 bg-white hover:border-black hover:bg-[#FFF7D8] hover:shadow-[4px_4px_0_#111]"
        }`}
      >
        <span
          className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-black text-black shadow-[3px_3px_0_#111] transition ${
            isDragging ? "bg-white" : "bg-[#CAF3AB] group-hover:bg-[#FFE066]"
          }`}
        >
          <MdCloudUpload size={30} />
        </span>

        <p className="text-sm font-black text-black">
          {isDragging
            ? "رها کن تا تصویر اضافه شود"
            : multiple
              ? "تصاویر را اینجا بکشید یا برای انتخاب کلیک کنید"
              : "تصویر را اینجا بکشید یا برای انتخاب کلیک کنید"}
        </p>

        <p className="mt-2 text-xs font-bold leading-6 text-black/45">
          فقط فایل تصویری مجاز است
          {multiple ? " — امکان انتخاب چند تصویر وجود دارد." : "."}
        </p>

        <span className="mt-4 inline-flex rounded-2xl border-2 border-black bg-white px-4 py-2 text-xs font-black text-black shadow-[3px_3px_0_#111] transition group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
          {multiple ? "انتخاب تصاویر" : "انتخاب تصویر"}
        </span>
      </div>

      {preview && (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-black text-black/55">پیش‌نمایش تصویر</p>

            {onPreviewClick && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreviewClick();
                }}
                className="inline-flex items-center gap-1 rounded-xl border-2 border-black bg-white px-3 py-1.5 text-xs font-black text-black shadow-[2px_2px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#111]"
              >
                <MdOpenInFull size={15} />
                مشاهده
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onPreviewClick}
            className="group relative block h-48 w-full overflow-hidden rounded-2xl border-2 border-black bg-gray-100 shadow-[4px_4px_0_#111]"
          >
            <Image
              src={preview}
              alt="preview"
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
          </button>
        </div>
      )}
    </div>
  );
}
