import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { useMagnetic } from "@/lib/hooks/useReveal";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "ghost";
};

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { children, className = "", variant = "solid", ...rest },
) {
  const ref = useMagnetic<HTMLButtonElement>(0.3);
  const base =
    "inline-flex items-center justify-center px-8 py-4 uppercase tracking-[0.3em] text-[11px] font-medium transition-colors will-change-transform";
  const styles =
    variant === "solid"
      ? "bg-gold text-obsidian hover:bg-gold-warm"
      : "border border-gold/60 text-gold hover:bg-gold hover:text-obsidian";
  return (
    <button ref={ref} className={`${base} ${styles} ${className}`} data-cursor="Explore" {...rest}>
      {children}
    </button>
  );
});