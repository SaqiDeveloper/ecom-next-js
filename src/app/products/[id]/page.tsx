import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductByIdServer } from "@/services/product.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return { title: "Product Not Found" };
  }

  const product = await getProductByIdServer(productId);
  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | eCommerce`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  const product = await getProductByIdServer(productId);
  if (!product) {
    notFound();
  }

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <main className="mx-auto max-w-4xl p-5">
      <div className="mb-4 flex items-center gap-3">
        <Link href="/products">
          <Button variant="outline">Back To Products</Button>
        </Link>
        <Link href="/cart">
          <Button>Go To Cart</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{product.name}</CardTitle>
          <CardDescription>
            {product.brand} - {product.category}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center rounded-lg bg-slate-100 p-5">
            <Image
              src={product.image}
              alt={product.name}
              width={320}
              height={260}
              className="h-auto max-h-64 w-auto object-contain"
              unoptimized
            />
          </div>
          <div className="space-y-3">
            <p className="text-sm text-slate-700">{product.description}</p>
            <p className="text-sm text-slate-600">Rating: {product.rating.toFixed(1)} / 5</p>
            <div className="flex items-center gap-2">
              {product.discount > 0 && (
                <span className="text-slate-400 line-through">${product.price.toFixed(2)}</span>
              )}
              <span className="text-xl font-bold">${discountedPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-slate-600">
              Availability: {product.availability ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
