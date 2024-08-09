export const SubmissionSkeleton = () => (
  <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr,1fr]">
    <SectionSkeleton />
    <SectionSkeleton />
  </div>
)

const SectionSkeleton = () => (
  <div className="h-[40vh] min-h-[200px] w-full animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-800 lg:h-[90vh]"></div>
)
