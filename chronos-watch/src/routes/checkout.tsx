import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/data/products";
import { MagneticButton } from "@/components/site/MagneticButton";
import { ShieldCheck, Lock } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — CHRONOS" }] }),
  component: Checkout,
});

const steps = ["Shipping", "Payment", "Review"] as const;
type Step = (typeof steps)[number];

function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const total = subtotal();
  const [step, setStep] = useState<Step>("Shipping");
  const stepIndex = steps.indexOf(step);
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const orderId = useMemo(() => Math.random().toString(36).slice(2, 8).toUpperCase(), []);

  const complete = () => {
    const id = `CHR-${orderId}`;
    clear();
    navigate({ to: "/order/$id", params: { id } });
  };

  if (items.length === 0 && step !== "Review") {
    return (
      <div className="pt-40 container-x text-center">
        <h1 className="display-h text-4xl">Your selection is empty.</h1>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-44 pb-32 container-x max-w-5xl mx-auto">
      <div className="eyebrow mb-4">Checkout</div>
      <h1 className="display-h text-4xl md:text-6xl mb-10">Complete your order</h1>

      {/* Progress bar */}
      <div className="mb-16">
        <div className="flex justify-between mb-3 text-[11px] uppercase tracking-[0.25em]">
          {steps.map((s, i) => (
            <span key={s} className={i <= stepIndex ? "text-gold" : "text-ink/40"}>{`${String(i+1).padStart(2,"0")}  ${s}`}</span>
          ))}
        </div>
        <div className="h-px bg-white/10 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_340px] gap-16 items-start">
        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === "Shipping" && <ShippingForm onNext={() => setStep("Payment")} />}
              {step === "Payment" && <PaymentForm onNext={() => setStep("Review")} onBack={() => setStep("Shipping")} />}
              {step === "Review" && <ReviewStep onBack={() => setStep("Payment")} onComplete={complete} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <aside className="bg-card p-8 md:sticky md:top-32">
          <div className="eyebrow mb-4">Order summary</div>
          <ul className="space-y-4 mb-6">
            {items.map((it) => (
              <li key={`${it.id}-${it.variant ?? ""}`} className="flex gap-3 text-sm">
                <div className="w-14 h-14 bg-graphite/60 shrink-0">
                  <img src={it.image} alt={it.name} className="w-full h-full object-contain" style={{ mixBlendMode: "screen" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate">{it.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-ink/50">Qty {it.qty}</div>
                </div>
                <div className="tabular-nums text-ink/80">{formatPrice(it.price * it.qty)}</div>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-ink/60">Subtotal</span><span className="tabular-nums">{formatPrice(total)}</span></div>
            <div className="flex justify-between"><span className="text-ink/60">Shipping</span><span>Free</span></div>
            <div className="flex justify-between text-lg pt-3 border-t border-white/5">
              <span>Total</span><span className="text-gold tabular-nums">{formatPrice(total)}</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-[10px] uppercase tracking-[0.25em] text-ink/50">
            <div className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-gold" /> 256-bit encrypted checkout</div>
            <div className="flex items-center gap-2"><Lock className="w-3 h-3 text-gold" /> PCI DSS compliant</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, type = "text", required = true }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="relative block">
      <input type={type} required={required} placeholder=" " className="peer w-full bg-transparent border-b border-white/15 py-4 px-1 text-ink focus:border-gold outline-none transition-colors" />
      <span className="absolute left-1 top-4 text-ink/50 text-sm pointer-events-none transition-all peer-focus:-top-1 peer-focus:text-[10px] peer-focus:tracking-[0.25em] peer-focus:uppercase peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.25em] peer-[:not(:placeholder-shown)]:uppercase">
        {label}
      </span>
    </label>
  );
}

function ShippingForm({ onNext }: { onNext: () => void }) {
  return (
    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <h2 className="display-h text-2xl">Shipping details</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="First name" />
        <Field label="Last name" />
      </div>
      <Field label="Email address" type="email" />
      <Field label="Address" />
      <div className="grid sm:grid-cols-3 gap-6">
        <Field label="City" />
        <Field label="Postal code" />
        <Field label="Country" />
      </div>
      <div className="flex justify-end">
        <MagneticButton type="submit">Continue to payment</MagneticButton>
      </div>
    </form>
  );
}

function PaymentForm({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <h2 className="display-h text-2xl">Payment</h2>
      <Field label="Card number" />
      <div className="grid sm:grid-cols-3 gap-6">
        <Field label="Expiry (MM/YY)" />
        <Field label="CVC" />
        <Field label="Name on card" />
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-gold">← Back</button>
        <MagneticButton type="submit">Review order</MagneticButton>
      </div>
    </form>
  );
}

function ReviewStep({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  return (
    <div className="space-y-8">
      <h2 className="display-h text-2xl">Review &amp; confirm</h2>
      <p className="text-ink/70 leading-relaxed">
        Your details have been recorded. Once confirmed, your CHRONOS timepiece will be prepared by hand and delivered in signed packaging.
      </p>
      <div className="border border-white/10 p-6 text-sm space-y-2">
        <div className="flex justify-between text-ink/60"><span>Shipping</span><span className="text-ink">Complimentary express</span></div>
        <div className="flex justify-between text-ink/60"><span>Payment</span><span className="text-ink">Card ending ••• 4242</span></div>
        <div className="flex justify-between text-ink/60"><span>Delivery</span><span className="text-ink">3–5 business days</span></div>
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-gold">← Back</button>
        <MagneticButton onClick={onComplete}>Place order</MagneticButton>
      </div>
    </div>
  );
}