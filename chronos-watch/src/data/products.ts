import heritage from "@/assets/product-heritage.png";
import sport from "@/assets/product-sport.png";
import limited from "@/assets/product-limited.png";
import smart from "@/assets/product-smart.png";
import pilot from "@/assets/product-pilot.png";
import diver from "@/assets/product-diver.png";
import wrist from "@/assets/wrist-shot.jpg";

export type Collection = "classic" | "sport" | "limited" | "smart";

export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: Collection;
  price: number;
  image: string;
  imageAlt: string;
  hover?: string;
  tagline: string;
  description: string;
  reference: string;
  case: string;
  movement: string;
  crystal: string;
  waterResistance: string;
  strap: string;
  strapMaterial: "leather" | "steel" | "rubber" | "mesh";
  variants: { id: string; label: string; swatch: string }[];
};

export const products: Product[] = [
  {
    id: "p-01",
    slug: "heritage-cassini-38",
    name: "Heritage Cassini 38",
    collection: "classic",
    price: 4850,
    image: heritage,
    imageAlt: "Heritage Cassini 38 — gold case, white dial, brown leather strap",
    hover: wrist,
    tagline: "A quiet study in restraint.",
    description:
      "The Cassini 38 revives our founding silhouette — a 38mm gold case, hand-finished sunburst dial, and a curved sapphire crystal that catches light like still water.",
    reference: "REF. C.38.HG",
    case: "38mm brushed 18k gold",
    movement: "In-house calibre CH-201, 42h reserve",
    crystal: "Domed sapphire, anti-reflective",
    waterResistance: "30m",
    strap: "Hand-stitched brown alligator",
    strapMaterial: "leather",
    variants: [
      { id: "gold-brown", label: "Gold / Cognac", swatch: "#8b5a2b" },
      { id: "gold-black", label: "Gold / Ink", swatch: "#0b0b0c" },
    ],
  },
  {
    id: "p-02",
    slug: "meridian-chronograph-42",
    name: "Meridian Chronograph 42",
    collection: "sport",
    price: 6200,
    image: sport,
    imageAlt: "Meridian Chronograph 42 — steel case, black dial, rubber strap",
    tagline: "Engineered for motion.",
    description:
      "A 42mm chronograph built for the way modern life is lived. Column-wheel movement, tachymeter bezel, and a supple vulcanised rubber strap.",
    reference: "REF. M.42.ST",
    case: "42mm satin-brushed steel",
    movement: "Automatic calibre CH-408 chronograph",
    crystal: "Sapphire, anti-reflective",
    waterResistance: "100m",
    strap: "Vulcanised black rubber",
    strapMaterial: "rubber",
    variants: [
      { id: "steel-black", label: "Steel / Onyx", swatch: "#0f0f10" },
      { id: "steel-slate", label: "Steel / Slate", swatch: "#5b6069" },
    ],
  },
  {
    id: "p-03",
    slug: "atelier-skeleton-limited",
    name: "Atelier Skeleton — Limited",
    collection: "limited",
    price: 18400,
    image: limited,
    imageAlt: "Atelier Skeleton — rose gold case, open dial, blue alligator strap",
    tagline: "The mechanism, unveiled.",
    description:
      "Only 88 pieces. A hand-skeletonised rose gold movement suspended in a sapphire cage. Each is signed and numbered by its maker.",
    reference: "REF. A.88.RG",
    case: "40mm 18k rose gold",
    movement: "Hand-skeletonised CH-Manuel S",
    crystal: "Double sapphire, exhibition case-back",
    waterResistance: "30m",
    strap: "Hand-rolled midnight alligator",
    strapMaterial: "leather",
    variants: [{ id: "rose-navy", label: "Rose Gold / Midnight", swatch: "#0f1a3a" }],
  },
  {
    id: "p-04",
    slug: "orbit-connected",
    name: "Orbit Connected",
    collection: "smart",
    price: 2950,
    image: smart,
    imageAlt: "Orbit Connected — titanium case, black dial, mesh bracelet",
    tagline: "Modern time, quietly measured.",
    description:
      "A titanium smart companion with a mechanical soul. Sapphire touch dial, milanese mesh bracelet, and 14 days of quiet on a single charge.",
    reference: "REF. O.40.TI",
    case: "40mm brushed titanium",
    movement: "CHRONOS Quartz Hybrid",
    crystal: "Sapphire touch",
    waterResistance: "50m",
    strap: "Milanese mesh, titanium",
    strapMaterial: "mesh",
    variants: [
      { id: "titan-black", label: "Titanium / Black", swatch: "#0b0b0c" },
      { id: "titan-slate", label: "Titanium / Slate", swatch: "#4a5058" },
    ],
  },
  {
    id: "p-05",
    slug: "aviator-mark-iii",
    name: "Aviator Mk. III",
    collection: "classic",
    price: 3950,
    image: pilot,
    imageAlt: "Aviator Mk. III — steel case, cream dial, black leather strap",
    tagline: "A pilot's instrument.",
    description:
      "The Mk. III revives our 1954 pilot's watch — a legible cream dial, generous lume, and a 40mm case tuned for the cockpit.",
    reference: "REF. AV.40.ST",
    case: "40mm brushed steel",
    movement: "Automatic calibre CH-311",
    crystal: "Domed sapphire",
    waterResistance: "50m",
    strap: "Aviation black leather",
    strapMaterial: "leather",
    variants: [{ id: "steel-cream", label: "Steel / Cream", swatch: "#efe4c8" }],
  },
  {
    id: "p-06",
    slug: "deepline-diver-300",
    name: "Deepline Diver 300",
    collection: "sport",
    price: 5450,
    image: diver,
    imageAlt: "Deepline Diver 300 — steel case, blue ceramic bezel, steel bracelet",
    tagline: "Made to descend.",
    description:
      "Certified to 300m with a scratch-resistant ceramic bezel, helium escape valve, and a three-link steel bracelet with micro-adjust clasp.",
    reference: "REF. D.42.ST",
    case: "42mm brushed steel",
    movement: "Automatic calibre CH-505",
    crystal: "Sapphire, anti-reflective",
    waterResistance: "300m",
    strap: "Three-link steel bracelet",
    strapMaterial: "steel",
    variants: [
      { id: "steel-blue", label: "Steel / Abyss Blue", swatch: "#0f2c58" },
      { id: "steel-black", label: "Steel / Onyx", swatch: "#0b0b0c" },
    ],
  },
];

export const collections: { slug: Collection; name: string; blurb: string }[] = [
  { slug: "classic", name: "Classic", blurb: "The founding silhouettes." },
  { slug: "sport", name: "Sport", blurb: "Engineered for motion." },
  { slug: "limited", name: "Limited Edition", blurb: "Numbered, and signed." },
  { slug: "smart", name: "Smart", blurb: "The connected companion." },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCollection = (c: Collection) => products.filter((p) => p.collection === c);
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);