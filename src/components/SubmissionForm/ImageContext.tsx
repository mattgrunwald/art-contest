'use client'

import React, {
  useState,
  createContext,
  PropsWithChildren,
  useEffect,
} from 'react'

export const ImageContext = createContext({
  setImage: (val: File | null) => {},
  imageSrc: null as string | null,
})
export const ImageProvider = ({ children }: PropsWithChildren) => {
  const [reader, setReader] = useState<FileReader | null>(null)

  const [image, setImage] = useState<File | null>(null)
  const [imageSrc, setTheImageSrc] = useState<string | null>(null)

  useEffect(() => {
    setReader(new FileReader())
  }, [])

  useEffect(() => {
    if (image && reader) {
      reader.onload = (e) => {
        setTheImageSrc(e.target?.result as string)
      }
      reader.readAsDataURL(image)
    } else {
      setTheImageSrc(null)
    }
  }, [reader, image])

  return (
    <ImageContext.Provider value={{ setImage, imageSrc }}>
      {children}
    </ImageContext.Provider>
  )
}
