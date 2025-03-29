"use client";

import { useState, useEffect } from "react";
import { MdSettings } from "react-icons/md";
import { SiteSettings } from "@/types/admin";
import { MOCK_SETTINGS } from "@/constants/admin";
import { settingsApi } from "@/lib/api/admin";
import SettingsForm from "@/components/admin/settings/SettingsForm";

/**
 * Settings Page
 *
 * A page for managing site settings including social links and general configurations.
 *
 * @returns {JSX.Element} The settings page component
 */
export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(MOCK_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // TODO: Replace with actual API call
        // const data = await settingsApi.get();
        // setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async (newSettings: SiteSettings) => {
    try {
      // TODO: Replace with actual API call
      // await settingsApi.update(newSettings);
      setSettings(newSettings);
      alert("تنظیمات با موفقیت ذخیره شد");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("خطا در ذخیره تنظیمات");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <MdSettings size={24} className="text-yellow-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">تنظیمات سایت</h1>
      </div>

      <SettingsForm settings={settings} onSave={handleSaveSettings} />
    </div>
  );
}
