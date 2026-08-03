import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { CartItem } from "@/features/purchase-request/components/cart-item";
import { PaymentMethodSelector } from "@/features/purchase-request/components/payment-method-selector";
import { PRODUCTS } from "@/data/products";
import type { PaymentMethodId } from "@/features/purchase-request/types";
import { formatRupiah } from "@/lib/format-rupiah";

interface OrderSummaryProps {
  items: {
    product: (typeof PRODUCTS)[number];
    quantity: number;
    lineTotal: number;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingEstimate: number;
  expeditionName: string;
  total: number;
  isEmpty: boolean;
  paymentMethod: PaymentMethodId;
  onPaymentMethodChange: (method: PaymentMethodId) => void;
  onRemoveItem: (productId: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

function OrderSummaryFields({
  items,
  subtotal,
  discount,
  tax,
  shippingEstimate,
  expeditionName,
  total,
  isEmpty,
  paymentMethod,
  onPaymentMethodChange,
  onRemoveItem,
  onSubmit,
  isSubmitting,
}: OrderSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      {isEmpty ? (
        <EmptyState
          imageSrc="/images/empty-cart.png"
          title="Keranjang anda kosong"
          description="Pilih produk terlebih dahulu"
        />
      ) : (
        <>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Item Terpilih
            </p>
            <ul className="">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
                  lineTotal={item.lineTotal}
                  onRemove={() => onRemoveItem(item.product.id)}
                />
              ))}
            </ul>
          </div>

          <div className="space-y-1.5 border-t border-border pt-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal</dt>
              <dd>{formatRupiah(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <dt>Discount</dt>
                <dd className="font-medium text-secondary">
                  -{formatRupiah(discount)}
                </dd>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <dt>Tax (11%)</dt>
              <dd>{formatRupiah(tax)}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Ongkir</dt>
              <dd>{formatRupiah(shippingEstimate)}</dd>
            </div>
            <div className="flex justify-between pb-3 text-muted-foreground">
              <dt>Expedisi</dt>
              <dd>{expeditionName}</dd>
            </div>
            <div className="flex justify-between border-y border-border py-3 text-base font-semibold text-foreground">
              <dt>Total</dt>
              <dd>{formatRupiah(total)}</dd>
            </div>
          </div>

          <PaymentMethodSelector
            value={paymentMethod}
            onChange={onPaymentMethodChange}
          />

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={onSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Memproses pesanan..." : "Submit Order"}
          </Button>
        </>
      )}
    </div>
  );
}

function OrderSummary(props: OrderSummaryProps) {
  return (
    <Card className="hidden lg:sticky lg:top-6 lg:block lg:self-start">
      <CardHeader>
        <CardTitle>Ringkasan pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderSummaryFields {...props} />
      </CardContent>
    </Card>
  );
}

export { OrderSummary, OrderSummaryFields };
