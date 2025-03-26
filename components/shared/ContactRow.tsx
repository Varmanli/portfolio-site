interface ContactRowProps {
  icons: React.ReactNode[]; // حالا یک آرایه از آیکون‌ها
  text: string;
}

export function ContactRow({ icons, text }: ContactRowProps) {
  return (
    <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-lg border-2 border-[#F196E5] shadow-md">
      <div className="flex gap-2">
        {icons.map((icon, index) => (
          <span key={index}>{icon}</span>
        ))}
      </div>
      <span className="text-xl font-medium">{text}</span>
    </div>
  );
}
