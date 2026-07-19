import { type ReactNode, useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { Preloader } from "./Preloader";
import { CartDrawer } from "./CartDrawer";
import { LenisProvider } from "./LenisProvider";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Refresh scroll triggers on route change
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="dark min-h-screen bg-background text-foreground cursor-hide">
      <LenisProvider />
      {mounted && <Preloader />}
      {mounted && <Cursor />}
      <Nav />
      <main className="relative">
        <div key={pathname} className={prefersReducedMotion() ? "" : "page-fade"}>
          {children}
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <style>{`
        .page-fade {
          animation: page-in 0.55s ease-out both;
        }
        @keyframes page-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .page-fade { animation: none; }
        }
      `}</style>
    </div>
  );
}