export interface GalleryImage {
  id: number;
  imageUrl: string;
}
export interface Portfolio {
  id: number;
  title: string;
  slug: string;
  shortDesc?: string;
  content: string;
  thumbnail: string;
  gallery: GalleryImage[];
}
export interface GalleryItem {
  id: string;
  src: string;
}

export type ProjectFormData = {
  title: string;
  caption: string;
  mainImage: File | null;
  mainPreview: string;
  gallery: File[];
  galleryPreviews: GalleryItem[];
  content: string;
};
