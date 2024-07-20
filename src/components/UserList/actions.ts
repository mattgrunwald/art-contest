'use server'

import { DAO } from '@/drizzle/dao'
import { getIsAdmin } from '../../app/serverSideUtils'
import { AdapterReturn } from '@/drizzle/types'
const wrapResult = async <T>(
  result: AdapterReturn<T>,
): Promise<AdapterReturn<T>> => {
  const isAdmin = await getIsAdmin()
  if (isAdmin) {
    return result
  }
  return {
    data: null,
    error: new Error('admins only'),
  }
}

export async function readAdmins() {
  return wrapResult(await DAO.readAdmins())
}

export async function addAdmin(email: string) {
  const isAdmin = await getIsAdmin()
  if (isAdmin) {
    return await DAO.createAdmin(email)
  }
  return {
    data: null,
    error: new Error('admins only'),
  }
}

export async function readJudges() {
  return wrapResult(await DAO.readJudges())
}

export async function addJudge(email: string) {
  const isAdmin = await getIsAdmin()
  if (isAdmin) {
    return await DAO.createJudge(email)
  }
  return {
    data: null,
    error: new Error('admins only'),
  }
}

export async function removePrivileges(email: string) {
  const isAdmin = await getIsAdmin()
  if (isAdmin) {
    return await DAO.createContestant(email)
  }
  return {
    data: null,
    error: new Error('admins only'),
  }
}
