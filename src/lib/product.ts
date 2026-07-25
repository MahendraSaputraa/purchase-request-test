import { LOW_STOCK_THRESHOLD } from "@/data/products";

export type StockStatus = "available" | "low-stock" | "out-of-stock";

export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return "out-of-stock";

  if (stock <= LOW_STOCK_THRESHOLD) {
    return "low-stock";
  }

  return "available";
}
