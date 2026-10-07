import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  label: string;
  /** Real image to show; when omitted the labelled placeholder is rendered instead. */
  src?: string;
  alt?: string;
  /** CSS object-position for cropping, e.g. "50% 25%" to keep faces in frame. */
  position?: string;
  /** Responsive `sizes` hint so Next.js serves an appropriately sized file. */
  sizes?: string;
  priority?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  rounded?: boolean;
}

export default function PlaceholderImage({
  label,
  src,
  alt,
  position = "center",
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority = false,
  width = "100%",
  height = 300,
  className = "",
  style = {},
  rounded = false,
}: PlaceholderImageProps) {
  const boxStyle: React.CSSProperties = {
    width,
    height,
    borderRadius: rounded ? "50%" : undefined,
    ...style,
  };

  if (src) {
    return (
      <div className={`img-frame ${className}`} style={boxStyle}>
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover", objectPosition: position }}
        />
      </div>
    );
  }

  return (
    <div className={`img-placeholder ${className}`} style={boxStyle} aria-label={label}>
      <ImageIcon className="img-placeholder-icon" />
      <span>{label}</span>
    </div>
  );
}
