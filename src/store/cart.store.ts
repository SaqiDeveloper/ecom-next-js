import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "@/types/product.types";

export type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.product_id === product.product_id
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product_id === product.product_id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),
      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === productId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product_id === productId
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product_id !== productId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);