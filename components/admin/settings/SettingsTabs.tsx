import { Globe, Search, Share2, User } from "lucide-react";

export type SettingsTabKey = "general" | "personal" | "social" | "seo";

interface SettingsTabsProps {
  activeTab: SettingsTabKey;
  onTabChange: (tab: SettingsTabKey) => void;
}

const tabs: {
  key: SettingsTabKey;
  label: string;
  description: string;
  icon: typeof Globe;
}[] = [
  {
    key: "general",
    label: "اطلاعات عمومی",
    description: "نام و توضیحات سایت",
    icon: Globe,
  },
  {
    key: "personal",
    label: "اطلاعات شخصی",
    description: "نام، عنوان شغلی و بیوگرافی",
    icon: User,
  },
  {
    key: "social",
    label: "شبکه‌های اجتماعی",
    description: "لینک صفحات و پیام‌رسان‌ها",
    icon: Share2,
  },
  {
    key: "seo",
    label: "سئو و فرم تماس",
    description: "متادیتای پیش‌فرض و رفتار فرم تماس",
    icon: Search,
  },
];

export default function SettingsTabs({
  activeTab,
  onTabChange,
}: SettingsTabsProps) {
  return (
    <div
      dir="rtl"
      className="mb-6 rounded-[2rem] border-2 border-black bg-white p-2 shadow-[8px_8px_0_#111]"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              aria-pressed={isActive}
              className={[
                "group relative overflow-hidden rounded-[1.5rem] border-2 border-black px-4 py-4 text-right transition",
                "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111]",
                isActive
                  ? "bg-[#FFF7D8] shadow-[5px_5px_0_#F196E5]"
                  : "bg-white shadow-[4px_4px_0_#111]",
              ].join(" ")}
            >
              <div
                className={[
                  "pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full blur-2xl transition",
                  isActive
                    ? "bg-[#F196E5]/45"
                    : "bg-[#CAF3AB]/30 opacity-0 group-hover:opacity-100",
                ].join(" ")}
              />

              <div className="relative z-10 flex items-center gap-4">
                <span
                  className={[
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black text-black shadow-[3px_3px_0_#111] transition",
                    isActive
                      ? "bg-[#FFE066]"
                      : "bg-[#CAF3AB] group-hover:bg-[#FFE066]",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-black text-black">
                    {tab.label}
                  </span>

                  <span className="mt-1 block text-xs font-bold leading-6 text-black/50">
                    {tab.description}
                  </span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
