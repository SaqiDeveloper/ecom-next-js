import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <main className="mx-auto max-w-3xl p-5">
      <h1 className="mb-2 text-2xl font-bold">Product not found</h1>
      <p className="mb-4 text-sm text-slate-600">
        The product may have been removed or the URL is incorrect.
      </p>
      <Link href="/products">
        <Button>Back To Products</Button>
      </Link>
    </main>
  );
}
