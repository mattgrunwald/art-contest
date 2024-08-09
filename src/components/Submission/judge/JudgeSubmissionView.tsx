import { SubmissionForJudge, Category } from '@/db/types'
import { BaseSubmissionView } from '../shared/BaseSubmissionView'
import { Scorer } from './Scorer'

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
