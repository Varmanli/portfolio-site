interface SkeletonProps {
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  style?: React.CSSProperties;
}

const roundedMap: Record<NonNullable<SkeletonProps["rounded"]>, string> = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

export default function Skeleton({
  className = "",
  rounded = "lg",
  style,
}: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${roundedMap[rounded]} ${className}`}
      style={style}
    >
      <div className="skeleton-shimmer absolute inset-0" />
    </div>
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineClassName?: string;
  lastLineWidth?: string;
}

export function SkeletonText({
  lines = 1,
  className = "",
  lineClassName = "h-3",
  lastLineWidth = "70%",
}: SkeletonTextProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          rounded="md"
          className={lineClassName}
          style={
            index === lines - 1 && lines > 1 ? { width: lastLineWidth } : undefined
          }
        />
      ))}
    </div>
  );
}
