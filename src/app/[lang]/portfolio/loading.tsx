import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

function PortfolioCardSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-18 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioLoading() {
  return (
    <main className="flex-1">
      {/* Hero skeleton */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-100">
        <Container>
          <Skeleton className="h-4 w-28 mb-4" />
          <Skeleton className="h-10 w-64 mb-3" />
          <Skeleton className="h-5 w-80 max-w-full mb-2" />
          <Skeleton className="h-5 w-60 max-w-full" />
        </Container>
      </section>

      {/* Stats skeleton */}
      <section className="py-6 border-b border-neutral-100 bg-white">
        <Container>
          <div className="flex gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Filter tabs skeleton */}
      <section className="py-5 border-b border-neutral-100 bg-white sticky top-16 z-10">
        <Container>
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-full shrink-0" />
            ))}
          </div>
        </Container>
      </section>

      {/* Grid skeleton */}
      <section className="py-12">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <PortfolioCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
