import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSplitReveal, useReveal } from "@/lib/hooks/useReveal";
import { MagneticButton } from "@/components/site/MagneticButton";
import heroWatch from "@/assets/hero-watch.png";
import heroChronos from "@/assets/hero-chronos-v2.png";
import craftsmanship from "@/assets/craftsmanship.jpg";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHRONOS — Precision. Legacy. Time perfected." },
      {
        name: "description",
        content:
          "A house of horology crafting mechanical wristwatches in the Vallée de Joux tradition. Discover the CHRONOS collections.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroCentered />
      <Statement />
      <WorldTimeStrip />
      <CollectionsScroll />
      <AnatomyMovement />
      <Bestsellers />
      <MakingSplit />
      <HeritageEra />
      <ConfiguratorTeaser />
      <PressMarquee />
      <NewsletterBand />
    </>
  );
}

/* ————— HERO (editorial timepiece composition) ————— */
function HeroCentered() {
  const root = useRef<HTMLDivElement>(null);
  const watch = useRef<HTMLImageElement>(null);
  const wordmark = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!root.current || !watch.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmark.current,
        { opacity: 0, y: 40, letterSpacing: "0.4em" },
        { opacity: 1, y: 0, letterSpacing: "-0.02em", duration: 1.8, ease: "power4.out", delay: 0.15 },
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: "power3.out", stagger: 0.1 },
      );
      gsap.fromTo(
        watch.current,
        { scale: 0.85, opacity: 0, rotate: -4 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.8, delay: 0.5, ease: "expo.out" },
      );
      // Subtle scroll parallax
      gsap.to(watch.current, {
        yPercent: 7,
        rotate: 3,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-screen w-full overflow-hidden grain border-b border-gold/20 bg-[#090807] pt-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 9% 12%, oklch(0.34 0.11 52 / 0.42) 0%, transparent 38%), radial-gradient(ellipse at 82% 65%, oklch(0.74 0.11 82 / 0.15) 0%, transparent 36%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-vignette)" }} />
      <div className="relative z-10 container-x grid min-h-[calc(100vh-6rem)] items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-16">
        <div className="relative z-20 max-w-xl">
          <div className="hero-sub flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-gold/80">
            <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(198,166,100,0.9)]" />
            Swiss made / Est. 1874
          </div>
          <h1 ref={wordmark} className="mt-10 font-sans text-6xl font-medium leading-[0.86] tracking-[-0.07em] text-ink sm:text-7xl lg:mt-12 lg:text-8xl xl:text-9xl">
            Precision<br />in Time.
          </h1>
          <p className="hero-sub mt-7 max-w-sm text-sm leading-relaxed text-ink/65 md:text-base">
            From enduring elegance to modern invention, every CHRONOS timepiece is composed for a life in motion.
          </p>
          <div className="hero-sub mt-9 max-w-sm border-l border-gold/70 pl-5">
            <div className="text-2xl leading-none text-ink">Elegant timekeeping</div>
            <p className="mt-3 text-xs leading-relaxed text-ink/55">A quiet instrument of precision, balanced between tradition and utility.</p>
          </div>
          <div className="hero-sub mt-10 flex gap-8 text-[10px] uppercase tracking-[0.28em] text-ink/55">
            <div><span className="block text-2xl tracking-tight text-ink md:text-3xl">4.5k+</span>Collectors</div>
            <span className="h-12 w-px bg-gold/40" />
            <div><span className="block text-2xl tracking-tight text-ink md:text-3xl">5 year</span>Warranty</div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px] lg:max-w-[580px]">
          <div className="absolute -inset-3 rounded-full border border-gold/15 md:-inset-7" />
          <div className="absolute -inset-7 rounded-full border border-dashed border-gold/10 md:-inset-12" />
          <img
            ref={watch}
            src={heroChronos}
            alt="CHRONOS black-dial gold wristwatch"
            width={1024}
            height={1280}
            className="relative z-10 aspect-[4/5] w-full object-contain will-change-transform"
          />
          <div className="hero-sub absolute bottom-5 left-4 z-20 max-w-[13rem] border-l border-gold/70 bg-obsidian/85 px-4 py-3 backdrop-blur-sm md:-left-10 md:bottom-10">
            <div className="text-xl leading-none text-ink">Refined craftsmanship</div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink/60">Hand-finished movements, assembled one at a time.</p>
          </div>
          <Link
            to="/products/$slug"
            params={{ slug: "heritage-cassini-38" }}
            className="hero-sub absolute right-2 top-1/2 z-20 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full bg-gold p-3 text-center text-[9px] uppercase tracking-[0.14em] text-obsidian transition-transform hover:scale-110 md:-right-8 md:h-24 md:w-24"
            data-cursor="Discover"
          >
            Discover<br />Cassini
          </Link>
        </div>
      </div>

      <div className="absolute bottom-7 right-[5vw] hidden flex-col items-center gap-2 text-gold/60 text-[10px] uppercase tracking-[0.3em] lg:flex">
        Scroll <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

/* ————— World-time strip ————— */
function WorldTimeStrip() {
  const cities: [string, string][] = [
    ["Genève", "Europe/Zurich"],
    ["London", "Europe/London"],
    ["New York", "America/New_York"],
    ["Tokyo", "Asia/Tokyo"],
    ["Dubai", "Asia/Dubai"],
    ["Hong Kong", "Asia/Hong_Kong"],
    ["Singapore", "Asia/Singapore"],
    ["Los Angeles", "America/Los_Angeles"],
  ];
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const fmt = (tz: string) =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(now);
  const doubled = [...cities, ...cities];
  return (
    <section className="border-y border-gold/25 bg-obsidian/60 overflow-hidden py-5">
      <div
        className="flex gap-16 whitespace-nowrap animate-[marquee_60s_linear_infinite] will-change-transform"
        style={{ width: "max-content" }}
      >
        {doubled.map(([city, tz], i) => (
          <span key={`${city}-${i}`} className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-gold/60">
            <span>{city}</span>
            <span className="text-ink">{fmt(tz)}</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

/* ————— Anatomy of a Movement ————— */
function AnatomyMovement() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".diagram-ring",
        { rotate: -30, opacity: 0 },
        {
          rotate: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        },
      );
      gsap.fromTo(
        ".spec",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const specs = [
    { n: "01", title: "Tourbillon escapement", body: "Defying gravity with 28,800 vibrations per hour, hand-finished to a mirror shine." },
    { n: "02", title: "72-hour power reserve", body: "Twin mainspring barrels of a proprietary cobalt-chrome alloy, wound by a 22k gold rotor." },
    { n: "03", title: "322 components", body: "Each part beveled and polished by hand. Bridges signed by a single watchmaker." },
  ];
  return (
    <section ref={root} className="bg-obsidian/80 border-y border-white/5 py-28 md:py-40">
      <div className="container-x grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Circular exploded diagram */}
        <div className="relative w-full max-w-[520px] aspect-square mx-auto">
          <div className="diagram-ring absolute inset-0 rounded-full border border-gold/25 flex items-center justify-center p-8 md:p-12">
            <div className="w-full h-full rounded-full border border-dashed border-gold/40 flex items-center justify-center">
              <div className="w-1/2 h-1/2 rounded-full bg-gold/10 flex items-center justify-center backdrop-blur-sm">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-gold rotate-45 shadow-[0_0_40px_rgba(198,166,100,0.5)]" />
              </div>
            </div>
          </div>
          <img
            src={heroWatch}
            alt="CHRONOS timepiece"
            className="absolute z-10 top-1/2 left-1/2 w-[48%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_24px_rgba(0,0,0,0.55)] pointer-events-none"
          />
          {/* Hairline callouts */}
          <div className="absolute top-8 right-0 flex items-center gap-3">
            <div className="w-24 md:w-32 h-px bg-gold" />
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase">Rotor</span>
          </div>
          <div className="absolute bottom-16 left-0 flex items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase">Bridge</span>
            <div className="w-24 md:w-32 h-px bg-gold" />
          </div>
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 rotate-90 origin-center">
            <span className="text-[10px] tracking-[0.4em] text-gold/60 uppercase">Calibre C-101</span>
          </div>
        </div>

        <div>
          <div className="eyebrow text-gold mb-4">Calibre C-101</div>
          <h2 className="display-h text-4xl md:text-6xl mb-10 leading-[1.02]">
            The heart of Swiss <span className="italic">precision</span>.
          </h2>
          <ul className="space-y-10">
            {specs.map((s) => (
              <li key={s.n} className="spec flex gap-6 border-l border-gold/25 pl-8">
                <span className="display-h italic text-2xl text-gold shrink-0">{s.n}</span>
                <div>
                  <h3 className="text-sm uppercase tracking-[0.25em] mb-2">{s.title}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed max-w-md">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ————— Heritage era ————— */
function HeritageEra() {
  const root = useReveal<HTMLDivElement>({ y: 40, selector: ".rv" });
  return (
    <section className="relative overflow-hidden border-y border-gold/15 bg-graphite/20 py-28 md:py-40">
      <div className="pointer-events-none absolute -left-5 top-4 select-none display-h text-[38vw] leading-none text-gold/[0.035]">1874</div>
      <div ref={root} className="container-x relative grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="order-2 lg:order-1">
          <div className="rv flex items-center gap-4 eyebrow mb-7"><span className="h-px w-12 bg-gold" /> Provenance</div>
          <h2 className="rv display-h max-w-md text-5xl leading-[0.94] md:text-7xl">
            1874: The <span className="italic text-gold">first stroke</span>.
          </h2>
          <p className="rv mt-8 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">
            Founded in the Vallée de Joux as a dream of capturing light within metal. Six generations later, the original atelier still stands — and every piece we make begins there.
          </p>
          <div className="rv mt-10 flex items-center gap-6">
            <Link
              to="/about"
              className="inline-block border border-gold/60 px-6 py-3 text-xs uppercase tracking-[0.35em] text-gold transition-colors hover:bg-gold hover:text-obsidian"
              data-cursor="Read"
            >
              Our legacy
            </Link>
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink/45">Vallée de Joux</span>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="rv relative aspect-[16/11] overflow-hidden border border-gold/20 bg-obsidian shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
            <img src={craftsmanship} alt="Archival atelier" loading="lazy" className="h-full w-full object-cover grayscale opacity-65" />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 border-l border-gold pl-4 text-[10px] uppercase tracking-[0.35em] text-gold">Origins / 1874</div>
            <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.3em] text-ink/60">Six generations of makers</div>
          </div>
          <div className="rv relative ml-auto -mt-16 mr-4 w-[52%] border border-gold/30 bg-obsidian p-3 md:-mt-24 md:mr-8 md:p-5">
            <img src={heroChronos} alt="Heritage timepiece" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <span className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.35em] text-gold">Ref. 1874</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————— Configurator teaser ————— */
function ConfiguratorTeaser() {
  const root = useReveal<HTMLDivElement>({ y: 30, selector: ".rv" });
  const dials = [
    { color: "#141415", label: "Obsidian", finish: "Black galvanic" },
    { color: "#d5ad58", label: "Champagne", finish: "Sunburst brass" },
    { color: "#182b45", label: "Midnight", finish: "Lacquered blue" },
    { color: "#57331f", label: "Cognac", finish: "Smoked copper" },
  ];
  const [selectedDial, setSelectedDial] = useState(dials[0]);
  return (
    <section className="relative overflow-hidden bg-gold py-28 text-obsidian md:py-40">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 30% 20%, black 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full border border-obsidian/15" />
      <div ref={root} className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-[0.9fr_0.8fr_0.8fr] lg:gap-16">
        <div>
          <div className="rv mb-6 text-[10px] uppercase tracking-[0.5em] text-obsidian/70">The Atelier Program</div>
          <h2 className="rv display-h text-5xl leading-[0.92] md:text-7xl">
            The atelier is <span className="italic">yours</span>.
          </h2>
          <p className="rv mt-7 max-w-sm leading-relaxed text-obsidian/75">
            Set the character of your timepiece before you meet the maker. Begin with the dial that feels most like you.
          </p>
          <Link
            to="/contact"
            className="rv mt-9 inline-flex items-center gap-3 bg-obsidian px-7 py-4 text-[10px] uppercase tracking-[0.32em] text-ink transition-transform hover:scale-[1.02]"
            data-cursor="Enter"
          >
            Begin your configuration <span className="text-gold">↗</span>
          </Link>
        </div>

        <div className="rv relative mx-auto w-full max-w-[330px]">
          <div className="absolute -inset-6 rounded-full border border-obsidian/25" />
          <div className="absolute -inset-12 rounded-full border border-dashed border-obsidian/20" />
          <div className="relative aspect-square rounded-full bg-obsidian p-5 shadow-[0_25px_45px_rgba(45,29,10,0.25)]">
            <div className="relative h-full w-full rounded-full border-[10px] border-[#b8893c] p-5 shadow-inner" style={{ background: selectedDial.color }}>
              <div className="absolute inset-3 rounded-full border border-white/25" />
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute left-1/2 top-4 h-3 w-px -translate-x-1/2 bg-gold/90 origin-[0_6.2rem]"
                  style={{ transform: `rotate(${i * 30}deg)` }}
                />
              ))}
              <span className="absolute left-1/2 top-1/2 h-[23%] w-[2px] origin-bottom -translate-x-1/2 -translate-y-full rotate-[40deg] bg-gold" />
              <span className="absolute left-1/2 top-1/2 h-[30%] w-[2px] origin-bottom -translate-x-1/2 -translate-y-full rotate-[130deg] bg-gold" />
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold bg-obsidian" />
              <span className="absolute left-1/2 top-[66%] -translate-x-1/2 text-[8px] uppercase tracking-[0.3em] text-gold">CHRONOS</span>
            </div>
          </div>
          <div className="mt-8 text-center text-[10px] uppercase tracking-[0.32em] text-obsidian/65">Live dial preview</div>
        </div>

        <div className="rv rounded-sm border border-obsidian/25 bg-gold-warm/20 p-6 md:p-8">
          <div className="text-[10px] uppercase tracking-[0.34em] text-obsidian/65">01 / Select your dial</div>
          <div className="mt-5 border-b border-obsidian/20 pb-5">
            <div className="display-h text-4xl">{selectedDial.label}</div>
            <div className="mt-1 text-sm text-obsidian/65">{selectedDial.finish}</div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {dials.map((dial) => (
              <button
                key={dial.label}
                type="button"
                onClick={() => setSelectedDial(dial)}
                className={`flex items-center gap-3 border p-3 text-left transition-colors ${
                  selectedDial.label === dial.label ? "border-obsidian bg-obsidian text-ink" : "border-obsidian/25 hover:border-obsidian/60"
                }`}
                aria-pressed={selectedDial.label === dial.label}
                data-cursor="Choose"
              >
                <span className="h-5 w-5 rounded-full border border-obsidian/30" style={{ background: dial.color }} />
                <span className="text-[10px] uppercase tracking-[0.18em]">{dial.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-7 border-t border-obsidian/20 pt-5 text-[10px] uppercase tracking-[0.25em] text-obsidian/60">Estimated delivery · 8–12 months</div>
        </div>
      </div>
    </section>
  );
}

/* ————— Statement ————— */
function Statement() {
  const heading = useSplitReveal<HTMLHeadingElement>();
  return (
    <section className="container-x py-32 md:py-56 text-center">
      <div className="eyebrow mb-6">Our promise</div>
      <h2 ref={heading} className="display-h text-4xl md:text-7xl leading-[1.05] max-w-4xl mx-auto italic">
        A watch is not a purchase. It is a witness — to promises kept, and time well spent.
      </h2>
    </section>
  );
}

/* ————— Collections product slider ————— */
function CollectionsScroll() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x flex justify-between items-end mb-10">
        <div>
          <div className="eyebrow mb-3">The collections</div>
          <h2 className="display-h text-3xl md:text-5xl max-w-md">Four houses. One measure of time.</h2>
        </div>
        <Link to="/collections" className="hidden md:inline-block text-xs uppercase tracking-[0.3em] text-gold border-b border-gold pb-1" data-cursor="View all">
          View all
        </Link>
      </div>
      <Carousel opts={{ align: "start", loop: true }} className="container-x group/slider">
        <CarouselContent className="-ml-5 md:-ml-8">
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-[82%] pl-5 sm:basis-1/2 md:basis-1/3 md:pl-8 xl:basis-1/4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-5 top-[44%] h-11 w-11 border-gold/60 bg-obsidian/85 text-gold hover:bg-gold hover:text-obsidian md:left-8" />
        <CarouselNext className="right-5 top-[44%] h-11 w-11 border-gold/60 bg-obsidian/85 text-gold hover:bg-gold hover:text-obsidian md:right-8" />
      </Carousel>
    </section>
  );
}

/* ————— Bestsellers ————— */
function Bestsellers() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".reveal-up", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.12 },
          ),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const featured = products.slice(0, 4);
  return (
    <section ref={root} className="container-x py-24 md:py-32">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="eyebrow mb-3">The signatures</div>
          <h2 className="display-h text-3xl md:text-5xl">Bestsellers</h2>
        </div>
        <Link to="/collections" className="text-xs uppercase tracking-[0.3em] text-gold border-b border-gold pb-1">
          Shop all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

/* ————— Making split ————— */
function MakingSplit() {
  const root = useRef<HTMLDivElement>(null);
  const chapters = [
    { title: "The dial", body: "Each dial is guilloché by hand on a rose-engine lathe unchanged since 1897." },
    { title: "The movement", body: "Every calibre is disassembled, adjusted, and hand-lubricated by a single watchmaker." },
    { title: "The signature", body: "The maker signs the bridge with his own hand. The number is registered for life." },
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      const items = root.current!.querySelectorAll(".chap");
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%" },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-obsidian py-28 md:py-40">
      <div className="pointer-events-none absolute right-[-8vw] top-12 display-h text-[28vw] leading-none text-gold/[0.035]">101</div>
      <div className="container-x relative grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <div className="eyebrow mb-5">The making</div>
          <h2 className="display-h max-w-lg text-5xl leading-[0.94] md:text-7xl">
            An education, <span className="italic text-gold">worn</span> on the wrist.
          </h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-ink/60 md:text-base">
            Three disciplines meet in every CHRONOS calibre: proportion, patience, and the precision of a practiced hand.
          </p>
          <div className="relative mt-12 max-w-md p-3 md:p-5">
            <div className="absolute inset-0 rounded-full border border-gold/30" />
            <div className="absolute inset-5 rounded-full border border-dashed border-gold/20" />
            <img
              src={craftsmanship}
              alt="A watchmaker's hands assembling a mechanical movement"
              loading="lazy"
              className="relative aspect-square w-full rounded-full object-cover grayscale opacity-75"
            />
            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-obsidian px-3 text-[10px] uppercase tracking-[0.35em] text-gold">Atelier / C-101</span>
          </div>
        </div>
        <div className="relative space-y-5 lg:pt-14">
          <div className="absolute bottom-10 left-[1.1rem] top-10 w-px bg-gradient-to-b from-gold via-gold/20 to-transparent" />
          {chapters.map((c, i) => (
            <article key={c.title} className="chap relative grid grid-cols-[3.25rem_1fr] gap-5 border border-white/10 bg-graphite/20 p-7 transition-colors hover:border-gold/50 md:grid-cols-[5rem_1fr] md:gap-8 md:p-10">
              <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-obsidian text-[10px] tracking-[0.15em] text-gold md:h-10 md:w-10">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold/70">Chapter {String(i + 1).padStart(2, "0")}</div>
                <h3 className="display-h mb-4 text-3xl md:text-4xl">{c.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-ink/65 md:text-base">{c.body}</p>
              </div>
            </article>
          ))}
          <div className="chap ml-[3.25rem] border-t border-gold/30 pt-6 text-[10px] uppercase tracking-[0.32em] text-ink/45 md:ml-20">Adjusted by one hand. Registered for life.</div>
        </div>
      </div>
    </section>
  );
}

/* ————— Press marquee ————— */
function PressMarquee() {
  const items = [
    "GQ · Watch of the Year",
    "Financial Times · How to Spend It",
    "Monocle",
    "Hodinkee · Editor's Pick",
    "Wallpaper*",
    "The Rake",
    "Robb Report",
  ];
  const doubled = [...items, ...items];
  return (
    <section className="py-16 border-y border-white/5 overflow-hidden">
      <div className="marquee-track flex gap-16 whitespace-nowrap will-change-transform">
        {doubled.map((t, i) => (
          <span key={i} className="eyebrow text-ink/50 text-sm">
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ————— Newsletter ————— */
function NewsletterBand() {
  const wrap = useReveal<HTMLDivElement>({ y: 30, selector: ".rv" });
  return (
    <section className="container-x py-32 md:py-48 text-center grain">
      <div ref={wrap}>
        <div className="rv eyebrow mb-4">The letters</div>
        <h2 className="rv display-h text-4xl md:text-6xl max-w-3xl mx-auto mb-4">
          Dispatches from the atelier.
        </h2>
        <p className="rv text-ink/60 max-w-lg mx-auto mb-10">
          A quiet letter, four times a year. New pieces, private previews, and the odd essay on time.
        </p>
        <form
          className="rv max-w-md mx-auto flex flex-col sm:flex-row gap-3 items-stretch"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="your@address.com"
            className="flex-1 bg-transparent border border-white/15 px-5 py-4 text-sm focus:border-gold outline-none transition-colors"
          />
          <MagneticButton type="submit">Subscribe</MagneticButton>
        </form>
      </div>
    </section>
  );
}
