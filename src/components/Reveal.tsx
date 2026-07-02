import { useReveal } from "../hooks/useReveal";

interface RevealProps {
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  id?: string;
  children: React.ReactNode;
}

export default function Reveal({ className = "", style, delay, id, children }: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ delay });
  return (
    <div ref={ref} id={id} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
