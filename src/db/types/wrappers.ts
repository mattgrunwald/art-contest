export type AdapterReturn<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: Error
    }

export type PAT<T> = Promise<AdapterReturn<T>>

export type PaginatedResults<T> = {
  page: number
  results: T[]
  total: number
}
