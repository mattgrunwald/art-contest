import { SubmissionForGallery } from '@/drizzle/types'
import Image from 'next/image'

export type SubmissionViewProps = {
  sub: SubmissionForGallery
}
export const SubmissionGalleryImage = ({ sub }: SubmissionViewProps) => {
  return (
    <div className="max-w-[500px] justify-center">
      <div className="w-full">
        <Image
          src={`/images/${sub.imageSrc}`}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
    </div>
  )
}
