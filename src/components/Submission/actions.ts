'use server'

import { DAO } from '@/db/dao'

export const approveSubmission = async (subId: string) => {
  return await DAO.approveSubmission(subId)
}

export const unapproveSubmission = async (subId: string) => {
  return await DAO.unapproveSubmission(subId)
}

export const deleteSubmission = async (subId: string) => {
  return await DAO.deleteSubmission(subId)
}
