interface AccentButtonProps {
  text: string;
  textSize?: string; // مثل "text-lg" یا "text-2xl"
  margin?: string; // مثل "ml-5" یا "mt-3"
  onClick?: () => void;
}

export default function AccentButton({
  text,
  textSize = "text-xl",
  margin = "",
  onClick,
}: AccentButtonProps) {
  return (
    <button
      className={`bg-accent border-6 rounded-[92px] px-8 py-4 font-black ${textSize} ${margin}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
