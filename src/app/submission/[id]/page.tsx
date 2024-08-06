import { getRoleAndId } from '@/app/serverSideUtils'
import {
  AdminSubmissionView,
  ContestantSubmissionView,
  JudgeSubmissionView,
} from '@/components/Submission'
import { DAO } from '@/db/dao'
import { Role } from '@/db/util'

type SubmissionParams = {
  params: { id: string }
}

export default async function Page({ params }: SubmissionParams) {
  const subId = params.id
  const { role, id } = await getRoleAndId()
  switch (role) {
    case Role.Admin:
      const judgesScoresPromise = DAO.scores.readJudgesScores(subId)
      const aCategoriesPromise = DAO.categories.readCategories()
      const aResultPromise = DAO.submissions.read.readSubmissionForAdmin(subId)
      const [aCategories, aResult, judgesScores] = await Promise.all([
        aCategoriesPromise,
        aResultPromise,
        judgesScoresPromise,
      ])
      if (aResult.error !== null) {
        return handleError(aResult.error)
      }
      if (aCategories.error !== null) {
        return handleError(aCategories.error)
      }
      if (!aCategories.data) {
        return handleError(new Error('no categories data'))
      }
      if (!judgesScores.data) {
        return handleError(judgesScores.error)
      }
      return (
        <AdminSubmissionView
          sub={aResult.data}
          scores={judgesScores.data}
          categories={aCategories.data}
        />
      )
    case Role.Judge:
      if (id !== null) {
        const jCategoriesPromise = DAO.categories.readCategories()
        const jResultPromise = DAO.submissions.read.readSubmissionForJudge(
          subId,
          id,
        )
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
        if (!jCategories.data) {
          return handleError(new Error('no categories'))
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
      const cResult =
        await DAO.submissions.read.readSubmissionForContestant(subId)
      if (cResult.error !== null) {
        return handleError(cResult.error)
      }
      const sub = cResult.data
      const canEdit = id === sub.userId
      return <ContestantSubmissionView sub={sub} canEdit={canEdit} />
  }
}

const handleError = (error: Error) => <div>Error: {error.message}</div>
