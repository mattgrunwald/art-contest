import {
  Category,
  Submission,
  SubmissionForAdmin,
  SubmissionForContestant,
  SubmissionForJudge,
} from '@/db/types'
import Image from 'next/image'
import { ScoresList } from '../ScoresList'
import { Scorer } from '../Scorer'
import { Button } from '@headlessui/react'
import { approveSubmission } from './actions'
import DeleteDialog from './DeleteDialog'

export type SubmissionViewProps = {
  sub: SubmissionForAdmin | SubmissionForContestant | SubmissionForJudge
}
const BaseSubmissionView = async ({ sub }: SubmissionViewProps) => {
  return (
    <div className="max-w-[500px] justify-center">
      <div className="w-full">
        <Image
          src={`/images/${sub.imageSrc}`}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
      <div>
        <p>{sub.statement}</p>
      </div>
    </div>
  )
}

export type AdminSubmissionViewProps = {
  sub: SubmissionForAdmin
  categories: Category[]
}

export const AdminSubmissionView = async ({
  sub,
  categories,
}: AdminSubmissionViewProps) => {
  const categoriesMap: Record<string, Category> = {}
  for (const category of categories) {
    categoriesMap[`${category.id}`] = category
  }
  return (
    <>
      <BaseSubmissionView sub={sub} />
      <ScoresList
        aggregateScore={sub.aggregateScore}
        scores={sub.scores}
        categories={categoriesMap}
      />
      {!sub.approved && (
        <Button onClick={() => approveSubmission(sub.id)}>Approve</Button>
      )}
      <DeleteDialog subId={sub.id} />
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
    <>
      <BaseSubmissionView sub={sub} />
      <Scorer
        baseScore={baseScore}
        categories={categories}
        scores={sub.scores}
      />
      {/* <div>{JSON.stringify(sub.scores)}</div> */}
    </>
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
