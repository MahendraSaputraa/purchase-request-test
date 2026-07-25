export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  pricePerUnit: number;
  stock: number;
  unit: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export type PaymentMethodId = "transfer_bank" | "cash" | "qris";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  description: string;
}
