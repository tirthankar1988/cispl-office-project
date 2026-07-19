import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product; index?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onMove = (e: ReactMouseEvent) => {
    if (prefersReducedMotion() || !imgRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(imgRef.current, {
      rotateY: px * 12,
      rotateX: -py * 10,
      duration: 0.6,
      ease: "power3.out",
      transformPerspective: 800,
    });
  };
  const onLeave = () => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group block reveal-up"
      data-cursor="View"
    >
      <div className="relative aspect-[4/5] bg-gradient-to-b from-graphite/50 to-obsidian overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            ref={imgRef}
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            className="max-w-full max-h-full object-contain transition-opacity duration-700 will-change-transform"
            style={{ mixBlendMode: "screen" }}
          />
        </div>
        {product.hover && (
          <img
            src={product.hover}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
            {product.collection}
          </span>
          <span className="text-xs text-ink tabular-nums">{formatPrice(product.price)}</span>
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between">
        <h3 className="text-ink text-base md:text-lg font-normal" style={{ fontFamily: "var(--font-display)" }}>
          {product.name}
        </h3>
        <span className="text-xs text-ink/60 tabular-nums">{formatPrice(product.price)}</span>
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink/40">
        {product.reference}
      </div>
    </Link>
  );
}