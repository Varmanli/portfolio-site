// UI Component Props
export interface StarIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export interface AccentButtonProps {
  text: string;
  textSize?: "text-sm" | "text-base" | "text-lg" | "text-xl" | "text-2xl";
  margin?: string;
  className?: string;
  onClick?: () => void;
}

export interface LottieIconProps {
  src: object; // Lottie animation data
  size?: number; // Base pixel size
  sizeMobile?: number; // Mobile size (optional)
  sizeLg?: number; // Desktop size (optional)
  className?: string; // Additional classes
  loop?: boolean; // Whether animation should loop
  autoplay?: boolean; // Whether animation should autoplay
}

// Contact Component Props
export interface ContactRowProps {
  icons: React.ReactNode[];
  text: string;
}

// Service Types
export type ServiceItem = string;

// Metadata Types
export interface PageMetadata {
  title: string;
  description: string;
}
