import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

function NicheCardSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-5 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function NichesLoading() {
  return (
    <main className="flex-1">
      {/* Hero skeleton */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100">
        <Container>
          <Skeleton className="h-4 w-28 mb-4" />
          <Skeleton className="h-10 w-80 mb-3 max-w-full" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </Container>
      </section>

      {/* Category filter skeleton */}
      <section className="py-5 border-b border-neutral-100 dark:border-neutral-700 bg-white sticky top-16 z-10">
        <Container>
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-32 rounded-full shrink-0" />
            ))}
          </div>
        </Container>
      </section>

      {/* Grid skeleton */}
      <section className="py-12">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <NicheCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
