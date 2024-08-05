import { deleteImages } from '@/bucket'
import { db } from '@/db/db'
import { submissions } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

export const deleteSubmission = async (
  subId: string,
): Promise<Error | null> => {
  await db.transaction(async (tx) => {
    try {
      const images = await tx.query.submittedImages.findMany({
        where: (submittedImages, { eq }) =>
          eq(submittedImages.submissionId, subId),
      })
      const urls = images.map((img) => img.url)
      deleteImages(urls)

      await tx.delete(submissions).where(eq(submissions.id, subId))
    } catch (error) {
      console.error(error)
      tx.rollback()
      return error as Error
    }
  })

  return null
}
