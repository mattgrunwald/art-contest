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
      const aCategoriesPromise = DAO.readCategories()
      const aResultPromise = DAO.readSubmissionForAdmin(subId)
      const [aCategories, aResult] = await Promise.all([
        aCategoriesPromise,
        aResultPromise,
      ])
      if (aResult.error !== null) {
        return handleError(aResult.error)
      }
      if (aCategories.error !== null) {
        return handleError(aCategories.error)
      }
      return (
        <AdminSubmissionView sub={aResult.data} categories={aCategories.data} />
      )
    case Role.Judge:
      if (id !== null) {
        const jCategoriesPromise = DAO.readCategories()
        const jResultPromise = DAO.readSubmissionForJudge(subId, id)
        const [jCategories, jResult] = await Promise.all([
          jCategoriesPromise,
          jResultPromise,
        ])
        if (jResult.error !== null) {
          return handleError(jResult.error)
        }
        if (jCategories.error !== null) {
          return handleError(jCategories.error)
        }
        return (
          <JudgeSubmissionView
            sub={jResult.data}
            categories={jCategories.data}
            judgeId={id}
          />
        )
      } else {
        return handleError(new Error('judge with no id'))
      }

    case Role.Contestant:
    default:
      const cResult = await DAO.readSubmissionForContestant(subId)
      if (cResult.error !== null) {
        return handleError(cResult.error)
      }
      return <ContestantSubmissionView sub={cResult.data} />
  }
}

const handleError = (error: Error) => <div>Error: {error.message}</div>
