import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

const sizes = { sm: 14, md: 16, lg: 20, xl: 24 } as const;
export function Icon({
  icon: Glyph,
  size = "md",
  label,
  className,
  ...props
}: Omit<LucideProps, "size"> & { icon: LucideIcon; size?: keyof typeof sizes; label?: string }) {
  return (
    <Glyph
      {...props}
      size={sizes[size]}
      strokeWidth={1.75}
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
