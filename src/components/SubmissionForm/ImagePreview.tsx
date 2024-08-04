'use client'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { ImageContext } from './ImageContext'
import { getImageSrcUrl } from '../UserList/util'
export type ImagePreviewProps = {
  remoteSrc: string | null
}

export const ImagePreview = ({ remoteSrc }: ImagePreviewProps) => {
  const { imageSrc } = useContext(ImageContext)

  return (
    <div className="h-[200px] w-full border-2 border-dashed border-white/25">
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} className="h-full w-full" alt="Image preview" />
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
  )
}
