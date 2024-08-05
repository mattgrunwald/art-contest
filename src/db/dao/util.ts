import { db } from '../db'
import { AdapterReturn, User } from '../types'
import { PAGE_SIZE } from '@/consts'

export const q = db.query

export const valOrError = <T>(val: T | undefined): AdapterReturn<T> => {
  if (val === undefined) {
    return { data: null, error: new Error('not found') }
  } else {
    return {
      data: val,
      error: null,
    }
  }
}

export function wrap<
  T,
  F extends (...args: any[]) => Promise<AdapterReturn<T>>,
>(fn: F): F {
  return <F>async function (...args: Parameters<F>) {
    try {
      return await fn(...args)
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }
}

export function wrapUserQuery(
  fn: () => Promise<User[]>,
): () => Promise<AdapterReturn<User[]>> {
  return async function () {
    try {
      const data = await fn()
      return { data, error: null }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }
}

export function getPaginationParams(page: number) {
  return {
    offset: (page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  }
}
