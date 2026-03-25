"use client";

import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product.types";
import { useCartStore } from "@/store/cart.store";


export default function ProductsPage() {
  const { data, isLoading } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {data?.map((product: Product) => (
        <div key={product.product_id} className="border p-4">
          <h2>{product.name}</h2>
          <p>${product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-3 py-1 mt-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}