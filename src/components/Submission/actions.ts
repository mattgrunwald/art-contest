'use server'

import { DAO } from '@/db/dao'

export const approveSubmission = async (subId: number) => {}

export const deleteSubmission = async (subId: number) => {
  return await DAO.deleteSubmission(subId)
}
