import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { products, collections, type Collection } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — CHRONOS" },
      { name: "description", content: "The full CHRONOS collection: Classic, Sport, Limited Edition, and Smart timepieces." },
      { property: "og:title", content: "Collections — CHRONOS" },
      { property: "og:description", content: "Discover every CHRONOS timepiece in one place." },
    ],
  }),
  component: CollectionsIndex,
});

type Filter = "all" | Collection;
type Sort = "featured" | "price-asc" | "price-desc";

function CollectionsIndex() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [sticky, setSticky] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    const f = filter === "all" ? products : products.filter((p) => p.collection === filter);
    if (sort === "price-asc") return [...f].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...f].sort((a, b) => b.price - a.price);
    return f;
  }, [filter, sort]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".reveal-up");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.06 },
    );
    ScrollTrigger.refresh();
  }, [list]);

  return (
    <div className="pt-32 md:pt-44 pb-32 container-x">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <div className="eyebrow mb-4">The collections</div>
          <h1 className="display-h text-5xl md:text-7xl">Every piece we make.</h1>
        </div>
        <p className="text-ink/60 max-w-sm">
          Each timepiece is assembled, adjusted, and signed by a single watchmaker in the Vallée de Joux.
        </p>
      </div>

      <div
        className={`sticky top-16 md:top-20 z-30 -mx-4 md:-mx-8 px-4 md:px-8 py-3 mb-10 border-y transition-all duration-500 ${
          sticky ? "bg-background/80 backdrop-blur-xl border-white/10" : "bg-transparent border-white/5"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-1 flex-wrap">
            {[{ v: "all" as Filter, l: "All" }, ...collections.map((c) => ({ v: c.slug as Filter, l: c.name }))].map((c) => (
              <button
                key={c.v}
                onClick={() => setFilter(c.v)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors ${
                  filter === c.v ? "text-gold border-b border-gold" : "text-ink/60 hover:text-ink"
                }`}
              >
                {c.l}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="bg-transparent border border-white/15 text-xs uppercase tracking-[0.2em] px-3 py-2 text-ink focus:border-gold outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-24 text-ink/50">
          No pieces in this collection right now.{" "}
          <Link to="/collections" onClick={() => setFilter("all")} className="text-gold underline">Show all</Link>
        </div>
      )}
    </div>
  );
}