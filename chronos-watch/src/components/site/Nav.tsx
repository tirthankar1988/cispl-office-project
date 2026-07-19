import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";

const links = [
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "Heritage" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const setOpen = useCart((s) => s.setOpen);
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 200) setHidden(y > lastY.current);
      else setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-background/70 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="display-h text-lg md:text-xl tracking-[0.35em] text-ink" data-cursor="Home">
            CHRONOS
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs uppercase tracking-[0.25em] text-ink/80 hover:text-gold transition-colors"
                activeProps={{ className: "text-gold" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            id="cart-icon"
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink hover:text-gold transition-colors"
            data-cursor="Cart"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden md:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-3 min-w-4 h-4 px-1 rounded-full bg-gold text-obsidian text-[10px] font-medium flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}