'use client';

import { create } from 'zustand';
import type { Cart, CartLine } from '@/lib/shopify/types';

type CartState = {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCart: (cart: Cart | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isOpen: false,
  isLoading: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setCart: (cart) => set({ cart }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// Helper selectors
export const getCartLines = (cart: Cart | null): CartLine[] => {
  if (!cart) return [];
  return cart.lines.edges.map((edge) => edge.node);
};

export const getCartTotal = (cart: Cart | null): string => {
  if (!cart) return '0.00';
  return cart.cost.subtotalAmount.amount;
};

export const getCartCount = (cart: Cart | null): number => {
  if (!cart) return 0;
  return cart.totalQuantity;
};
