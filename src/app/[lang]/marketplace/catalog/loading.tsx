import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function CatalogLoading() {
  return (
    <main className="flex-1">
      {/* Hero skeleton */}
      <section className="py-16 bg-indigo-950">
        <Container>
          <Skeleton className="h-4 w-36 mb-4 bg-white/10" />
          <Skeleton className="h-10 w-80 mb-3 bg-white/10 max-w-full" />
          <Skeleton className="h-5 w-96 max-w-full bg-white/10" />
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar skeleton */}
            <aside className="w-full lg:w-64 shrink-0 space-y-6">
              <div className="bg-white border border-neutral-100 dark:border-neutral-700 rounded-2xl p-5 space-y-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="bg-white border border-neutral-100 dark:border-neutral-700 rounded-2xl p-5 space-y-3">
                <Skeleton className="h-5 w-28" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ))}
              </div>
              <div className="bg-white border border-neutral-100 dark:border-neutral-700 rounded-2xl p-5 space-y-3">
                <Skeleton className="h-5 w-20" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </aside>

            {/* Product grid skeleton */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-9 w-40 rounded-xl" />
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
