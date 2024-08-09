import { DAO } from '@/db/dao'
import { handleError } from '../shared/helpers'
import { AdminSubmissionView } from './AdminSubmissionView'

export type AdminSubmissionProps = {
  subId: string
}

export const AdminSubmission = async ({ subId }: AdminSubmissionProps) => {
  const [categories, result, judgesScores] = await Promise.all([
    DAO.readCategories(),
    DAO.readSubmissionForAdmin(subId),
    DAO.readJudgesScores(subId),
  ])
  if (result.error !== null) {
    return handleError(result.error)
  }
  if (categories.error !== null) {
    return handleError(categories.error)
  }
  if (!categories.data) {
    return handleError(new Error('no categories data'))
  }
  if (!judgesScores.data) {
    return handleError(judgesScores.error)
  }

  return (
    <AdminSubmissionView
      sub={result.data}
      scores={judgesScores.data}
      categories={categories.data}
    />
  )
}
