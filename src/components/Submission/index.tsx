import { getIsAdmin, getIsJudge, getRole } from '@/app/serverSideUtils'
import {
  Submission,
  SubmissionForAdmin,
  SubmissionForContestant,
  SubmissionForJudge,
} from '@/db/types'
import Image from 'next/image'

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
}
export const AdminSubmissionView = async ({
  sub,
}: AdminSubmissionViewProps) => {
  return (
    <>
      <BaseSubmissionView sub={sub} />
      <div>Aggregate Score: {sub.aggregateScore}</div>
      <div>{JSON.stringify(sub.scores)}</div>
    </>
  )
}

export type JudgeSubmissionViewProps = {
  sub: SubmissionForJudge
}
export const JudgeSubmissionView = async ({
  sub,
}: JudgeSubmissionViewProps) => {
  return (
    <>
      <BaseSubmissionView sub={sub} />
      <div>{JSON.stringify(sub.scores)}</div>
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
