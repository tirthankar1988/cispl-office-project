# CHRONOS — Luxury Watch E-Commerce (GSAP)

A cinematic, dark, editorial storefront with GSAP-owned scroll storytelling across all pages. Below is what I'll build, in what order, and the technical choices. Flag anything to change before I start.

## Design system

- Palette: base `#0B0B0C` / `#000`, ink `#EDECE7`, muted `#8A8A8F`, single metallic accent **brushed gold `#C6A664`** (say the word if you'd rather steel silver `#B8BCC2`).
- Type: **Playfair Display** (display serif) + **Inter** (UI/body). Loaded via `<link>` in `__root.tsx`, mapped as `--font-display` / `--font-sans` in `@theme`.
- Grain overlay utility on dark sections, generous whitespace, large type scale.
- All colors/gradients/shadows as semantic tokens in `src/styles.css`; no hardcoded color classes in components.

## Tech choices

- **GSAP** with ScrollTrigger, SplitText, Flip, Draggable, Observer — installed from npm (`gsap` package includes club plugins in v3.13+ free tier; if a plugin is club-only I'll swap for a hand-rolled equivalent).
- **Lenis** for smooth scroll, synced with ScrollTrigger (ScrollSmoother is club-only — Lenis is the standard free replacement and integrates cleanly).
- Framer Motion only for a couple of UI micro-states (drawer/modal presence).
- Reusable hooks in `src/lib/gsap/`: `useGsapReveal`, `useScrollPin`, `useSplitReveal`, `useMagnetic`, `useLenis`, plus a `<Reveal>` wrapper.
- Respect `prefers-reduced-motion` globally: hooks early-return to plain fades, no pins.
- All ScrollTriggers cleaned up per route via `gsap.context()` + `ctx.revert()` in effect cleanup; global `ScrollTrigger.refresh()` on route change.
- Cart state: Zustand (lightweight, no backend needed for this build).
- No Lovable Cloud — this is a front-end showcase build. Products are seeded from a local `src/data/products.ts` module. Checkout is a simulated flow (no real payments). Say the word if you want real persistence/payments and I'll wire Cloud + Stripe.

## Routes (TanStack Start file-based)

```
src/routes/
  __root.tsx                 nav, footer, Lenis provider, cursor, preloader
  index.tsx                  Homepage
  collections.index.tsx      Shop listing (all)
  collections.$slug.tsx      Filtered by collection
  products.$slug.tsx         PDP
  cart.tsx                   Full cart page (drawer is global)
  checkout.tsx               Multi-step checkout
  order.$id.tsx              Thank-you / confirmation
  about.tsx                  Heritage timeline
  contact.tsx                Form + locator
  sitemap[.]xml.ts           SEO
  (root notFoundComponent)   404 with spinning watch hands
```

Each route defines its own `head()` with distinct title/description/OG.

## Global chrome

- **Preloader**: logo mark scales+fades, then curtain wipe reveals hero. Session-flagged so it only shows once.
- **Nav**: transparent over hero → solid dark + backdrop-blur past hero; hide on scroll down, show on scroll up (GSAP Observer).
- **Custom cursor**: dot → ring → labeled ("View" / "Drag") over `data-cursor` zones. Disabled on touch.
- **Cart drawer**: slides in from right, staggered line items, count-up totals.
- **Page transitions**: crossfade + slight y-slide via a route-level wrapper listening to router state.

## Page-by-page

**Homepage** — pinned hero (~150vh) with scroll-driven rotateY on the watch, side copy fade-in, warm-tone gradient shift; brand quote SplitText; collections horizontal-scrollytelling (pinned); bestsellers grid (ScrollTrigger.batch stagger, 3D tilt hover, image swap); split-screen "Making" crossfade; press marquee; magnetic newsletter CTA; masked wordmark reveal in footer.

**Collections** — sticky condensing filter bar; batch reveal grid; Flip-powered reflow on filter change; Quick View modal using GSAP Flip from clicked card.

**PDP** — sticky gallery (left) pinned against scrolling right column; Draggable 360° viewer with contextual cursor; SplitText title; variant swatch morph; magnetic Add to Cart with thumbnail-flies-to-cart timeline; tab underline slide + crossfade; exploded-view specs revealed in sequence on scroll; related carousel; sticky mobile CTA bar.

**Cart drawer & page** — same drawer used everywhere; count-up on qty change; slide+collapse on remove; premium empty state with idle float.

**Checkout** — 3 steps (Shipping → Payment → Review), animated progress bar, horizontal slide between steps, floating-label inputs with accent glow, sticky order summary with count-up.

**Order confirmation** — SVG stroke-dashoffset seal draw-in, radial glow pulse, sequential summary fade, animated order stepper, magnetic CTAs, related products strip.

**About** — vertical pinned timeline scrollytelling of brand milestones with SplitText per era.

**Contact** — floating-label form, static styled map placeholder, store list.

**404** — two spinning watch-hand SVGs, on-brand copy, magnetic home CTA.

## Assets

Hero and editorial imagery: I'll generate a small set of premium watch renders (hero watch on dark, wrist shot, exploded parts, craftsmanship close-ups, collection thumbnails) via the image tool and store as CDN assets. No stock-photo placeholders.

## Build order

1. Design tokens + fonts + Lenis + reusable GSAP hooks + preloader + nav + cursor + footer + cart store/drawer.
2. Homepage (hero pin, collections scrollytelling, bestsellers, making, marquee, newsletter).
3. Collections + Quick View (Flip).
4. PDP (pinned gallery, 360°, variants, exploded specs, add-to-cart flight).
5. Checkout flow + Order confirmation.
6. About, Contact, 404.
7. SEO polish: per-route head, sitemap, robots, og:image on leaves where a hero exists.

## Scope confirmations before I start

- **Accent**: gold `#C6A664` (default) — swap to steel if you prefer.
- **Backend**: none — local product data, simulated checkout. Say the word for Cloud + real cart persistence + Stripe.
- **Preloader**: shows on first visit per session, skipped afterward.
- **ScrollSmoother**: replaced with Lenis (free, equivalent feel). SplitText/Flip: shipped free in current GSAP.

Approve and I'll build straight through.
