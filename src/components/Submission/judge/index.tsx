import { DAO } from '@/db/dao'
import { handleError } from '../shared/helpers'
import { JudgeSubmissionView } from './JudgeSubmissionView'

export type JudgeSubmissionProps = {
  judgeId: string | null
  subId: string
}

export const JudgeSubmission = async ({
  judgeId,
  subId,
}: JudgeSubmissionProps) => {
  if (judgeId !== null) {
    const [categories, result] = await Promise.all([
      DAO.readCategories(),
      DAO.readSubmissionForJudge(subId, judgeId),
    ])
    if (result.error !== null) {
      return handleError(result.error)
    }
    if (categories.error !== null) {
      return handleError(categories.error)
    }
    if (!categories.data) {
      return handleError(new Error('no categories'))
    }
    return (
      <JudgeSubmissionView
        sub={result.data}
        categories={categories.data}
        judgeId={judgeId}
      />
    )
  } else {
    return handleError(new Error('judge with no id'))
  }
}
