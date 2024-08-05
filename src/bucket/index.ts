import { put, PutBlobResult, del } from '@vercel/blob'
import { nanoid } from 'nanoid'

const suffixes: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
}

export function uploadImage(
  image: File,
): [Promise<PutBlobResult>, null] | [null, Error] {
  const { type } = image
  const suffix = suffixes[type]
  if (!suffix) {
    const error = new Error(`unknown file type "${type}"`)
    console.error(error)
    return [null, error]
  }

  // todo make this an md5 instead
  const fileName = `${nanoid()}${suffix}`
  const blobPromise = put(fileName, image, {
    access: 'public',
  })
  return [blobPromise, null]
}

export const deleteImages = (urls: string[]) =>
  Promise.allSettled(urls.map((url) => del(url)))

export const deleteImage = (url: string) => del(url)
