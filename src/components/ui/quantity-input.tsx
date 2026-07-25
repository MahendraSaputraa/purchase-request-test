import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface QuantityInputProps {
  value: number;
  max: number;
  min?: number;
  disabled?: boolean;
  onChange: (next: number) => void;
  label: string;
}

function QuantityInput({
  value,
  max,
  min = 0,
  disabled = false,
  onChange,
  label,
}: QuantityInputProps) {
  const clamp = (n: number) => Math.min(Math.max(n, min), max);

  const handleDecrease = () => onChange(clamp(value - 1));
  const handleIncrease = () => onChange(clamp(value + 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(e.target.value.replace(/[^0-9]/g, ""));
    if (Number.isNaN(parsed)) return onChange(min);
    onChange(clamp(parsed));
  };

  const exceedsStock = value >= max;

  return (
    <div className=" items-center rounded-md  ">
      <Button
        variant={"primary"}
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        aria-label={`Kurangi jumlah ${label}`}
        className="h-8 px-2"
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        aria-label={`Jumlah ${label}`}
        className={cn(
          "h-8 w-10  bg-transparent text-center text-sm outline-none",
          exceedsStock && "text-warning",
        )}
      />
      <Button
        variant={"primary"}
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        aria-label={`Tambah jumlah ${label}`}
        className="h-8 px-2"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>
    </div>
  );
}

export { QuantityInput };
