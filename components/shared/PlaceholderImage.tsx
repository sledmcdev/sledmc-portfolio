import { ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  label: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  rounded?: boolean;
}

export default function PlaceholderImage({
  label,
  width = "100%",
  height = 300,
  className = "",
  style = {},
  rounded = false,
}: PlaceholderImageProps) {
  return (
    <div
      className={`img-placeholder ${className}`}
      style={{
        width,
        height,
        borderRadius: rounded ? "50%" : undefined,
        ...style,
      }}
      aria-label={label}
    >
      <ImageIcon className="img-placeholder-icon" />
      <span>{label}</span>
    </div>
  );
}
