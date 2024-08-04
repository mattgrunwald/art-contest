import {
  Category,
  JudgeWithScores,
  Submission,
  SubmissionForAdmin,
  SubmissionForContestant,
  SubmissionForJudge,
  User,
} from '@/db/types'

import { ScoresList } from './ScoresList'
import { Scorer } from './Scorer'
import { ActionBar } from './ActionBar'
import { SubmissionImage } from './SubmissionImage'
import { SubmissionStatement } from './SubmissionStatement'
import { EditButton } from './ActionBar/EditButton'
import { ContestantInfo } from './ContestantInfo'
import { getImageSrcUrl } from '@/util/helpers'

export type SubmissionViewProps = {
  sub: SubmissionForAdmin | SubmissionForContestant | SubmissionForJudge
  maybeGrid?: boolean
  grid?: boolean
}
const BaseSubmissionView = async ({
  sub,
  maybeGrid = false,
  grid = false,
}: SubmissionViewProps) => {
  const src = getImageSrcUrl(sub.imageSrc)
  return (
    <div
      className={`w-full ${maybeGrid ? 'overflow-y-auto lg:h-[80vh]' : grid ? 'grid grid-cols-1 gap-3 lg:grid-cols-[2fr,auto]' : ''}`}
    >
      <SubmissionImage src={src} maybeGrid={maybeGrid} />
      <SubmissionStatement text={sub.statement} />
    </div>
  )
}

export type AdminSubmissionViewProps = {
  sub: SubmissionForAdmin
  scores: JudgeWithScores[]
  categories: Category[]
}

export const AdminSubmissionView = async ({
  sub,
  scores,
  categories,
}: AdminSubmissionViewProps) => {
  const categoriesMap: Record<string, Category> = {}
  for (const category of categories) {
    categoriesMap[`${category.id}`] = category
  }
  return (
    <>
      <div className="flex w-full justify-end">
        <ActionBar sub={sub} />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="grid w-full max-w-[2000px] grid-cols-1 gap-x-4 lg:grid-cols-[1fr,1fr]">
          <div>
            <BaseSubmissionView sub={sub} maybeGrid />
          </div>
          <div className="flex flex-col items-center justify-start">
            <div className="*:mb-4">
              <ScoresList
                aggregateScore={sub.aggregateScore}
                judgeScores={scores}
                categories={categoriesMap}
              />
              <ContestantInfo sub={sub} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export type JudgeSubmissionViewProps = {
  sub: SubmissionForJudge
  categories: Category[]
  judgeId: string
}
export const JudgeSubmissionView = async ({
  sub,
  categories,
  judgeId,
}: JudgeSubmissionViewProps) => {
  const baseScore = {
    judgeId,
    submissionId: sub.id,
  }
  return (
    <div className="flex w-full justify-center">
      <div className="grid w-full max-w-[2000px] grid-cols-1 gap-x-4 lg:grid-cols-[2fr,1fr]">
        <div className="">
          <BaseSubmissionView sub={sub} maybeGrid />
        </div>
        <div className="flex items-start justify-center pt-4">
          <Scorer
            baseScore={baseScore}
            categories={categories}
            scores={sub.scores}
          />
        </div>
      </div>
    </div>
  )
}

export type SelfSubmissionViewProps = {
  sub: Submission
}
export const SelfSubmissionView = async ({ sub }: SelfSubmissionViewProps) => {
  return (
    <>
      <BaseSubmissionView sub={sub} />
    </>
  )
}

export type ContestantSubmissionViewProps = {
  sub: SubmissionForContestant
  canEdit: boolean
}
export const ContestantSubmissionView = async ({
  sub,
  canEdit = false,
}: ContestantSubmissionViewProps) => {
  return (
    <>
      {canEdit && (
        <div className="mb-2 flex w-full items-center justify-between">
          <div></div>
          <div>
            {!sub.approved && (
              <div className="flex w-full justify-center rounded-lg bg-orange-300 p-2 font-semibold dark:bg-orange-800">
                Pending Approval
              </div>
            )}
          </div>

          <div className="mr-2">
            <EditButton subId={sub.id} />
          </div>
        </div>
      )}
      <BaseSubmissionView sub={sub} grid />
    </>
  )
}
