import Link from "next/link";
import { getProductsServer } from "@/services/product.service";
import { ProductsClient } from "@/components/ProductsClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductQuery } from "@/types/product.types";

export const revalidate = 300;

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
};

function toHref(query: ProductQuery): string {
  const params = new URLSearchParams({
    page: String(query.page),
    limit: String(query.limit),
  });
  if (query.category) params.set("category", query.category);
  if (query.search) params.set("search", query.search);
  return `/products?${params.toString()}`;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolved = await searchParams;
  const query: ProductQuery = {
    page: Math.max(1, Number(resolved.page ?? "1") || 1),
    limit: 10,
    category: resolved.category?.trim() || undefined,
    search: resolved.search?.trim() || undefined,
  };

  const result = await getProductsServer(query);
  const previousQuery: ProductQuery = { ...query, page: Math.max(1, result.page - 1) };
  const nextQuery: ProductQuery = { ...query, page: Math.min(result.totalPages, result.page + 1) };

  return (
    <main className="mx-auto max-w-7xl p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <form action="/products" className="flex w-full max-w-md items-center gap-2">
          <input
            type="text"
            name="search"
            defaultValue={query.search ?? ""}
            placeholder="Search by name, brand, description"
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500"
          />
          {query.category && <input type="hidden" name="category" value={query.category} />}
          <input type="hidden" name="page" value="1" />
          <Button type="submit">Search</Button>
        </form>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="outline">Back To Menu</Button>
          </Link>
          <Link href="/cart">
            <Button>Checkout</Button>
          </Link>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <Link href="/products">
          <Button variant={!query.category ? "default" : "outline"} className="h-8 px-3 text-xs">
            All
          </Button>
        </Link>
        {result.categories.map((category) => (
          <Link key={category} href={toHref({ ...query, page: 1, category })}>
            <Button
              variant={query.category === category ? "default" : "outline"}
              className="h-8 px-3 text-xs"
            >
              {category}
            </Button>
          </Link>
        ))}
      </div>

      {result.items.length === 0 ? (
        <Card>
          <CardContent className="pt-5">
            <p className="text-slate-600">No products found for current filters.</p>
            <Link href="/products" className="mt-3 inline-block">
              <Button variant="outline">Clear Filters</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <ProductsClient query={query} initialData={result} />
      )}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing page {result.page} of {result.totalPages} ({result.total} items)
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Link
          aria-disabled={result.page <= 1}
          href={toHref(previousQuery)}
          className={result.page <= 1 ? "pointer-events-none opacity-50" : ""}
        >
          <Button variant="outline">Previous</Button>
        </Link>
        <Link
          aria-disabled={result.page >= result.totalPages}
          href={toHref(nextQuery)}
          className={result.page >= result.totalPages ? "pointer-events-none opacity-50" : ""}
        >
          <Button variant="outline">Next</Button>
        </Link>
      </div>
    </main>
  );
}