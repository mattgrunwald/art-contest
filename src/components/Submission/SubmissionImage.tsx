import Image from 'next/image'

export type SubmissionImageProps = {
  src: string
}

export const SubmissionImage = ({ src }: SubmissionImageProps) => (
  <div className="h-[90vh] w-full pb-2">
    <div className="relative flex h-full w-full justify-center">
      <Image
        src={src}
        fill
        alt="Picture of the author"
        className="object-contain"
      />
    </div>
  </div>
)
