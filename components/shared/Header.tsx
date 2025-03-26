"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StarIcon from "../ui/StarIcon";

export function Header() {
  const pathname = usePathname();
  return (
    <>
      {" "}
      <header className="flex justify-center items-center py-4 lg:py-10 border-b-5 border-black z-10 relative">
        <nav className="border-3 border-black bg-white relative">
          <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute top-[-18%] right-[-2.2%]"></div>
          <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute bottom-[-18%] right-[-2.2%]"></div>
          <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute bottom-[-18%] left-[-2.2%]"></div>
          <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute top-[-18%] left-[-2.2%]"></div>
          <ul className="flex gap-3  lg:gap-10 font-black text-[13.5px] lg:text-xl p-4">
            <li>
              <Link
                href="/"
                className={` ${
                  pathname === "/" ? "border-b-4 border-[#F196E5]" : ""
                }`}
              >
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className={` ${
                  pathname === "/services" ? "border-b-4 border-[#F196E5]" : ""
                }`}
              >
                خدمات
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className={` ${
                  pathname === "/portfolio" ? "border-b-4 border-[#F196E5]" : ""
                }`}
              >
                نمونه کارها
              </Link>
            </li>
            <li>
              <Link
                href="/hire-me"
                className={` ${
                  pathname === "/hire-me" ? "border-b-4 border-[#F196E5]" : ""
                }`}
              >
                استخدام من
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <StarIcon
        className="absolute top-[0] left-[61%] z-0"
        size={140}
        color="#F3ABCB"
      />
    </>
  );
}
