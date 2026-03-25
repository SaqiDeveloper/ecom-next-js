"use client";

import { Product } from "@/types/product.types";
import { ProductCard } from "@/components/ProductCard";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
}
