import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string, variant?: string) => void;
  setQty: (id: string, variant: string | undefined, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  count: () => number;
  subtotal: () => number;
};

const key = (id: string, variant?: string) => `${id}::${variant ?? ""}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      add: (item, qty = 1) =>
        set((s) => {
          const k = key(item.id, item.variant);
          const existing = s.items.find((i) => key(i.id, i.variant) === k);
          const items = existing
            ? s.items.map((i) =>
                key(i.id, i.variant) === k ? { ...i, qty: i.qty + qty } : i,
              )
            : [...s.items, { ...item, qty }];
          return { items, open: true };
        }),
      remove: (id, variant) =>
        set((s) => ({ items: s.items.filter((i) => key(i.id, i.variant) !== key(id, variant)) })),
      setQty: (id, variant, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (key(i.id, i.variant) === key(id, variant) ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ open }),
      count: () => get().items.reduce((a, i) => a + i.qty, 0),
      subtotal: () => get().items.reduce((a, i) => a + i.qty * i.price, 0),
    }),
    { name: "chronos-cart" },
  ),
);