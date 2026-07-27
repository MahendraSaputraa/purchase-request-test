import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import type { OrderHistoryEntry } from "@/data/orders";
import { formatRupiah } from "@/lib/format-rupiah";

interface OrderHistoryListProps {
  orders: OrderHistoryEntry[];
}

const STATUS_VARIANT = {
  diproses: "warning",
  dikirim: "accent",
  selesai: "success",
} as const;

function OrderHistoryList({ orders }: OrderHistoryListProps) {
  if (orders.length === 0) {
    return (
      <EmptyState
        imageSrc="/images/shopping.png"
        title="Belum ada riwayat pesanan"
        description="Pesanan yang kamu buat akan muncul di sini."
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((order) => (
        <li key={order.id}>
          <Card>
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  {order.id}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.date).toLocaleDateString("id-ID", {
                    dateStyle: "long",
                  })}{" "}
                  {order.itemCount} item
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {formatRupiah(order.total)}
                </p>
                <Badge
                  variant={STATUS_VARIANT[order.status]}
                  className="mt-1 capitalize"
                >
                  {order.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export { OrderHistoryList };
