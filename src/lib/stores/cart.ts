'use client';

import { create } from 'zustand';
import type { Cart, CartLine, Money } from '@/lib/shopify/types';

type AddCartItemInput = {
  handle: string;
  title: string;
  image: string;
  price: string;
  size?: string;
};

type CartState = {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  lastAddedLabel: string | null;
  lastAddedAt: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCart: (cart: Cart | null) => void;
  setLoading: (loading: boolean) => void;
  addCartItem: (item: AddCartItemInput) => void;
};

function parsePriceString(price: string): Money {
  const numericValue = Number(price.replace(/[^0-9.]/g, '')) || 0;

  return {
    amount: numericValue.toFixed(2),
    currencyCode: 'USD',
  };
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isOpen: false,
  isLoading: false,
  lastAddedLabel: null,
  lastAddedAt: 0,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setCart: (cart) => set({ cart }),
  setLoading: (isLoading) => set({ isLoading }),
  addCartItem: (item) =>
    set((state) => {
      const price = parsePriceString(item.price);
      const variantTitle = item.size ? `Size ${item.size}` : 'Default';
      const existingLines = state.cart?.lines.edges ?? [];
      const matchingLine = existingLines.find(
        (edge) =>
          edge.node.merchandise.product.handle === item.handle &&
          edge.node.merchandise.selectedOptions.some(
            (option) => option.name === 'Size' && option.value === (item.size ?? 'Default'),
          ),
      );

      const nextLines = matchingLine
        ? existingLines.map((edge) =>
            edge.node.id === matchingLine.node.id
              ? {
                  node: {
                    ...edge.node,
                    quantity: edge.node.quantity + 1,
                    cost: {
                      ...edge.node.cost,
                      totalAmount: {
                        ...edge.node.cost.totalAmount,
                        amount: (
                          Number(edge.node.cost.amountPerQuantity.amount) *
                          (edge.node.quantity + 1)
                        ).toFixed(2),
                      },
                    },
                  },
                }
              : edge,
          )
        : [
            {
              node: {
                id: `local-${item.handle}-${item.size ?? 'default'}`,
                quantity: 1,
                merchandise: {
                  id: `local-merch-${item.handle}-${item.size ?? 'default'}`,
                  title: variantTitle,
                  selectedOptions: [
                    {
                      name: 'Size',
                      value: item.size ?? 'Default',
                    },
                  ],
                  product: {
                    id: `local-product-${item.handle}`,
                    handle: item.handle,
                    title: item.title,
                    featuredImage: {
                      url: item.image,
                      altText: item.title,
                      width: 1200,
                      height: 1500,
                    },
                  },
                  price,
                  compareAtPrice: null,
                },
                cost: {
                  totalAmount: price,
                  amountPerQuantity: price,
                  compareAtAmountPerQuantity: null,
                },
              },
            },
            ...existingLines,
          ];

      const totalQuantity = nextLines.reduce((sum, edge) => sum + edge.node.quantity, 0);
      const subtotalAmount = nextLines
        .reduce((sum, edge) => sum + Number(edge.node.cost.totalAmount.amount), 0)
        .toFixed(2);

      return {
        cart: {
          id: state.cart?.id ?? 'local-cart',
          checkoutUrl: state.cart?.checkoutUrl ?? '#',
          totalQuantity,
          cost: {
            totalAmount: {
              amount: subtotalAmount,
              currencyCode: price.currencyCode,
            },
            subtotalAmount: {
              amount: subtotalAmount,
              currencyCode: price.currencyCode,
            },
            totalTaxAmount: null,
          },
          lines: {
            edges: nextLines,
          },
        },
        isOpen: true,
        lastAddedLabel: `${item.title} added`,
        lastAddedAt: Date.now(),
      };
    }),
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
