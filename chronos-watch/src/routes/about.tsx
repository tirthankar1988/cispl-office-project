import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import craftsmanship from "@/assets/craftsmanship.jpg";
import wrist from "@/assets/wrist-shot.jpg";
import { useSplitReveal } from "@/lib/hooks/useReveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Heritage — CHRONOS" },
      { name: "description", content: "A century and a half of horology from the Vallée de Joux. The story of CHRONOS." },
      { property: "og:title", content: "Heritage — CHRONOS" },
      { property: "og:description", content: "Since 1874. The house that measures time in generations." },
    ],
  }),
  component: About,
});

const milestones = [
  { year: "1874", title: "The atelier opens", body: "Émile Chronos opens a modest workshop above the Rue du Casino." },
  { year: "1913", title: "The first calibre", body: "Calibre CH-1 — the movement that would set the house's tempo." },
  { year: "1948", title: "Post-war revival", body: "The Cassini silhouette is drawn on the back of a Zurich café menu." },
  { year: "1969", title: "Meridian chronograph", body: "The house's first automatic chronograph is issued to the Swiss Air Force." },
  { year: "1994", title: "Atelier restoration", body: "The original Vallée de Joux workshop is restored to full function." },
  { year: "2019", title: "The Orbit era", body: "A new generation joins the atelier. Titanium enters the vocabulary." },
  { year: "2026", title: "Onward, quietly", body: "Every timepiece still assembled, adjusted, and signed by a single hand." },
];

function About() {
  const title = useSplitReveal<HTMLHeadingElement>();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      const items = root.current!.querySelectorAll(".milestone");
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-32 md:pt-44">
      <section className="container-x pb-24">
        <div className="eyebrow mb-4">Since 1874</div>
        <h1 ref={title} className="display-h text-5xl md:text-8xl max-w-4xl leading-[0.98]">
          A house that measures time in generations.
        </h1>
        <p className="mt-8 max-w-xl text-ink/70 leading-relaxed">
          CHRONOS was founded in a small workshop above the Rue du Casino in Sentier, Switzerland. A century and a half later, every timepiece still leaves that same building — assembled, adjusted, and signed by a single watchmaker.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <img src={craftsmanship} alt="A watchmaker's hands" loading="lazy" className="w-full h-[70vh] object-cover" />
        <img src={wrist} alt="A CHRONOS timepiece worn" loading="lazy" className="w-full h-[70vh] object-cover" />
      </section>

      <section ref={root} className="container-x py-32 md:py-48">
        <div className="eyebrow mb-4 text-center">The chronicle</div>
        <h2 className="display-h text-4xl md:text-6xl text-center mb-24">A century and a half.</h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-24">
            {milestones.map((m) => (
              <div key={m.year} className="milestone relative pl-16">
                <div className="absolute left-2 top-1 w-4 h-4 rounded-full border-2 border-gold bg-background" />
                <div className="eyebrow mb-3">{m.year}</div>
                <h3 className="display-h text-2xl md:text-3xl mb-3">{m.title}</h3>
                <p className="text-ink/70 leading-relaxed max-w-md">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}