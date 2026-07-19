import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function Footer() {
  const wordmark = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wordmark.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-gold/20 bg-obsidian grain">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: "radial-gradient(ellipse at 75% 15%, oklch(0.28 0.07 65 / 0.32) 0%, transparent 42%)" }}
      />
      <div className="container-x relative py-16 md:py-24">
        <div className="grid items-end gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.25fr_0.75fr_0.6fr_0.6fr] lg:gap-10">
          <div>
            <div className="eyebrow mb-6">The house of CHRONOS</div>
            <h2 className="display-h max-w-xl text-4xl leading-[0.94] md:text-6xl">
              Time is personal. <span className="italic text-gold">Make it yours.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/65">
              Begin a conversation with our atelier about your next timepiece, a private viewing, or lifelong care.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 border border-gold/60 px-5 py-3 text-xs uppercase tracking-[0.28em] text-gold transition-colors hover:bg-gold hover:text-obsidian"
              data-cursor="Contact"
            >
              Speak with the atelier <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <div className="eyebrow mb-5">Explore</div>
            <ul className="space-y-3 text-sm text-ink/75">
              <li><Link to="/collections" className="transition-colors hover:text-gold">Collections</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-gold">Our heritage</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-gold">Boutiques</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-5">Ownership</div>
            <ul className="space-y-3 text-sm text-ink/75">
              <li><Link to="/contact" className="transition-colors hover:text-gold">Care &amp; repair</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-gold">Warranty</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-gold">Concierge</Link></li>
            </ul>
          </div>
          <div className="border-l border-gold/30 pl-5 lg:pb-1">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Atelier</div>
            <div className="mt-3 display-h text-3xl text-ink">Vallée<br />de Joux</div>
            <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-ink/45">Switzerland</div>
          </div>
        </div>
      </div>
      <div className="container-x relative overflow-hidden pb-8 pt-2">
        <div
          ref={wordmark}
          className="display-h select-none text-[18vw] leading-none tracking-[0.05em] text-ink/90 md:text-[14vw]"
        >
          CHRONOS
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.25em] text-ink/40">
          <span>© {new Date().getFullYear()} CHRONOS Horlogerie</span>
          <span>Vallée de Joux · Switzerland</span>
        </div>
      </div>
    </footer>
  );
}
