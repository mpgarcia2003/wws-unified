'use client';

import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const { cart, isOpen, closeCart } = useCart();

  if (!isOpen) return null;

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={closeCart}
        aria-hidden="true"
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={closeCart} className="p-2 text-gray-500 hover:text-gray-800">
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{line.merchandise.product.title}</p>
                    <p className="text-sm text-gray-500">{line.merchandise.title}</p>
                    <p className="text-sm">Qty: {line.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ${(parseFloat(line.merchandise.price.amount) * line.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 && cart && (
          <div className="p-4 border-t space-y-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Subtotal</span>
              <span>${parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)}</span>
            </div>
            <a
              href={cart.checkoutUrl}
              className="block w-full text-center py-3 bg-[--color-wws-indigo] text-white font-semibold rounded-lg hover:bg-[--color-wws-indigo-dark] transition-colors"
            >
              Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
}
