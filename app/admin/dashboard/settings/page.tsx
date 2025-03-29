"use client";

import { useState } from "react";
import { MdPerson, MdSecurity, MdSettings, MdAdd } from "react-icons/md";
import Modal from "@/components/shared/Modal";

interface Admin {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

interface SocialLinks {
  instagram: string;
  linkedin: string;
  github: string;
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  socialLinks: SocialLinks;
}

export default function SettingsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "نام سایت",
    siteDescription: "توضیحات سایت",
    contactEmail: "contact@example.com",
    socialLinks: {
      instagram: "",
      linkedin: "",
      github: "",
    },
  });

  const handleAddAdmin = () => {
    if (newAdminData.password !== newAdminData.confirmPassword) {
      alert("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }

    const newAdmin: Admin = {
      id: Date.now().toString(),
      email: newAdminData.email,
      role: newAdminData.role,
      createdAt: new Date().toISOString(),
    };

    setAdmins((prev) => [...prev, newAdmin]);
    setIsModalOpen(false);
    setNewAdminData({
      email: "",
      password: "",
      confirmPassword: "",
      role: "admin",
    });
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setSettings((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof SiteSettings] as SocialLinks),
          [child]: value,
        },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-2">
        <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
          <MdSettings size={24} />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">تنظیمات سایت</h1>
      </div>

      {/* تنظیمات عمومی */}
      <section className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4">تنظیمات عمومی</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نام سایت
            </label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleSettingsChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              توضیحات سایت
            </label>
            <input
              type="text"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleSettingsChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ایمیل تماس
            </label>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleSettingsChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>
      </section>

      {/* مدیریت ادمین‌ها */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold text-gray-700">مدیریت ادمین‌ها</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
          >
            <MdAdd size={20} />
            افزودن ادمین
          </button>
        </div>

        <div className="space-y-4">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="flex items-center justify-between p-4 border rounded-md"
            >
              <div className="flex items-center gap-3">
                <MdPerson className="text-gray-500" size={20} />
                <div>
                  <p className="font-medium text-gray-800">{admin.email}</p>
                  <p className="text-sm text-gray-500">{admin.role}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  setAdmins((prev) => prev.filter((a) => a.id !== admin.id))
                }
                className="text-red-500 hover:text-red-700"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal افزودن ادمین */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">افزودن ادمین جدید</h2>
        <div className="space-y-4">
          <input
            type="email"
            value={newAdminData.email}
            onChange={(e) =>
              setNewAdminData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="ایمیل"
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="password"
            value={newAdminData.password}
            onChange={(e) =>
              setNewAdminData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="رمز عبور"
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="password"
            value={newAdminData.confirmPassword}
            onChange={(e) =>
              setNewAdminData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            placeholder="تکرار رمز عبور"
            className="w-full border rounded-md px-3 py-2"
          />
          <select
            value={newAdminData.role}
            onChange={(e) =>
              setNewAdminData((prev) => ({ ...prev, role: e.target.value }))
            }
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="admin">ادمین</option>
            <option value="super_admin">سوپر ادمین</option>
          </select>
          <button
            onClick={handleAddAdmin}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition"
          >
            افزودن
          </button>
        </div>
      </Modal>
    </div>
  );
}
