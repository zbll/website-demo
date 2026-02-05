import { useMemo } from 'react';
import type { CartItem } from './types';

export default function useCartSummary(cartItems: CartItem[]): {
  totalCount: number;
  totalPrice: number;
} {
  const totalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.count, 0),
    [cartItems]
  );
  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }, [cartItems]);

  return { totalCount, totalPrice };
}
