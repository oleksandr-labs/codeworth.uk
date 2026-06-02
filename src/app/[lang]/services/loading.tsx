import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ServicesLoading() {
  return (
    <main className="flex-1">
      {/* Hero skeleton */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100">
        <Container>
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-12 w-72 mb-4 max-w-full" />
          <Skeleton className="h-5 w-96 max-w-full mb-2" />
          <Skeleton className="h-5 w-80 max-w-full" />
        </Container>
      </section>

      {/* Services grid skeleton */}
      <section className="py-16">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-9 w-28 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
