"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AvailabilityFilter =
  | "all"
  | "available"
  | "low-stock"
  | "out-of-stock";

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  availability: AvailabilityFilter;
  onAvailabilityChange: (value: AvailabilityFilter) => void;
}

function ProductFilters({
  search,
  onSearchChange,
  availability,
  onAvailabilityChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <Input
        placeholder="Cari produk..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="md:flex-1"
      />

      <Select
        value={availability}
        onValueChange={(value) =>
          onAvailabilityChange(value as AvailabilityFilter)
        }
      >
        <SelectTrigger className="w-full md:w-52">
          <SelectValue placeholder="Ketersediaan" />
        </SelectTrigger>

        <SelectContent className="bg-white">
          <SelectItem value="all">Semua</SelectItem>
          <SelectItem value="available">Tersedia</SelectItem>
          <SelectItem value="low-stock">Menipis</SelectItem>
          <SelectItem value="out-of-stock">Habis</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export { ProductFilters };
