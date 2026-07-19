import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/order/$id")({
  head: () => ({ meta: [{ title: "Order confirmed — CHRONOS" }, { name: "robots", content: "noindex" }] }),
  component: OrderPage,
});

function OrderPage() {
  const { id } = Route.useParams();
  const seal = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !seal.current) return;
    const paths = seal.current.querySelectorAll("path, circle");
    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const el = p as SVGGeometryElement;
        const len = el.getTotalLength ? el.getTotalLength() : 400;
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power3.inOut",
        stagger: 0.15,
      });
      gsap.fromTo(
        ".order-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15, delay: 1.2 },
      );
    }, seal);
    return () => ctx.revert();
  }, []);

  const timeline = ["Confirmed", "Crafted & packed", "Shipped", "Delivered"];
  const activeIdx = 0;
  const related = products.slice(0, 3);

  return (
    <div className="pt-32 md:pt-44 pb-32 container-x">
      <div className="max-w-2xl mx-auto text-center relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[400px] rounded-full ring-pulse" style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 60%)", opacity: 0.15 }} />
        </div>
        <svg ref={seal} viewBox="0 0 120 120" className="relative w-32 h-32 mx-auto text-gold">
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
          <path d="M40 62 L55 77 L82 45" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="order-fade eyebrow mt-8">Order {id}</div>
        <h1 className="order-fade display-h text-4xl md:text-6xl mt-4">Thank you.</h1>
        <p className="order-fade text-ink/70 mt-4 max-w-md mx-auto leading-relaxed">
          Your timepiece is being prepared by hand. A confirmation letter is on its way to your inbox.
        </p>
      </div>

      <div className="order-fade max-w-3xl mx-auto mt-20">
        <div className="eyebrow mb-6 text-center">Your watch is being prepared</div>
        <div className="relative flex justify-between items-center">
          <div className="absolute top-3 left-3 right-3 h-px bg-white/10" />
          <div className="absolute top-3 left-3 h-px bg-gold" style={{ width: `${(activeIdx / (timeline.length - 1)) * 100}%` }} />
          {timeline.map((t, i) => (
            <div key={t} className="relative flex flex-col items-center gap-3 flex-1 text-center">
              <div className={`w-2.5 h-2.5 rounded-full ${i <= activeIdx ? "bg-gold" : "bg-white/20"}`} />
              <div className={`text-[10px] uppercase tracking-[0.25em] ${i <= activeIdx ? "text-gold" : "text-ink/40"}`}>{t}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-fade flex justify-center gap-4 mt-16">
        <Link to="/collections" className="px-8 py-4 border border-gold/60 text-gold text-xs uppercase tracking-[0.3em] hover:bg-gold hover:text-obsidian transition-colors">
          Continue shopping
        </Link>
      </div>

      <section className="mt-32">
        <div className="eyebrow mb-4 text-center">You may also consider</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}