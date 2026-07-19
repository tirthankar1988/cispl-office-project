import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const SEEN_KEY = "chronos-preloader-seen";

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SEEN_KEY);
  });

  useEffect(() => {
    if (!show) return;
    if (prefersReducedMotion()) {
      setShow(false);
      sessionStorage.setItem(SEEN_KEY, "1");
      return;
    }
    document.body.style.overflow = "hidden";
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SEEN_KEY, "1");
        setShow(false);
        document.body.style.overflow = "";
      },
    });
    tl.fromTo(
      ".pl-mark",
      { opacity: 0, scale: 0.85, letterSpacing: "0.6em" },
      { opacity: 1, scale: 1, letterSpacing: "0.3em", duration: 0.9, ease: "power3.out" },
    )
      .to(".pl-line", { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .to(".pl-mark, .pl-line", { opacity: 0, duration: 0.35, ease: "power2.in" }, "+=0.25")
      .to(
        ".pl-curtain",
        { yPercent: -100, duration: 0.9, ease: "expo.inOut", stagger: 0.05 },
        "-=0.2",
      );
    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;
  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] pointer-events-none">
      <div className="pl-curtain absolute inset-0 bg-background grain" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="pl-mark display-h text-4xl md:text-6xl text-ink tracking-[0.3em]">
          CHRONOS
        </div>
        <div className="pl-line mt-6 w-24 h-px origin-left scale-x-0 bg-gold" />
      </div>
    </div>
  );
}