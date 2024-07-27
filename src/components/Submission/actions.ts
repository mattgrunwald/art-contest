'use server'

import { DAO } from '@/db/dao'

export const approveSubmission = async (subId: number) => {
  return await DAO.approveSubmission(subId)
}

export const unapproveSubmission = async (subId: number) => {
  return await DAO.unapproveSubmission(subId)
}

export const deleteSubmission = async (subId: number) => {
  return await DAO.deleteSubmission(subId)
}
