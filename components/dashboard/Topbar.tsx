// components/dashboard/Topbar.tsx
export default function Topbar() {
  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">خوش‌اومدی به داشبورد ✨</h1>
      <button className="text-red-500 font-medium hover:underline">خروج</button>
    </div>
  );
}
