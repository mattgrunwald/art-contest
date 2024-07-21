import { getRoleAndId } from '@/app/serverSideUtils'
import {
  AdminSubmissionView,
  ContestantSubmissionView,
  JudgeSubmissionView,
} from '@/components/Submission'
import { DAO } from '@/db/dao'
import { Role } from '@/db/util'
import { notFound } from 'next/navigation'

type SubmissionParams = {
  params: { id: string }
}

export default async function Page({ params }: SubmissionParams) {
  const subId = parseInt(params.id)
  if (isNaN(subId)) {
    return notFound()
  }
  const { role, id } = await getRoleAndId()
  switch (role) {
    case Role.Admin:
      const aResult = await DAO.readSubmissionForAdmin(subId)
      if (aResult.error !== null) {
        return handleError(aResult.error)
      }
      return <AdminSubmissionView sub={aResult.data} />
    case Role.Judge:
      if (id !== null) {
        const jResult = await DAO.readSubmissionForJudge(subId, id)
        if (jResult.error !== null) {
          return handleError(jResult.error)
        }
        return <JudgeSubmissionView sub={jResult.data} />
      } else {
        return handleError(new Error('judge with no id'))
      }
    case Role.Contestant:
      const cResult = await DAO.readSubmissionForContestant(subId)
      if (cResult.error !== null) {
        return handleError(cResult.error)
      }
      return <ContestantSubmissionView sub={cResult.data} />
  }
}

const handleError = (error: Error) => <div>Error: {error.message}</div>
