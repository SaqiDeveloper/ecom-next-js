import { useQuery } from "@tanstack/react-query";
import { ProductListResult, ProductQuery } from "@/types/product.types";
import { getProductsClient } from "@/services/product.service";

type UseProductsOptions = {
  query: ProductQuery;
  initialData?: ProductListResult;
};

export const useProducts = ({ query, initialData }: UseProductsOptions) => {
  return useQuery({
    queryKey: ["products", query.page, query.limit, query.category ?? "", query.search ?? ""],
    queryFn: () => getProductsClient(query),
    initialData,
    staleTime: 1000 * 60 * 1,
  });
};