"use client";

import { useEffect, useMemo, useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { ProductCard } from "@/features/purchase-request/components/product-card";
import type { Product } from "@/features/purchase-request/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AvailabilityFilter, ProductFilters } from "./product-filters";
import { LOW_STOCK_THRESHOLD } from "@/data/products";
import { getStockStatus } from "@/lib/product";

const PAGE_SIZE = 8;

interface ProductCatalogProps {
  products: Product[];
  getQuantity: (productId: string) => number;
  onQuantityChange: (productId: string, quantity: number) => void;
}

function ProductCatalog({
  products,
  getQuantity,
  onQuantityChange,
}: ProductCatalogProps) {
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");

  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesAvailability =
        availability === "all"
          ? true
          : getStockStatus(product.stock) === availability;

      return matchesSearch && matchesAvailability;
    });
  }, [products, search, availability]);
  useEffect(() => {
    setPage(1);
  }, [search, availability]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  return (
    <section aria-labelledby="catalog-heading">
      <Card>
        <CardContent>
          <div className="pt-4 mb-4 gap-4 flex flex-col lg:flex-row lg:items-center justify-between">
            <CardTitle>Katalog produk HO</CardTitle>
            <ProductFilters
              search={search}
              onSearchChange={setSearch}
              availability={availability}
              onAvailabilityChange={setAvailability}
            />
          </div>
          {products.length === 0 ? (
            <EmptyState
              imageSrc="/images/shopping.png"
              title="Tidak ada produk yang ditemukan"
              description="Silakan coba lagi nanti atau hubungi admin Head Office."
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={getQuantity(product.id)}
                    onQuantityChange={(quantity) =>
                      onQuantityChange(product.id, quantity)
                    }
                  />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export { ProductCatalog };
