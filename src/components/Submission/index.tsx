import {
  Category,
  JudgeWithScores,
  Submission,
  SubmissionForAdmin,
  SubmissionForContestant,
  SubmissionForJudge,
} from '@/db/types'

import { ScoresList } from './ScoresList'
import { Scorer } from './Scorer'
import { ActionBar } from './ActionBar'
import { SubmissionImage } from './SubmissionImage'
import { SubmissionStatement } from './SubmissionStatement'

const regex = /\d.jpg/

const Divider = () => <hr className="my-8 h-px border-0 bg-slate-700" />

export type SubmissionViewProps = {
  sub: SubmissionForAdmin | SubmissionForContestant | SubmissionForJudge
  maybeGrid?: boolean
}
const BaseSubmissionView = async ({
  sub,
  maybeGrid = false,
}: SubmissionViewProps) => {
  const src = regex.test(sub.imageSrc)
    ? `/images/${sub.imageSrc}`
    : sub.imageSrc
  return (
    <div className={`w-full ${maybeGrid ? 'overflow-y-auto lg:h-[80vh]' : ''}`}>
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
      <BaseSubmissionView sub={sub} />
      <Divider />
      <ScoresList
        aggregateScore={sub.aggregateScore}
        judgeScores={scores}
        categories={categoriesMap}
      />
      <ActionBar sub={sub} />
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
    <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-[2fr,1fr]">
      <div className="pt-4">
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
}
export const ContestantSubmissionView = async ({
  sub,
}: ContestantSubmissionViewProps) => {
  return (
    <>
      <BaseSubmissionView sub={sub} />
    </>
  )
}
