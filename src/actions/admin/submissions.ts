'use server'

import { DAO } from '@/db/dao'
import { UpdateSubmissionDto } from '@/db/types'
import { revalidatePath } from 'next/cache'

export const approveSubmission = async (subId: string) => {
  return await DAO.approveSubmission(subId)
}

export const unapproveSubmission = async (subId: string) => {
  return await DAO.unapproveSubmission(subId)
}

export const deleteSubmission = async (subId: string, approved: boolean) => {
  const result = await DAO.deleteSubmission(subId)
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

export const createNewUserAndSubmission = (
  submission: UpdateSubmissionDto,
  name: string,
  email: string,
  image: File,
) => {
  const userData = {
    name,
    email,
  }

  const subData = {
    ...submission,
    approved: false,
    consentForm: null,
  }
  return DAO.createSubmissionAndUser(subData, userData, image)
}
