'use client'
import Image from 'next/image'
import { useContext } from 'react'
import { ImageContext } from './ImageContext'
import { imageUrl } from '@/util/helpers'
export type ImagePreviewProps = {
  remoteSrc: string | null
}

export const ImagePreview = ({ remoteSrc }: ImagePreviewProps) => {
  const { imageSrc } = useContext(ImageContext)

  return (
    <>
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
          src={imageUrl(remoteSrc)}
          alt="Image preview"
          width={200}
          height={200}
        />
      ) : null}
    </>
  )
}
