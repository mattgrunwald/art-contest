'use client'
import { SubmissionForGallery } from '@/db/types'
import { imageUrl } from '@/util/helpers'
import Image from 'next/image'
import Link from 'next/link'

export type SubmissionViewProps = {
  sub: SubmissionForGallery
}
export const SubmissionGalleryImage = ({ sub }: SubmissionViewProps) => {
  const src = imageUrl(sub.imageSrc)
  return (
    <div className="h-[40vh] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
      <div className="relative flex h-full w-full justify-center">
        <Link href={`/submission/${sub.id}`} prefetch={false}>
          <Image
            src={src}
            fill
            sizes={'(max-width: 1024px) 100vw, 25vw'}
            alt="Submission in the contest"
            className="translate-x-0 translate-y-0 transform-gpu object-contain"
            quality={25}
          />
        </Link>
      </div>
    </div>
  )
}
