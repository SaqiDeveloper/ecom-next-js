"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="mx-auto max-w-4xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cart</h1>
        <Link href="/">
          <Button variant="outline">Back To Menu</Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="pt-5">
            <p className="text-slate-600">Cart is empty.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <Card key={item.product_id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent className="flex items-center justify-between pt-5">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">${total.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}