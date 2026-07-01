import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import { uploadImageToArvan } from "@/lib/storage/arvan";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const ALLOWED_FOLDERS = new Set(["uploads", "portfolio", "content"]);

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return NextResponse.json(
      { message: "احراز هویت لازم است" },
      { status: 401 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "بدنه درخواست نامعتبر است" },
      { status: 400 }
    );
  }

  const rawFolder = formData.get("folder");
  const folder =
    typeof rawFolder === "string" && ALLOWED_FOLDERS.has(rawFolder)
      ? rawFolder
      : "uploads";

  const files = formData.getAll("files").filter((entry): entry is File => {
    return typeof entry === "object" && entry !== null && "arrayBuffer" in entry;
  });

  if (files.length === 0) {
    return NextResponse.json(
      { message: "هیچ فایلی ارسال نشده است" },
      { status: 400 }
    );
  }

  for (const file of files) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        { message: "فقط فایل‌های تصویری مجاز هستند" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { message: "حجم فایل نباید بیشتر از ۱۰ مگابایت باشد" },
        { status: 400 }
      );
    }
  }

  try {
    const uploaded = await Promise.all(
      files.map(async (file) => ({
        filePath: await uploadImageToArvan(file, folder),
      }))
    );

    return NextResponse.json(uploaded);
  } catch (error) {
    console.error("Arvan upload failed:", error);
    return NextResponse.json(
      { message: "آپلود فایل با خطا مواجه شد" },
      { status: 500 }
    );
  }
}
