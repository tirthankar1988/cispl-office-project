import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/data/products";
import { Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your selection — CHRONOS" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const total = subtotal();
  return (
    <div className="pt-32 md:pt-44 pb-32 container-x max-w-5xl mx-auto">
      <div className="eyebrow mb-4">Your selection</div>
      <h1 className="display-h text-5xl md:text-7xl mb-16">Cart</h1>
      {items.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-ink/60 mb-6">Your selection is empty.</p>
          <Link to="/collections" className="text-gold border-b border-gold pb-1 text-xs uppercase tracking-[0.3em]">
            Browse collections
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_320px] gap-16">
          <ul className="space-y-8">
            {items.map((it) => (
              <li key={`${it.id}-${it.variant ?? ""}`} className="flex gap-6 border-b border-white/5 pb-8">
                <div className="w-32 h-32 bg-graphite/50 shrink-0 overflow-hidden">
                  <img src={it.image} alt={it.name} className="w-full h-full object-contain" style={{ mixBlendMode: "screen" }} />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="text-lg text-ink" style={{ fontFamily: "var(--font-display)" }}>{it.name}</div>
                  {it.variant && <div className="text-[11px] uppercase tracking-[0.2em] text-ink/50 mt-1">{it.variant}</div>}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3 border border-white/10">
                      <button aria-label="Decrease" onClick={() => setQty(it.id, it.variant, it.qty - 1)} className="p-2 text-ink/70 hover:text-gold"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs tabular-nums w-6 text-center">{it.qty}</span>
                      <button aria-label="Increase" onClick={() => setQty(it.id, it.variant, it.qty + 1)} className="p-2 text-ink/70 hover:text-gold"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="text-ink tabular-nums">{formatPrice(it.price * it.qty)}</div>
                  </div>
                  <button onClick={() => remove(it.id, it.variant)} className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ink/40 hover:text-gold self-start">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <aside className="bg-card p-8 h-fit md:sticky md:top-32">
            <div className="eyebrow mb-4">Order summary</div>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-ink/60">Subtotal</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-ink/60">Shipping</span>
              <span className="tabular-nums">Complimentary</span>
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between text-lg">
              <span>Total</span>
              <span className="tabular-nums text-gold">{formatPrice(total)}</span>
            </div>
            <Link to="/checkout" className="mt-6 block text-center bg-gold text-obsidian py-4 uppercase tracking-[0.3em] text-xs hover:bg-gold-warm transition-colors" data-cursor="Checkout">
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}