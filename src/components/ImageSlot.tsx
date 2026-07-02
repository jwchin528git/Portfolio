interface ImageSlotProps {
  shape?: "rect" | "circle";
  placeholder?: string;
  src?: string;
  alt?: string;
  height?: number | string;
  style?: React.CSSProperties;
}

export default function ImageSlot({
  shape = "rect",
  placeholder = "Image",
  src,
  alt = "",
  height,
  style,
}: ImageSlotProps) {
  return (
    <div
      className={`image-slot${shape === "circle" ? " circle" : ""}`}
      style={{ width: "100%", height: height ?? "100%", ...style }}
    >
      {src ? <img src={src} alt={alt} /> : placeholder}
    </div>
  );
}
