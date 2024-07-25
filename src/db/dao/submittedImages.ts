import { db } from '../db'
import { submittedImages } from '../schema'
import { AdapterReturn, SubmittedImage } from '../types'
import { valOrError, wrap } from './util'

export const createSubmittedImage = wrap(
  async (
    userId: string,
    filename: string,
  ): Promise<AdapterReturn<SubmittedImage>> => {
    const results = await db
      .insert(submittedImages)
      .values({ userId, filename })
      .returning()

    return valOrError(results[0])
  },
)
