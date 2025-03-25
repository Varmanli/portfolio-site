export function Header() {
  return (
    <header className="flex justify-center items-center py-4 lg:py-10 border-b-5 border-black z-10 relative">
      <nav className="border-3 border-black bg-white relative">
        <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute top-[-18%] right-[-2.2%]"></div>
        <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute bottom-[-18%] right-[-2.2%]"></div>
        <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute bottom-[-18%] left-[-2.2%]"></div>
        <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute top-[-18%] left-[-2.2%]"></div>
        <ul className="flex gap-3  lg:gap-10 font-black text-[11.5px] lg:text-xl p-4">
          <li>صفحه اصلی</li>
          <li>درباره من</li>
          <li>خدمات</li>
          <li>نمونه کارها</li>
          <li>استخدام من</li>
        </ul>
      </nav>
    </header>
  );
}
