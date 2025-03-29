import Link from "next/link";
import { MdError, MdArrowBack } from "react-icons/md";

export default function ContentNotFound() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-red-100 rounded-lg">
            <MdError size={24} className="text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">محتوا یافت نشد</h1>
        </div>

        <p className="text-gray-600 mb-8">
          بخش محتوای مورد نظر شما در سیستم وجود ندارد یا حذف شده است.
        </p>

        <Link
          href="/admin/dashboard/content"
          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <MdArrowBack size={20} />
          <span>بازگشت به مدیریت محتوا</span>
        </Link>
      </div>
    </div>
  );
}
