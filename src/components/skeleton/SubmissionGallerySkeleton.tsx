const ImageSkeleton = () => {
  return (
    <div className="relative h-[40vh] w-full max-w-md animate-pulse overflow-hidden rounded-xl bg-neutral-300 dark:bg-neutral-800"></div>
  )
}

const ButtonSkeleton = () => (
  <div className="h-10 w-[120px] animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-800 max-sm:w-[45vw]" />
)

export const SubmissionGallerySkeleton = () => (
  <div>
    <div className="mb-4 flex h-10 w-full justify-center gap-4 max-sm:flex-col sm:flex-row">
      {...new Array(4).fill(<ButtonSkeleton />)}
    </div>
    <div className="flex w-full flex-col items-center">
      <div className="mb-4 grid w-full grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {...new Array(12).fill(<ImageSkeleton />)}
      </div>
    </div>
  </div>
)
