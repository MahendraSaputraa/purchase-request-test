"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { PageContainer } from "@/components/layout/page-container";
import { ProductCatalog } from "@/features/purchase-request/components/product-catalog";
import { OrderSummary } from "@/features/purchase-request/components/order-summary";
import { CartFab } from "@/features/purchase-request/components/cart-fab";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/features/purchase-request/hooks/use-cart";
import type { PaymentMethodId } from "@/features/purchase-request/types";

export default function PurchaseRequestPage() {
  const { setQuantity, removeLine, getQuantity, summary } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  };

  const cartProps = {
    items: summary.items,
    subtotal: summary.subtotal,
    discount: summary.discount,
    tax: summary.tax,
    shippingEstimate: summary.shippingEstimate,
    expeditionName: summary.expeditionName,
    total: summary.total,
    isEmpty: summary.isEmpty,
    paymentMethod,
    onPaymentMethodChange: setPaymentMethod,
    onRemoveItem: removeLine,
    onSubmit: handleSubmit,
    isSubmitting,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageContainer className="pb-24 lg:pb-6">
        <div className="w-full text-center">
          <h1 className="mb-1 font-heading text-xl font-semibold text-foreground ">
            Form pemesanan stock cabang
          </h1>
          <p className="text-xs text-foreground lg:text-base">
            Cabang: Outlet Denpasar Utara II
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <ProductCatalog
            products={PRODUCTS}
            getQuantity={getQuantity}
            onQuantityChange={setQuantity}
          />
          <OrderSummary {...cartProps} />
        </div>
      </PageContainer>

      <CartFab {...cartProps} />
    </div>
  );
}
