import Image from 'next/image'

export type SubmissionImageProps = {
  src: string
  maybeGrid?: boolean
}

export const SubmissionImage = ({
  src,
  maybeGrid = false,
}: SubmissionImageProps) => (
  <div
    className={`h-[400px] w-full pb-2 ${maybeGrid ? 'lg:h-[60vh]' : 'sm:h-[85vh]'}`}
  >
    <div className="relative flex h-full w-full justify-center rounded-lg bg-slate-100 dark:bg-slate-900">
      <Image
        src={src}
        fill
        alt="Picture of the author"
        className="object-contain"
      />
    </div>
  </div>
)
