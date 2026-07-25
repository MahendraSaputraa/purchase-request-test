import { Trash, X } from "lucide-react";
import type { Product } from "@/features/purchase-request/types";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format-rupiah";

interface CartItemProps {
  product: Product;
  quantity: number;
  lineTotal: number;
  onRemove: () => void;
}

function CartItem({ product, quantity, lineTotal, onRemove }: CartItemProps) {
  return (
    <li className="py-2 text-sm">
      <div className="flex  items-center">
        <div className="w-1/12">
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={onRemove}
            aria-label={`Hapus ${product.name} dari keranjang`}
            className="h-7 px-2"
          >
            <Trash className="h-3 w-3" aria-hidden="true" />
          </Button>
        </div>
        <div className="w-11/12">
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 truncate font-medium text-foreground">
              {product.name}
            </p>
            <span className="font-semibold text-secondary">
              {formatRupiah(lineTotal)}
            </span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Quantity</span>
            <span>
              {quantity} {product.unit}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export { CartItem };
