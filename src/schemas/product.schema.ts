import { z } from "zod";

export const reviewSchema = z.object({
  user_id: z.number(),
  rating: z.number(),
  comment: z.string(),
});

export const productSchema = z.object({
  product_id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  unit: z.string(),
  image: z.string().url(),
  discount: z.number(),
  availability: z.boolean(),
  brand: z.string(),
  category: z.string(),
  rating: z.number(),
  reviews: z.array(reviewSchema),
});

export const productsSchema = z.array(productSchema);