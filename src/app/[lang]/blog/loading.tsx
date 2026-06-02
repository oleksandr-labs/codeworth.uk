import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export default function BlogLoading() {
  return (
    <main className="flex-1">
      {/* Hero skeleton */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-100">
        <Container>
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-10 w-72 mb-3" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </Container>
      </section>

      {/* Filter tabs skeleton */}
      <section className="py-6 border-b border-neutral-100 bg-white sticky top-16 z-10">
        <Container>
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-full shrink-0" />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured post skeleton */}
      <section className="py-10">
        <Container>
          <div className="rounded-3xl overflow-hidden border border-neutral-100 bg-white mb-12">
            <div className="grid md:grid-cols-2 gap-0">
              <Skeleton className="h-72 md:h-full rounded-none" />
              <div className="p-8 space-y-4">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
                <Skeleton className="h-11 w-40 rounded-xl mt-4" />
              </div>
            </div>
          </div>

          {/* Posts grid skeleton */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
