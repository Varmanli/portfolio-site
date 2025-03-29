import Link from "next/link";
import { MdError, MdHome } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-sm border text-center">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="p-3 bg-red-100 rounded-full">
            <MdError size={32} className="text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">404</h1>
          <h2 className="text-xl font-semibold text-gray-700">صفحه یافت نشد</h2>
        </div>

        <p className="text-gray-600 mb-8">
          متأسفانه صفحه مورد نظر شما در سایت یافت نشد. ممکن است این صفحه حذف شده
          یا آدرس آن تغییر کرده باشد.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <MdHome size={24} />
          <span>بازگشت به صفحه اصلی</span>
        </Link>
      </div>
    </div>
  );
}
