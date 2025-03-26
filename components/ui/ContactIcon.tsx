import { ReactNode } from "react";

/**
 * Props for the ContactIcon component
 * @property {ReactNode} icon - The icon component to render
 * @property {number} index - Index of the icon in the array (used for key generation)
 */
interface ContactIconProps {
  icon: ReactNode;
  index: number;
}

/**
 * ContactIcon Component
 * Renders a single contact icon with a unique key
 *
 * @component
 * @param {ContactIconProps} props - Component props
 * @returns {JSX.Element} Rendered icon component
 */
export function ContactIcon({ icon, index }: ContactIconProps) {
  return <span key={`contact-icon-${index}`}>{icon}</span>;
}
