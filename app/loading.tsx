import React from "react";
import LoadingOverlay from "@/components/shared/LoadingOverlay";

export default function RootLoading(): React.ReactElement {
  return <LoadingOverlay message="در حال بارگذاری صفحه..." />;
}
