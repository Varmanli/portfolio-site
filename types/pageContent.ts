/**
 * UI Component Props
 */

/**
 * Props for the StarIcon component
 * @property {number} [size=60] - Base size of the star icon in pixels
 * @property {string} [color="#F3ABCB"] - Color of the star icon
 * @property {string} [className=""] - Additional CSS classes to apply
 */
export interface StarIconProps {
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Props for the AccentButton component
 * @property {string} text - Button text content
 * @property {"text-sm" | "text-base" | "text-lg" | "text-xl" | "text-2xl"} [textSize="text-xl"] - Text size class
 * @property {string} [margin=""] - Additional margin classes
 * @property {string} [className=""] - Additional CSS classes
 * @property {() => void} [onClick] - Click handler function
 */
export interface AccentButtonProps {
  text: string;
  textSize?: "text-sm" | "text-base" | "text-lg" | "text-xl" | "text-2xl";
  margin?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Props for the LottieIcon component
 * @property {object} src - Lottie animation data object
 * @property {number} [size=160] - Base size in pixels
 * @property {number} [sizeMobile] - Size for mobile devices (falls back to base size)
 * @property {number} [sizeLg] - Size for large screens (falls back to base size)
 * @property {string} [className=""] - Additional CSS classes
 * @property {boolean} [loop=false] - Whether animation should loop
 * @property {boolean} [autoplay=true] - Whether animation should autoplay
 */
export interface LottieIconProps {
  src: object;
  size?: number;
  sizeMobile?: number;
  sizeLg?: number;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

/**
 * Contact Component Props
 */

/**
 * Props for the ContactRow component
 * @property {React.ReactNode[]} icons - Array of icon components to display
 * @property {string} text - Contact information text
 */
export interface ContactRowProps {
  icons: React.ReactNode[];
  text: string;
}

/**
 * Service Types
 */

/**
 * Service category information
 * @property {string} id - Unique identifier for the category
 * @property {string} name - Display name of the category
 * @property {string} description - Category description
 */
export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

/**
 * Individual service item
 * @property {string} id - Unique identifier for the service
 * @property {string} title - Service title
 * @property {string} description - Service description
 * @property {string} categoryId - ID of the parent category
 * @property {string} [imageUrl] - Optional image URL for the service
 * @property {string[]} [tags] - Optional tags for filtering
 */
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  imageUrl?: string;
  tags?: string[];
}

/**
 * Portfolio Types
 */

/**
 * Portfolio item information
 * @property {string} id - Unique identifier for the portfolio item
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} image - Main image URL
 * @property {string[]} [galleryUrls] - Optional gallery image URLs
 * @property {string[]} [tags] - Optional tags for filtering
 * @property {string} [clientName] - Optional client name
 * @property {Date} [completionDate] - Optional project completion date
 */
export interface PortfolioItem {
  id: string;
  title: string;
  shortDesc: string;
  thumbnail: string;
  gallery: PortfolioGalleryItem[];
  galleryUrls?: string[];
  slug: string;
  clientName?: string;
  completionDate?: Date;
}
export type PortfolioGalleryItem = {
  id: number;
  imageUrl: string;
};

/**
 * Contact Types
 */

/**
 * Contact information
 * @property {string} id - Unique identifier for the contact entry
 * @property {string} type - Contact type (phone, email, etc.)
 * @property {string} value - Contact value
 * @property {string} [icon] - Optional icon identifier
 * @property {boolean} [isPrimary] - Whether this is a primary contact method
 */
export interface ContactInfo {
  id: string;
  type: string;
  value: string;
  icon?: string;
  isPrimary?: boolean;
}

/**
 * Metadata Types
 */

/**
 * Interface for page metadata
 * @property {string} title - Page title
 * @property {string} description - Page description
 * @property {string} [keywords] - Optional SEO keywords
 * @property {string} [ogImage] - Optional Open Graph image URL
 */
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

/**
 * API Response Types
 */

/**
 * Generic API response wrapper
 * @template T - Type of the response data
 * @property {T} data - Response data
 * @property {string} [message] - Optional response message
 * @property {boolean} success - Whether the request was successful
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * API error response
 * @property {string} message - Error message
 * @property {string} [code] - Optional error code
 * @property {Record<string, string[]>} [errors] - Optional validation errors
 */
export interface ApiError {
  id: number;
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}
