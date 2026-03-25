"use client";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function ProductsError({ error, reset }: ErrorProps) {
  return (
    <main className="mx-auto max-w-3xl p-5">
      <h1 className="mb-2 text-2xl font-bold">Unable to load products</h1>
      <p className="mb-4 text-sm text-slate-600">{error.message}</p>
      <Button onClick={reset}>Try Again</Button>
    </main>
  );
}
