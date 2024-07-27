import Link from 'next/link'

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
    <>
      {previousPage > 0 && (
        <Link
          href={`/${path}/${previousPage}`}
          aria-label="Go to previous page"
        >
          Previous
        </Link>
      )}
      {text}
      {nextPage < totalPages && (
        <Link href={`/${path}/${nextPage}`} aria-label="Go to next page">
          Next
        </Link>
      )}
    </>
  )
}
