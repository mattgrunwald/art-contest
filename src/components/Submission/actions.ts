'use server'

import { DAO } from '@/db/dao'
import { revalidatePath } from 'next/cache'

export const approveSubmission = async (subId: string) => {
  return await DAO.submissions.approveSubmission(subId)
}

export const unapproveSubmission = async (subId: string) => {
  return await DAO.submissions.unapproveSubmission(subId)
}

export const deleteSubmission = async (subId: string, approved: boolean) => {
  const result = await DAO.submissions.deleteSubmission(subId)
  if (approved) {
    revalidatePath('/gallery/page')
    revalidatePath('/gallery/[page]/page', 'page')
    revalidatePath('/gallery/unscored/page')
    revalidatePath('/gallery/unscored/[page]/page', 'page')
  } else {
    revalidatePath('/gallery/unapproved/[page]/page', 'page')
  }
  revalidatePath(`/submission/${subId}`)
  revalidatePath(`/edit/${subId}`)
  return result
}
