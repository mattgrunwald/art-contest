'use client'
import { SubmissionForGallery } from '@/db/types'
import Image from 'next/image'
import Link from 'next/link'

const regex = /\d.jpg/
export type SubmissionViewProps = {
  sub: SubmissionForGallery
}
export const SubmissionGalleryImage = ({ sub }: SubmissionViewProps) => {
  const src = regex.test(sub.imageSrc)
    ? `/images/${sub.imageSrc}`
    : sub.imageSrc
  return (
    <div className="max-w-[500px] justify-center">
      <div className="w-full">
        <Link href={`/submission/${sub.id}`} prefetch={false}>
          <Image
            src={src}
            width={500}
            height={500}
            alt="Submission in the contest"
          />
        </Link>
      </div>
    </div>
  )
}
