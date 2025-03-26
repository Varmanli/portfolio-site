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
 * Type for individual service items
 * TODO: Update to include additional service metadata when API integration is added
 */
export type ServiceItem = string;

/**
 * Metadata Types
 */

/**
 * Interface for page metadata
 * @property {string} title - Page title
 * @property {string} description - Page description
 */
export interface PageMetadata {
  title: string;
  description: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
}
