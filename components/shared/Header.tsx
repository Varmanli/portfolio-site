"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StarIcon from "../ui/StarIcon";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "صفحه اصلی" },
    { href: "/services", label: "خدمات" },
    { href: "/portfolio", label: "نمونه کارها" },
    { href: "/hire-me", label: "استخدام من" },
  ];

  return (
    <>
      <header className="flex justify-center items-center py-4 lg:py-10 z-10 relative">
        <nav className="border-3 border-black bg-white relative">
          {/* گوشه‌های کادر */}
          <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute top-[-18%] right-[-2.2%]"></div>
          <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute bottom-[-18%] right-[-2.2%]"></div>
          <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute bottom-[-18%] left-[-2.2%]"></div>
          <div className="w-3.5 h-3.5 border-3 border-black bg-white absolute top-[-18%] left-[-2.2%]"></div>

          <ul className="flex gap-3 lg:gap-10 font-black text-[13.5px] lg:text-xl p-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative  transition-all duration-300 ease-in-out
                    after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[4px] 
                    after:rounded-full after:transition-all after:duration-300 after:ease-in-out
                    ${
                      pathname === item.href
                        ? "after:w-full after:bg-[#F196E5]"
                        : "after:w-0 after:bg-[#F196E5] hover:after:w-full"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ستاره دکوری */}
      <StarIcon
        className="absolute left-30 top-[0] lg:left-[61%] z-0"
        size={140}
        color="#F3ABCB"
      />
    </>
  );
}
