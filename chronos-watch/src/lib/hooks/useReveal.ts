import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../gsap";

/** Fade + rise reveal on scroll. Attach the returned ref to the element(s) to reveal. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: {
  y?: number;
  delay?: number;
  stagger?: number;
  selector?: string;
  once?: boolean;
  scrub?: boolean;
}) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = opts?.selector ? el.querySelectorAll(opts.selector) : [el];
    if (!targets.length) return;
    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "all" });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: opts?.y ?? 40 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: opts?.delay ?? 0,
        stagger: opts?.stagger ?? 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: opts?.once === false ? "play none none reverse" : "play none none none",
          scrub: opts?.scrub ? 1 : false,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [opts?.y, opts?.delay, opts?.stagger, opts?.selector, opts?.once, opts?.scrub]);
  return ref;
}

/** Word-by-word split reveal. Wraps each word in a span and animates rise. */
export function useSplitReveal<T extends HTMLElement = HTMLHeadingElement>(opts?: {
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { y: 0, opacity: 1, filter: "blur(0px)" });
      return;
    }
    // NOTE: previously split the text into per-word spans via innerHTML, but
    // mutating React-owned DOM caused NotFoundError on unmount. Animate the
    // element as a whole instead.
    const ctx = gsap.context(() => {
      gsap.set(el, { y: 40, opacity: 0, filter: "blur(8px)" });
      gsap.to(el, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power4.out",
        delay: opts?.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, el);
    return () => ctx.revert();
  }, [opts?.delay, opts?.stagger, opts?.once]);
  return ref;
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: "power3.out" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}