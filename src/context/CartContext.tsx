'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { shopifyFetch } from '@/lib/shopify/client';
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from '@/lib/shopify/queries';
import type { Cart } from '@/lib/shopify/types';
import { trackAddToCart } from '@/lib/analytics';

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  totalQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity: number, attributes?: Array<{ key: string; value: string }>) => Promise<void>;
  updateLineItem: (lineId: string, quantity: number) => Promise<void>;
  removeLineItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'wws-cart-id';

/**
 * Cart Provider
 *
 * Manages a Shopify Storefront API cart that works across
 * both storefront pages AND the shade builder.
 *
 * Replaces the old system where:
 *   - Storefront used Shopify's native /cart/add.js (Ajax API)
 *   - Builder used postMessage to tell the parent page to call /cart/add.js
 *
 * Now both sides use the same Storefront API cart directly.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Restore cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (savedCartId) {
      // TODO: Fetch existing cart by ID to restore state
    }
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback(
    async (
      variantId: string,
      quantity: number,
      attributes: Array<{ key: string; value: string }> = []
    ) => {
      setIsLoading(true);
      try {
        if (!cart) {
          const data = await shopifyFetch<{
            cartCreate: { cart: Cart; userErrors: Array<{ message: string }> };
          }>({
            query: CART_CREATE_MUTATION,
            variables: {
              input: {
                lines: [{ merchandiseId: variantId, quantity, attributes }],
              },
            },
            cache: 'no-store',
          });

          if (data.cartCreate.userErrors.length > 0) {
            throw new Error(data.cartCreate.userErrors[0].message);
          }

          setCart(data.cartCreate.cart);
          localStorage.setItem(CART_ID_KEY, data.cartCreate.cart.id);
        } else {
          const data = await shopifyFetch<{
            cartLinesAdd: { cart: Cart; userErrors: Array<{ message: string }> };
          }>({
            query: CART_LINES_ADD_MUTATION,
            variables: {
              cartId: cart.id,
              lines: [{ merchandiseId: variantId, quantity, attributes }],
            },
            cache: 'no-store',
          });

          if (data.cartLinesAdd.userErrors.length > 0) {
            throw new Error(data.cartLinesAdd.userErrors[0].message);
          }

          setCart(data.cartLinesAdd.cart);
        }

        trackAddToCart({
          id: variantId,
          name: 'Custom Shade',
          price: 0,
          quantity,
        });

        setIsOpen(true);
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const updateLineItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const data = await shopifyFetch<{
          cartLinesUpdate: { cart: Cart };
        }>({
          query: CART_LINES_UPDATE_MUTATION,
          variables: { cartId: cart.id, lines: [{ id: lineId, quantity }] },
          cache: 'no-store',
        });
        setCart(data.cartLinesUpdate.cart);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const removeLineItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const data = await shopifyFetch<{
          cartLinesRemove: { cart: Cart };
        }>({
          query: CART_LINES_REMOVE_MUTATION,
          variables: { cartId: cart.id, lineIds: [lineId] },
          cache: 'no-store',
        });
        setCart(data.cartLinesRemove.cart);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        totalQuantity: cart?.totalQuantity ?? 0,
        openCart,
        closeCart,
        addToCart,
        updateLineItem,
        removeLineItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
