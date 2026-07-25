import { ShoppingCart } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { OrderSummaryFields } from "@/features/purchase-request/components/order-summary";
import { PRODUCTS } from "@/data/products";
import type { PaymentMethodId } from "@/features/purchase-request/types";

interface CartFabProps {
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

function CartFab(props: CartFabProps) {
  const { items, isEmpty } = props;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger
        aria-label={
          isEmpty
            ? "Buka keranjang, keranjang masih kosong"
            : `Buka keranjang, ${itemCount} item`
        }
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 lg:hidden"
      >
        <ShoppingCart className="h-6 w-6" aria-hidden="true" />
        {!isEmpty && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-xs font-semibold text-secondary-foreground">
            {itemCount}
          </span>
        )}
      </SheetTrigger>

      <SheetContent title="Ringkasan pesanan">
        <h2 className="mb-3 font-heading text-base font-semibold text-foreground">
          Ringkasan Pesanan
        </h2>
        <OrderSummaryFields {...props} />
      </SheetContent>
    </Sheet>
  );
}

export { CartFab };
