import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuantityInput } from "@/components/ui/quantity-input";
import type { Product } from "@/features/purchase-request/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getStockStatus } from "@/lib/product";
import { formatRupiah } from "@/lib/format-rupiah";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

function ProductCard({
  product,
  quantity,
  onQuantityChange,
}: ProductCardProps) {
  const stockStatus = getStockStatus(product.stock);

  const isOutOfStock = stockStatus === "out-of-stock";
  const isLowStock = stockStatus === "low-stock";

  const isInCart = quantity > 0;

  return (
    <Card
      className={cn(
        "flex gap-3 p-3 shadow-none transition-colors",
        isOutOfStock && "opacity-60",
        isInCart && !isOutOfStock && "border-primary/50 ring-1 ring-primary/20",
      )}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-24">
        <Image
          height={200}
          width={200}
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="text-xs mb-1 font-medium text-muted-foreground">
            Stok: {product.stock} {product.unit}
          </p>
          <h3 className="truncate mb-3 font-heading lg:text-base text-sm font-semibold leading-tight text-foreground">
            {product.name}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {isOutOfStock && <Badge variant="destructive">Habis</Badge>}
            {isLowStock && <Badge variant="warning">Menipis</Badge>}
            {!isOutOfStock && !isLowStock && (
              <Badge variant="success">Tersedia</Badge>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-sm lg:text-base font-sans font-bold text-secondary">
            {formatRupiah(product.pricePerUnit)}
          </p>
          <QuantityInput
            label={product.name}
            value={quantity}
            max={product.stock}
            disabled={isOutOfStock}
            onChange={onQuantityChange}
          />
        </div>
      </div>
    </Card>
  );
}

export { ProductCard };
