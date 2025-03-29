export type GalleryItem = {
  id: string;
  src: string;
};

export type ProjectFormData = {
  title: string;
  caption: string;
  mainImage: File | null;
  mainPreview: string;
  gallery: File[];
  galleryPreviews: GalleryItem[];
  content: string;
};
