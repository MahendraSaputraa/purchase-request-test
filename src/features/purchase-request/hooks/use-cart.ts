import { useMemo, useState, useCallback } from "react";
import { PRODUCTS } from "@/data/products";
import type { CartLine } from "@/features/purchase-request/types";

const TAX_RATE = 0.11;
const FLAT_SHIPPING_ESTIMATE = 50000;
const DISCOUNT_RATE = 0.1;
const EXPEDITION_NAME = "Reguler (Sicepat)";

function clampToStock(quantity: number, stock: number) {
  return Math.min(Math.max(quantity, 0), stock);
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const safeQuantity = clampToStock(quantity, product.stock);

    setLines((prev) => {
      const existing = prev.find((line) => line.productId === productId);

      if (safeQuantity === 0) {
        return prev.filter((line) => line.productId !== productId);
      }
      if (existing) {
        return prev.map((line) =>
          line.productId === productId
            ? { ...line, quantity: safeQuantity }
            : line,
        );
      }
      return [...prev, { productId, quantity: safeQuantity }];
    });
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((line) => line.productId !== productId));
  }, []);

  const getQuantity = useCallback(
    (productId: string) =>
      lines.find((line) => line.productId === productId)?.quantity ?? 0,
    [lines],
  );

  const summary = useMemo(() => {
    const items = lines
      .map((line) => {
        const product = PRODUCTS.find((p) => p.id === line.productId);
        if (!product) return null;
        return {
          product,
          quantity: line.quantity,
          lineTotal: product.pricePerUnit * line.quantity,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const discount =
      items.length > 0 ? Math.round(subtotal * DISCOUNT_RATE) : 0;
    const taxableAmount = subtotal - discount;
    const tax = Math.round(taxableAmount * TAX_RATE);
    const shippingEstimate = items.length > 0 ? FLAT_SHIPPING_ESTIMATE : 0;
    const total = taxableAmount + tax + shippingEstimate;

    return {
      items,
      subtotal,
      discount,
      tax,
      shippingEstimate,
      expeditionName: EXPEDITION_NAME,
      total,
      isEmpty: items.length === 0,
    };
  }, [lines]);

  return { setQuantity, removeLine, getQuantity, summary };
}
