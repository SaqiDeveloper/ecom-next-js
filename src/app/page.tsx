"use client";

import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { useCartStore } from "@/store/cart.store";
import { MenuCard } from "@/components/MenuCard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const { data, isLoading } = useProducts();
  const items = useCartStore((state) => state.items);
  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  if (isLoading) return <p className="p-5">Loading...</p>;

  return (
    <main className="mx-auto max-w-7xl p-5">
      <section className="mb-8">
        <h1 className="mb-1 text-3xl font-bold">Menu</h1>
        <p className="mb-4 text-sm text-slate-600">
          Product cards se items add karein, phir checkout karke cart page par jayen.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MenuCard
            title="Products"
            description="Neeche available products cards mein list hain."
            buttonLabel="Browse Products"
            onClick={() =>
              document.getElementById("products-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />
          <MenuCard
            title="Checkout"
            description={`Cart mein ${cartItemsCount} item(s) hain. Checkout se cart page open hoga.`}
            buttonLabel="Go To Cart"
            onClick={() => router.push("/cart")}
          />
        </div>
      </section>

      <section id="products-section">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Products</h2>
          <Button variant="outline" onClick={() => router.push("/cart")}>
            Checkout ({cartItemsCount})
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}