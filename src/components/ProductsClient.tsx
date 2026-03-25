"use client";

import { ProductListResult, ProductQuery } from "@/types/product.types";
import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";

type Props = {
  query: ProductQuery;
  initialData: ProductListResult;
};

export function ProductsClient({ query, initialData }: Props) {
  const { data, isFetching, refetch } = useProducts({ query, initialData });
  const products = data?.items ?? initialData.items;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Refreshing..." : "Refresh Products"}
        </Button>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
