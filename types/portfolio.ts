export interface GalleryImage {
  id: number;
  imageUrl: string;
  portfolioId: number;
}

export interface Portfolio {
  id: number;
  title: string;
  shortDesc: string;
  content: string;
  thumbnail: string;
  gallery: GalleryImage[]; // این بمونه چون برای گرفتن پروژه کامل لازمه
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePortfolioDto {
  title: string;
  slug: string;
  thumbnail: string;
  shortDesc: string;
  content: string;
}

export interface UpdatePortfolioDto extends Partial<CreatePortfolioDto> {}
