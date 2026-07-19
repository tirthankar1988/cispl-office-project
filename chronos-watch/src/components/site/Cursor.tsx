import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const d = dot.current!;
    const r = ring.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.set(d, { x: mx, y: my });
      const target = e.target as HTMLElement | null;
      const zone = target?.closest("[data-cursor]") as HTMLElement | null;
      const next = zone?.dataset.cursor ?? null;
      setLabel((cur) => (cur === next ? cur : next));
      gsap.to(r, { scale: zone ? 2.4 : 1, duration: 0.4, ease: "power3.out" });
    };

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      gsap.set(r, { x: rx, y: ry });
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 z-[90] w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold pointer-events-none hidden md:block"
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 z-[90] w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 pointer-events-none hidden md:flex items-center justify-center"
      >
        {label && (
          <span className="text-[9px] uppercase tracking-[0.25em] text-gold whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </>
  );
}