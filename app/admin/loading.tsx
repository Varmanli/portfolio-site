import React from "react";
import LoadingOverlay from "@/components/shared/LoadingOverlay";

export default function AdminLoading(): React.ReactElement {
  return <LoadingOverlay fullScreen message="در حال بارگذاری پنل مدیریت..." />;
}
