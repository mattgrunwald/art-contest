'use server'

import { DAO } from '@/db/dao'
import { getIsAdmin } from '../../app/serverSideUtils'
import { AdapterReturn } from '@/db/types'
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
  return wrapResult(await DAO.users.readAdmins())
}

export async function addAdmin(email: string) {
  const isAdmin = await getIsAdmin()
  if (isAdmin) {
    return await DAO.users.makeAdmin(email)
  }
  return {
    data: null,
    error: new Error('admins only'),
  }
}

export async function readJudges() {
  return wrapResult(await DAO.users.readJudges())
}

export async function addJudge(email: string) {
  const isAdmin = await getIsAdmin()
  if (isAdmin) {
    return await DAO.users.makeJudge(email)
  }
  return {
    data: null,
    error: new Error('admins only'),
  }
}

export async function removePrivileges(email: string) {
  const isAdmin = await getIsAdmin()
  if (isAdmin) {
    return await DAO.users.makeContestant(email)
  }
  return {
    data: null,
    error: new Error('admins only'),
  }
}
