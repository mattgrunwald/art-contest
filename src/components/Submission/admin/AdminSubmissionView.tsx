import { SubmissionForAdmin, JudgeWithScores, Category } from '@/db/types'
import { ActionBar } from '../ActionBar'
import { BaseSubmissionView } from '../shared/BaseSubmissionView'
import { ContestantInfo } from './ContestantInfo'
import { ScoresList } from './ScoresList'

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
