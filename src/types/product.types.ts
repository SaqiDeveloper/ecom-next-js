export type Review = {
  user_id: number;
  rating: number;
  comment: string;
};

export type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  discount: number;
  availability: boolean;
  brand: string;
  category: string;
  rating: number;
  reviews: Review[];
};

export type ProductQuery = {
  page: number;
  limit: number;
  category?: string;
  search?: string;
};

export type ProductListResult = {
  items: Product[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  categories: string[];
};

export type ProductsApiResponse = ProductListResult;