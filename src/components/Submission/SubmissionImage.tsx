'use client'
import Image from 'next/image'
import { FullscreenImage } from './FullscreenImage'
import { useState } from 'react'

export type SubmissionImageProps = {
  src: string
  maybeGrid?: boolean
}

export const SubmissionImage = ({
  src,
  maybeGrid = false,
}: SubmissionImageProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div
        className={`h-[400px] w-full pb-2 ${maybeGrid ? 'lg:h-[60vh] lg:pr-8' : 'sm:h-[85vh]'}`}
      >
        <div className="relative flex h-full w-full justify-center rounded-lg bg-slate-100 dark:bg-slate-900">
          <Image
            src={src}
            fill
            alt="Picture of the author"
            sizes="(max-width: 1000px) 100vw, (max-width: 1800px) 50vw, 900px"
            className="cursor-pointer object-contain"
            onClick={() => setIsOpen(true)}
            quality={50}
          />
        </div>
      </div>
      <FullscreenImage
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        src={src}
      />
    </>
  )
}
