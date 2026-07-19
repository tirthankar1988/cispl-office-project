import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/data/products";
import { gsap } from "@/lib/gsap";

export function CartDrawer() {
  const { open, setOpen, items, remove, setQty, subtotal } = useCart();
  const total = subtotal();
  const totalRef = useRef<HTMLSpanElement>(null);
  const prevTotal = useRef(total);

  useEffect(() => {
    const el = totalRef.current;
    if (!el) return;
    const obj = { v: prevTotal.current };
    prevTotal.current = total;
    gsap.to(obj, {
      v: total,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = formatPrice(Math.round(obj.v));
      },
    });
  }, [total]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed top-0 right-0 z-[81] h-full w-full sm:w-[440px] bg-obsidian border-l border-white/10 grain flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/10">
              <div className="eyebrow">Your selection</div>
              <button onClick={() => setOpen(false)} aria-label="Close cart" data-cursor="Close">
                <X className="w-5 h-5 text-ink hover:text-gold transition-colors" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="float-idle w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                  <p className="text-ink/70 max-w-[240px] leading-relaxed">
                    Your selection awaits. Time is best when chosen with care.
                  </p>
                  <Link
                    to="/collections"
                    onClick={() => setOpen(false)}
                    className="mt-4 text-xs uppercase tracking-[0.25em] text-gold border-b border-gold/60 pb-1"
                  >
                    Explore collections
                  </Link>
                </div>
              ) : (
                <ul className="space-y-8">
                  <AnimatePresence initial={false}>
                    {items.map((it) => (
                      <motion.li
                        key={`${it.id}-${it.variant ?? ""}`}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.4 } }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-4"
                      >
                        <div className="w-24 h-24 shrink-0 bg-graphite/60 rounded-sm overflow-hidden">
                          <img src={it.image} alt={it.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-ink text-sm">{it.name}</div>
                          {it.variant && (
                            <div className="text-[11px] uppercase tracking-[0.2em] text-ink/50 mt-1">
                              {it.variant}
                            </div>
                          )}
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-3 border border-white/10 rounded-sm">
                              <button
                                aria-label="Decrease"
                                onClick={() => setQty(it.id, it.variant, it.qty - 1)}
                                className="p-2 hover:text-gold text-ink/70"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs tabular-nums w-4 text-center">{it.qty}</span>
                              <button
                                aria-label="Increase"
                                onClick={() => setQty(it.id, it.variant, it.qty + 1)}
                                className="p-2 hover:text-gold text-ink/70"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-sm text-ink tabular-nums">
                              {formatPrice(it.price * it.qty)}
                            </div>
                          </div>
                          <button
                            onClick={() => remove(it.id, it.variant)}
                            className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ink/40 hover:text-gold"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-white/10 px-8 py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-ink/60 uppercase tracking-[0.2em] text-xs">Subtotal</span>
                  <span ref={totalRef} className="text-ink tabular-nums text-base">
                    {formatPrice(total)}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-gold text-obsidian py-4 uppercase tracking-[0.3em] text-xs font-medium hover:bg-gold-warm transition-colors"
                  data-cursor="Checkout"
                >
                  Proceed to checkout
                </Link>
                <div className="text-[10px] uppercase tracking-[0.25em] text-ink/40 text-center">
                  Complimentary shipping &amp; 2-year warranty
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}