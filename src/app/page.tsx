import { MenuCard } from "@/components/MenuCard";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl p-5">
      <section className="mb-8">
        <h1 className="mb-1 text-3xl font-bold">Menu</h1>
        <p className="mb-4 text-sm text-slate-600">Choose a section to continue.</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MenuCard
            title="Products"
            description="SSR + ISR product listing with reusable card layout."
            buttonLabel="Browse Products"
            href="/products"
          />
          <MenuCard
            title="Checkout"
            description="Review cart items added from product cards."
            buttonLabel="Go To Cart"
            href="/cart"
          />
        </div>
      </section>
    </main>
  );
}