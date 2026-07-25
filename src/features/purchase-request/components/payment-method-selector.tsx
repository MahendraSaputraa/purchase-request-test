import { Banknote, Landmark, QrCode, type LucideIcon } from "lucide-react";
import { PAYMENT_METHODS } from "@/data/payment-methods";
import type { PaymentMethodId } from "@/features/purchase-request/types";
import { cn } from "@/lib/utils";

const PAYMENT_ICONS: Record<PaymentMethodId, LucideIcon> = {
  cash: Banknote,
  transfer_bank: Landmark,
  qris: QrCode,
};

interface PaymentMethodSelectorProps {
  value: PaymentMethodId;
  onChange: (value: PaymentMethodId) => void;
}

function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-foreground">Metode pembayaran</legend>
      <div className="grid grid-cols-3 gap-2">
        {PAYMENT_METHODS.map((method) => {
          const Icon = PAYMENT_ICONS[method.id];
          const isActive = value === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange(method.id)}
              aria-pressed={isActive}
              title={method.description}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md border px-2 py-2.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-input text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {method.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export { PaymentMethodSelector };
