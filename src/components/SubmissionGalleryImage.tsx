import { SubmissionForGallery } from '@/drizzle/types'
import Image from 'next/image'
import Link from 'next/link'

export type SubmissionViewProps = {
  sub: SubmissionForGallery
}
export const SubmissionGalleryImage = ({ sub }: SubmissionViewProps) => {
  return (
    <div className="max-w-[500px] justify-center">
      <div className="w-full">
        <Link href={`/submission/${sub.id}`} prefetch={false}>
          <Image
            src={`/images/${sub.imageSrc}`}
            width={500}
            height={500}
            alt="Submission in the contest"
          />
        </Link>
      </div>
    </div>
  )
}
