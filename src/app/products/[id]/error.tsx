"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  reset: () => void;
};

export default function ProductDetailError({ reset }: ErrorProps) {
  return (
    <main className="mx-auto max-w-3xl p-5">
      <h1 className="mb-2 text-2xl font-bold">Unable to load product</h1>
      <p className="mb-4 text-sm text-slate-600">Please retry or return to the products list.</p>
      <div className="flex items-center gap-2">
        <Button onClick={reset}>Try Again</Button>
        <Link href="/products">
          <Button variant="outline">Back To Products</Button>
        </Link>
      </div>
    </main>
  );
}
