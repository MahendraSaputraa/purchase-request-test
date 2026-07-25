import type { PaymentMethod } from "@/features/purchase-request/types";

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "cash",
    label: "Cash",
    description: "Bayar tunai saat barang diterima",
  },
  {
    id: "transfer_bank",
    label: "Transfer",
    description: "Transfer ke rekening Head Office",
  },
  {
    id: "qris",
    label: "Qris",
    description: "Scan kode QRIS untuk membayar",
  },
];
