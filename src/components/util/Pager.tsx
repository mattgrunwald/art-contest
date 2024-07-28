import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

export type PagerProps = {
  page: number
  totalPages: number
  path: string
}

export const Pager = ({ page, totalPages, path }: PagerProps) => {
  const text = `${page} of ${totalPages}`
  const nextPage = page + 1
  const previousPage = page - 1
  return (
    <div className="inline-flex">
      {previousPage > 0 ? (
        <Link href={`${path}/${previousPage}`} aria-label="Go to previous page">
          <ChevronLeftIcon className="size-5 pt-1" />
        </Link>
      ) : (
        <ChevronLeftIcon className="size-5 pt-1 text-slate-950 dark:text-slate-50" />
      )}
      {text}
      {nextPage <= totalPages ? (
        <Link href={`${path}/${nextPage}`} aria-label="Go to next page">
          <ChevronRightIcon className="size-5 pt-1" />
        </Link>
      ) : (
        <ChevronRightIcon className="size-5 pt-1 text-slate-950 dark:text-slate-50" />
      )}
    </div>
  )
}
