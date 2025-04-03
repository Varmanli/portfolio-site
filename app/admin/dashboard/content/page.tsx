"use client";
import { useState } from "react";

import ContentContactPageForm from "@/components/admin/content/ContentContactPageForm";
import ContentHomPageForm from "@/components/admin/content/ContentHomPageForm";
import ContentTabs from "@/components/admin/content/ContentTabs";

export default function page() {
  const [activeTab, setActiveTab] = useState<"home" | "contact">("home");

  return (
    <div className="lg:mx-60">
      <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "home" ? (
        <ContentHomPageForm />
      ) : (
        <ContentContactPageForm />
      )}
    </div>
  );
}
