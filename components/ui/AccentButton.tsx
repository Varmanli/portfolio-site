import { AccentButtonProps } from "@/types/pageContent";

export default function AccentButton({
  text,
  textSize = "text-xl",
  margin = "",
  className = "",
  onClick,
}: AccentButtonProps) {
  return (
    <button
      className={`bg-accent border-6 rounded-[92px] px-8 py-4 font-black z-10 ${textSize} ${margin} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
