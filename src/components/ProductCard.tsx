"use client";

import { Product } from "@/types/product.types";
import { useCartStore } from "@/store/cart.store";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const finalPrice = product.price - (product.price * product.discount) / 100;

  return (
    <Card className="h-full overflow-hidden transition hover:shadow-md">
      <div className="flex h-48 items-center justify-center bg-slate-100 p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={160}
          className="max-h-full w-auto object-contain"
          unoptimized
        />
      </div>
      <CardHeader>
        <CardTitle>
          <Link href={`/products/${product.product_id}`} className="hover:underline">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription>{product.brand}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="text-sm text-amber-600">Rating: {product.rating.toFixed(1)} / 5</div>
        <div className="text-sm text-slate-600">{product.description}</div>
        <div className="flex items-center gap-2">
          {product.discount > 0 && (
            <span className="text-sm text-slate-400 line-through">${product.price.toFixed(2)}</span>
          )}
          <span className="text-lg font-bold">${finalPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
              -{product.discount}%
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Link href={`/products/${product.product_id}`} className="w-1/2">
            <Button variant="outline" className="w-full">
              Details
            </Button>
          </Link>
          <Button onClick={() => addToCart(product)} className="w-1/2">
            Add To Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};