'use client'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { ImageContext } from './ImageContext'
import { getImageSrcUrl } from '../UserList/util'
export type ImagePreviewProps = {
  remoteSrc: string | null
  className: string
}

export const ImagePreview = ({ remoteSrc, className }: ImagePreviewProps) => {
  const { imageSrc } = useContext(ImageContext)

  return (
    <div className={className}>
      <div className="h-[200px] w-full border-2 border-dashed border-neutral-300 dark:border-neutral-600">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            className="h-full w-full translate-x-0 translate-y-0 transform-gpu object-contain"
            alt="Image preview"
          />
        ) : remoteSrc ? (
          <Image
            className="h-full w-full translate-x-0 translate-y-0 transform-gpu object-contain"
            src={getImageSrcUrl(remoteSrc)}
            alt="Image preview"
            width={200}
            height={200}
          />
        ) : null}
      </div>
    </div>
  )
}
