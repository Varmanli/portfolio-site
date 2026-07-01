import type { Metadata } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

/**
 * Builds a consistent Metadata object (title, description, canonical,
 * OpenGraph, Twitter card) for a given page so every public route shares
 * the same shape instead of ad-hoc per-page metadata.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: absoluteUrl(image) }] : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Melika Shemirani",
      locale: "fa_IR",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
}
