import { DAO } from '@/db/dao'
import { handleError } from '../shared/helpers'
import { ContestantSubmissionView } from './ContestantSubmissionView'

export type ContestantSubmissionProps = {
  subId: string
  userId: string | null
}

export const ContestantSubmission = async ({
  subId,
  userId,
}: ContestantSubmissionProps) => {
  const result = await DAO.readSubmissionForContestant(subId)
  if (result.error !== null) {
    return handleError(result.error)
  }
  const sub = result.data
  const canEdit = userId !== null && userId === sub.userId
  return <ContestantSubmissionView sub={sub} canEdit={canEdit} />
}
