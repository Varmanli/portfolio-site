interface ContentTabsProps {
  activeTab: "home" | "contact";
  onTabChange: (tab: "home" | "contact") => void;
}

/**
 * ContentTabs Component
 *
 * A component for switching between home and contact content sections.
 *
 * @param {ContentTabsProps} props - Component props
 * @returns {JSX.Element} The content tabs component
 */
export default function ContentTabs({
  activeTab,
  onTabChange,
}: ContentTabsProps) {
  return (
    <div className="flex gap-4 border-b mb-6">
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "home"
            ? "text-yellow-600 border-b-2 border-yellow-600"
            : "text-gray-600"
        }`}
        onClick={() => onTabChange("home")}
      >
        صفحه اصلی
      </button>
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "contact"
            ? "text-yellow-600 border-b-2 border-yellow-600"
            : "text-gray-600"
        }`}
        onClick={() => onTabChange("contact")}
      >
        تماس با من
      </button>
    </div>
  );
}
