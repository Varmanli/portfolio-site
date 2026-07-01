import { Globe, User, Share2, Search } from "lucide-react";

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
    <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-2 shadow-sm">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={[
                "group flex items-center gap-3 rounded-2xl px-4 py-4 text-right transition-all duration-200",
                isActive
                  ? "bg-yellow-50 text-yellow-700 shadow-sm ring-1 ring-yellow-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition",
                  isActive
                    ? "bg-yellow-500 text-white shadow-sm shadow-yellow-200"
                    : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-yellow-600",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" />
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-bold">{tab.label}</span>
                <span
                  className={[
                    "mt-1 block text-xs leading-5",
                    isActive ? "text-yellow-700/70" : "text-gray-400",
                  ].join(" ")}
                >
                  {tab.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
