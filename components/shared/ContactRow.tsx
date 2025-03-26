import { ContactRowProps } from "@/types/pageContent";
import { ContactIcon } from "@/components/ui/ContactIcon";

/**
 * ContactRow Component
 * Displays a row of contact information with associated icons
 * 
 * @component
 * @param {ContactRowProps} props - Component props
 * @returns {JSX.Element} Rendered contact row
 * 
 * @example
 * ```tsx
 * <ContactRow
 *   icons={[<PhoneIcon />, <EmailIcon />]}
 *   text="+1234567890"
 * />
 * ```
 */
export function ContactRow({ icons, text }: ContactRowProps) {
  return (
    <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-lg border-2 border-[#F196E5] shadow-md">
      <div className="flex gap-2">
        {icons.map((icon, index) => (
          <ContactIcon key={index} icon={icon} index={index} />
        ))}
      </div>
      <span className="text-xl font-medium">{text}</span>
    </div>
  );
}
