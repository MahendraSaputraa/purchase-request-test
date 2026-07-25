import { Header } from "@/components/layout/header";
import { PageContainer } from "@/components/layout/page-container";
import { OrderHistoryList } from "@/features/order-history/components/order-history-list";
import { ORDER_HISTORY } from "@/data/orders";

export default function OrderHistoryPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto bg-background">
      <Header />
      <PageContainer>
        <h1 className="mb-6 font-heading text-xl font-semibold text-foreground">
          Riwayat pesanan
        </h1>
        <OrderHistoryList orders={ORDER_HISTORY} />
      </PageContainer>
    </div>
  );
}
