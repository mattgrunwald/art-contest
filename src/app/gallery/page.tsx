import { SubmissionView } from '@/components/Submission'
import { submissions } from '@/components/util/types'
import { getIsAdmin, getRole } from '../serverSideUtils'
import { ScrubbedSubmission, Submission } from '@/drizzle/types'
import { Level, Role } from '@/drizzle/util'
import { DAO } from '@/drizzle/dao'

type GalleryParams = {
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function Page({ searchParams }: GalleryParams) {
  const role = await getRole()
  const page = getPage(searchParams.page)
  const limit = 30 // TODO make this env var?
  const year = 2024 // TODO make this env var
  const level = (searchParams.level || '') as Level
  const offset = (page - 1) * limit

  let subs: Submission[] | ScrubbedSubmission[] = []
  let err: Error | null = null
  switch (role) {
    case Role.Admin:
    case Role.Judge:
      const { data, error } = await DAO.readSubmissions(
        limit,
        offset,
        year,
        level,
      )
      if (error != null) {
        err = null
      } else {
        subs = data
      }
      break
    default:
      let res = await DAO.readScrubbedSubmissions(limit, offset, year, level)
      if (res.error != null) {
        err = res.error
      } else {
        subs = res.data
      }
  }

  if (err != null) {
    return <div>ERROR: {err.message}</div>
  }
  return (
    <div className="grid grid-cols-2 gap-x-1 gap-y-1">
      {submissions.map((sub) => (
        <SubmissionView key={sub.id} sub={sub} role={role} />
      ))}
    </div>
  )
}

const getPage = (page: string | string[] | undefined) => {
  if (page === undefined || typeof page !== 'string') {
    return 1
  }

  const int = parseInt(page)
  return isNaN(int) ? 1 : int
}
