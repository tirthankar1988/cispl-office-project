import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger, prefersReducedMotion, gsap } from "@/lib/gsap";

export function LenisProvider() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}