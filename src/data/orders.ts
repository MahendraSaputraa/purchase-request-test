export interface OrderHistoryEntry {
  id: string;
  date: string;
  itemCount: number;
  total: number;
  status: "diproses" | "dikirim" | "selesai";
}

export const ORDER_HISTORY: OrderHistoryEntry[] = [
  { id: "PO-0231", date: "2026-07-20", itemCount: 3, total: 950000, status: "selesai" },
  { id: "PO-0225", date: "2026-07-12", itemCount: 2, total: 550000, status: "dikirim" },
  { id: "PO-0219", date: "2026-06-30", itemCount: 5, total: 1820000, status: "diproses" },
];
