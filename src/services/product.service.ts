import { productsSchema } from "@/schemas/product.schema";
import { Product, ProductListResult, ProductQuery } from "@/types/product.types";

const PRODUCTS_API_URL = "https://fake-store-api.mock.beeceptor.com/api/products";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

function normalizeQuery(query?: Partial<ProductQuery>): ProductQuery {
  return {
    page: query?.page && query.page > 0 ? query.page : DEFAULT_PAGE,
    limit: query?.limit && query.limit > 0 ? query.limit : DEFAULT_LIMIT,
    category: query?.category?.trim() || undefined,
    search: query?.search?.trim() || undefined,
  };
}

function applyFilters(products: Product[], query: ProductQuery): Product[] {
  return products.filter((product) => {
    const matchesCategory = query.category
      ? product.category.toLowerCase() === query.category.toLowerCase()
      : true;
    const searchText = query.search?.toLowerCase();
    const matchesSearch = searchText
      ? product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText) ||
        product.brand.toLowerCase().includes(searchText)
      : true;

    return matchesCategory && matchesSearch;
  });
}

async function fetchProductsFromOrigin(): Promise<Product[]> {
  const res = await fetch(PRODUCTS_API_URL, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const raw = await res.json();
  return productsSchema.parse(raw);
}

function toProductListResult(products: Product[], query: ProductQuery): ProductListResult {
  const filtered = applyFilters(products, query);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / query.limit));
  const safePage = Math.min(query.page, totalPages);
  const start = (safePage - 1) * query.limit;
  const end = start + query.limit;
  const items = filtered.slice(start, end);
  const categories = Array.from(new Set(products.map((item) => item.category))).sort();

  return {
    items,
    total,
    totalPages,
    page: safePage,
    limit: query.limit,
    categories,
  };
}

// SSR/ISR fetch: use in Server Components
export async function getProductsServer(query?: Partial<ProductQuery>): Promise<ProductListResult> {
  const products = await fetchProductsFromOrigin();
  return toProductListResult(products, normalizeQuery(query));
}

export async function getProductByIdServer(productId: number): Promise<Product | null> {
  const products = await fetchProductsFromOrigin();
  return products.find((item) => item.product_id === productId) ?? null;
}

// Client fetch: use in React Query for revalidation/refetch
export async function getProductsClient(query?: Partial<ProductQuery>): Promise<ProductListResult> {
  const normalized = normalizeQuery(query);
  const params = new URLSearchParams({
    page: String(normalized.page),
    limit: String(normalized.limit),
  });

  if (normalized.category) params.set("category", normalized.category);
  if (normalized.search) params.set("search", normalized.search);

  const res = await fetch(`/api/products?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const raw = await res.json();
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.items)) {
    throw new Error("Invalid products payload");
  }

  return {
    ...raw,
    items: productsSchema.parse(raw.items),
  } as ProductListResult;
}