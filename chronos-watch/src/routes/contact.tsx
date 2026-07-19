import { createFileRoute } from "@tanstack/react-router";
import { MagneticButton } from "@/components/site/MagneticButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CHRONOS" },
      { name: "description", content: "Reach the CHRONOS atelier or visit one of our boutiques." },
      { property: "og:title", content: "Contact — CHRONOS" },
      { property: "og:description", content: "Speak with a CHRONOS concierge or visit a boutique." },
    ],
  }),
  component: Contact,
});

const boutiques = [
  { city: "Geneva", addr: "12 Rue du Rhône, 1204 Genève" },
  { city: "Paris", addr: "8 Place Vendôme, 75001 Paris" },
  { city: "London", addr: "24 Old Bond Street, W1S 4AL" },
  { city: "New York", addr: "701 Madison Avenue, NY 10065" },
];

function Field({ label, type = "text", as = "input" as "input" | "textarea" }: { label: string; type?: string; as?: "input" | "textarea" }) {
  return (
    <label className="relative block">
      {as === "input" ? (
        <input type={type} required placeholder=" " className="peer w-full bg-transparent border-b border-white/15 py-4 px-1 text-ink focus:border-gold outline-none transition-colors" />
      ) : (
        <textarea required rows={4} placeholder=" " className="peer w-full bg-transparent border-b border-white/15 py-4 px-1 text-ink focus:border-gold outline-none transition-colors resize-none" />
      )}
      <span className="absolute left-1 top-4 text-ink/50 text-sm pointer-events-none transition-all peer-focus:-top-1 peer-focus:text-[10px] peer-focus:tracking-[0.25em] peer-focus:uppercase peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.25em] peer-[:not(:placeholder-shown)]:uppercase">
        {label}
      </span>
    </label>
  );
}

function Contact() {
  return (
    <div className="pt-32 md:pt-44 pb-32 container-x">
      <div className="eyebrow mb-4">Contact</div>
      <h1 className="display-h text-5xl md:text-7xl max-w-2xl leading-[0.98]">Speak with the house.</h1>
      <p className="mt-6 text-ink/60 max-w-lg">
        Our concierge answers within one business day. For urgent service, visit any CHRONOS boutique.
      </p>

      <div className="grid md:grid-cols-2 gap-16 mt-20">
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); }}>
          <Field label="Your name" />
          <Field label="Email address" type="email" />
          <Field label="Subject" />
          <Field label="How may we help?" as="textarea" />
          <div>
            <MagneticButton type="submit">Send message</MagneticButton>
          </div>
        </form>

        <div>
          <div className="eyebrow mb-4">Boutiques</div>
          <ul className="space-y-6">
            {boutiques.map((b) => (
              <li key={b.city} className="border-b border-white/5 pb-6">
                <div className="display-h text-2xl mb-1">{b.city}</div>
                <div className="text-ink/60 text-sm">{b.addr}</div>
              </li>
            ))}
          </ul>
          <div className="mt-8 aspect-[4/3] bg-graphite/40 border border-white/5 grain relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-ink/40 eyebrow">
              Boutique locator
            </div>
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300" preserveAspectRatio="none">
              <path d="M0 200 Q100 150 200 180 T400 160" stroke="oklch(0.74 0.11 82)" strokeWidth="0.5" fill="none" />
              <path d="M0 250 Q150 200 250 220 T400 210" stroke="oklch(0.74 0.11 82)" strokeWidth="0.5" fill="none" />
              {[[80, 190], [180, 175], [260, 200], [340, 170]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3" fill="oklch(0.74 0.11 82)" />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}