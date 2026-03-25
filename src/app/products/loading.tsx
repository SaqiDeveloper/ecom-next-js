export default function ProductsLoading() {
  return (
    <main className="mx-auto max-w-7xl p-5">
      <div className="mb-4 h-9 w-56 animate-pulse rounded bg-slate-200" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-4 h-36 animate-pulse rounded bg-slate-200" />
            <div className="mb-2 h-5 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="h-9 w-full animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
