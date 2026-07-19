import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { findProduct, formatPrice, products, type Product } from "@/data/products";
import { useCart } from "@/store/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { useSplitReveal } from "@/lib/hooks/useReveal";
import { MagneticButton } from "@/components/site/MagneticButton";
import exploded from "@/assets/exploded.jpg";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — CHRONOS` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — CHRONOS` },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "CHRONOS" }],
  }),
  notFoundComponent: () => (
    <div className="pt-40 container-x text-center">
      <h1 className="display-h text-4xl">This piece is no longer available.</h1>
      <Link to="/collections" className="mt-6 inline-block text-gold border-b border-gold">Browse all</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="pt-40 container-x text-center">
      <h1 className="display-h text-4xl">Something went wrong.</h1>
    </div>
  ),
  component: PDP,
});

function PDP() {
  const loaderData = Route.useLoaderData() as { product: Product };
  const product = loaderData.product;
  const navigate = useNavigate();
  const add = useCart((s) => s.add);
  const [variant, setVariant] = useState<Product["variants"][number]>(product.variants[0]);
  const [tab, setTab] = useState<"desc" | "spec" | "ship">("desc");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const gallery = useRef<HTMLDivElement>(null);
  const galleryImg = useRef<HTMLImageElement>(null);
  const titleRef = useSplitReveal<HTMLHeadingElement>();
  const explodedRef = useRef<HTMLDivElement>(null);
  const stickyBar = useRef<HTMLDivElement>(null);
  const mainCta = useRef<HTMLButtonElement>(null);
  const galleryImages = [
    { src: product.image, alt: product.imageAlt, label: "Front view" },
    ...(product.hover ? [{ src: product.hover, alt: `${product.name} on the wrist`, label: "On the wrist" }] : []),
    { src: exploded, alt: `Movement details of the ${product.name}`, label: "Movement" },
  ];

  useEffect(() => {
    setGalleryIndex(0);
  }, [product.slug]);

  const selectGalleryImage = (index: number) => {
    setGalleryIndex((index + galleryImages.length) % galleryImages.length);
  };

  // 360° drag rotate
  useEffect(() => {
    if (prefersReducedMotion() || !galleryImg.current) return;
    const el = galleryImg.current;
    let startX = 0;
    let startRot = 0;
    let rot = 0;
    let dragging = false;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startRot = rot;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      rot = startRot + (e.clientX - startX) * 0.5;
      gsap.set(el, { rotateY: rot });
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch { /* noop */ }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [product.slug]);

  // Exploded specs reveal
  useEffect(() => {
    if (prefersReducedMotion() || !explodedRef.current) return;
    const ctx = gsap.context(() => {
      const labels = explodedRef.current!.querySelectorAll(".spec-line");
      gsap.fromTo(
        labels,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: explodedRef.current, start: "top 70%" },
        },
      );
    }, explodedRef);
    return () => ctx.revert();
  }, []);

  // Mobile sticky CTA
  useEffect(() => {
    if (!stickyBar.current || !mainCta.current) return;
    const bar = stickyBar.current;
    const st = ScrollTrigger.create({
      trigger: mainCta.current,
      start: "bottom top",
      onEnter: () => gsap.to(bar, { yPercent: 0, duration: 0.4, ease: "power3.out" }),
      onLeaveBack: () => gsap.to(bar, { yPercent: 100, duration: 0.4, ease: "power3.in" }),
    });
    return () => st.kill();
  }, [product.slug]);

  const onAdd = () => {
    add(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: variant.label,
      },
      1,
    );
    // Fly-to-cart animation
    if (prefersReducedMotion()) return;
    const cart = document.getElementById("cart-icon");
    const source = galleryImg.current;
    if (!cart || !source) return;
    const r1 = source.getBoundingClientRect();
    const r2 = cart.getBoundingClientRect();
    const ghost = document.createElement("img");
    ghost.src = product.image;
    ghost.style.cssText = `position:fixed;left:${r1.left}px;top:${r1.top}px;width:${r1.width}px;height:${r1.height}px;object-fit:contain;z-index:70;pointer-events:none;mix-blend-mode:screen`;
    document.body.appendChild(ghost);
    gsap.to(ghost, {
      left: r2.left,
      top: r2.top,
      width: 40,
      height: 40,
      opacity: 0.2,
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => ghost.remove(),
    });
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const specs: [string, string][] = [
    ["Reference", product.reference],
    ["Case", product.case],
    ["Movement", product.movement],
    ["Crystal", product.crystal],
    ["Water resistance", product.waterResistance],
    ["Strap", product.strap],
  ];

  return (
    <div className="pt-24 md:pt-28 pb-24">
      <nav className="container-x text-[11px] uppercase tracking-[0.25em] text-ink/40 mb-8">
        <Link to="/" className="hover:text-gold">Home</Link> ·{" "}
        <Link to="/collections" className="hover:text-gold">Collections</Link> ·{" "}
        <span className="text-ink/60">{product.name}</span>
      </nav>

      <div className="container-x grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left: gallery pinned */}
        <div ref={gallery} className="md:sticky md:top-32">
          <div
            className="relative aspect-square bg-gradient-to-b from-graphite/60 to-obsidian overflow-hidden touch-none"
            data-cursor="Drag"
            style={{ perspective: 1200 }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <img
                ref={galleryImg}
                src={galleryImages[galleryIndex].src}
                alt={galleryImages[galleryIndex].alt}
                className="max-w-full max-h-full object-contain will-change-transform select-none"
                style={{ mixBlendMode: "screen", transformStyle: "preserve-3d" }}
                draggable={false}
              />
            </div>
            <button
              type="button"
              onClick={() => selectGalleryImage(galleryIndex - 1)}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 border border-gold/40 bg-obsidian/80 p-2 text-gold transition-colors hover:bg-gold hover:text-obsidian"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => selectGalleryImage(galleryIndex + 1)}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 border border-gold/40 bg-obsidian/80 p-2 text-gold transition-colors hover:bg-gold hover:text-obsidian"
              aria-label="Next gallery image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-gold/70">
              {galleryIndex === 0 ? "Drag to rotate" : galleryImages[galleryIndex].label}
              <span className="h-px w-5 bg-gold/50" />
              {String(galleryIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            {galleryImages.map((image, i) => (
              <button
                  key={image.label}
                  type="button"
                  onClick={() => selectGalleryImage(i)}
                  className={`h-20 w-20 overflow-hidden border bg-graphite/50 transition-colors ${
                    galleryIndex === i ? "border-gold" : "border-white/10 hover:border-gold"
                  }`}
                  aria-label={`View ${image.label}`}
                  aria-pressed={galleryIndex === i}
                >
                  <img src={image.src} alt="" className="h-full w-full object-contain" style={{ mixBlendMode: "screen" }} />
                </button>
            ))}
          </div>
        </div>

        {/* Right: content */}
        <div className="min-w-0">
          <div className="eyebrow mb-4">{product.collection} · {product.reference}</div>
          <h1 ref={titleRef} className="display-h text-4xl md:text-6xl leading-[1.02]">
            {product.name}
          </h1>
          <p className="mt-4 text-ink/70 text-lg italic">{product.tagline}</p>
          <div className="mt-6 text-2xl text-ink tabular-nums">{formatPrice(product.price)}</div>

          <div className="mt-8">
            <div className="eyebrow mb-3">Configuration</div>
            <div className="flex gap-3 flex-wrap">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariant(v)}
                  className={`group flex items-center gap-3 px-4 py-3 border transition-all ${
                    variant.id === v.id ? "border-gold" : "border-white/15 hover:border-white/40"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ background: v.swatch }}
                  />
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/80">{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              ref={mainCta}
              onClick={onAdd}
              className="flex-1 bg-gold text-obsidian py-5 uppercase tracking-[0.3em] text-xs font-medium hover:bg-gold-warm transition-colors"
              data-cursor="Add"
            >
              Add to cart · {formatPrice(product.price)}
            </button>
            <button
              onClick={() => {
                onAdd();
                navigate({ to: "/checkout" });
              }}
              className="px-6 border border-gold/60 text-gold py-5 uppercase tracking-[0.3em] text-xs hover:bg-gold hover:text-obsidian transition-colors"
            >
              Buy now
            </button>
          </div>

          <div className="mt-10 text-xs text-ink/50 space-y-2 border-t border-white/5 pt-6">
            <div>Complimentary international shipping</div>
            <div>Two-year warranty · Lifetime service</div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="flex gap-6 border-b border-white/10">
              {([
                ["desc", "Description"] as const,
                ["spec", "Specifications"] as const,
                ["ship", "Shipping"] as const,
              ]).map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`pb-3 text-xs uppercase tracking-[0.25em] transition-colors relative ${
                    tab === k ? "text-gold" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {l}
                  {tab === k && <span className="absolute -bottom-px inset-x-0 h-px bg-gold" />}
                </button>
              ))}
            </div>
            <div key={tab} className="pt-6 text-ink/80 leading-relaxed animate-in fade-in duration-500">
              {tab === "desc" && <p>{product.description}</p>}
              {tab === "spec" && (
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map(([k, v]) => (
                      <tr key={k} className="border-b border-white/5">
                        <td className="py-3 text-ink/50 w-1/3">{k}</td>
                        <td className="py-3">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {tab === "ship" && (
                <div className="space-y-3 text-sm">
                  <p>Complimentary international shipping, hand-delivered in signed CHRONOS packaging.</p>
                  <p>Two-year warranty and lifetime service through any CHRONOS boutique.</p>
                  <p>Free returns within 30 days on unworn pieces.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 border-t border-white/5">
            <details className="group py-5">
              <summary className="flex items-center justify-between cursor-pointer text-sm uppercase tracking-[0.25em] text-ink/70">
                Size guide
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-sm text-ink/60 leading-relaxed">
                The {product.name} measures {product.case}. Suits a wrist between 15.5cm and 20cm. Complimentary sizing at any boutique.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Exploded specs */}
      <section ref={explodedRef} className="container-x mt-32 md:mt-48 grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-square bg-obsidian overflow-hidden">
          <img src={exploded} alt="Exploded diagram of the movement" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="eyebrow mb-4">Anatomy</div>
          <h2 className="display-h text-4xl md:text-5xl mb-8">Every component, in its place.</h2>
          <ul className="space-y-4">
            {specs.map(([k, v]) => (
              <li key={k} className="spec-line flex gap-6 border-b border-white/5 pb-3">
                <span className="w-6 h-6 rounded-full border border-gold/40 flex items-center justify-center text-gold text-[10px] shrink-0">
                  ·
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-1">{k}</div>
                  <div className="text-sm text-ink/85">{v}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related */}
      <section className="container-x mt-32">
        <div className="eyebrow mb-4">You may also consider</div>
        <h2 className="display-h text-3xl md:text-4xl mb-12">Related pieces</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div
        ref={stickyBar}
        className="fixed bottom-0 inset-x-0 z-40 bg-obsidian/95 backdrop-blur-xl border-t border-white/10 p-4 md:hidden translate-y-full"
      >
        <div className="flex gap-3 items-center">
          <div className="flex-1 text-sm">
            <div className="text-ink">{product.name}</div>
            <div className="text-xs text-ink/50 tabular-nums">{formatPrice(product.price)}</div>
          </div>
          <MagneticButton onClick={onAdd}>Add</MagneticButton>
        </div>
      </div>
    </div>
  );
}
