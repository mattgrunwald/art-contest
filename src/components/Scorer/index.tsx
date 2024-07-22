import { Category, CreateScoreDto, Score as ScoreType } from '@/db/types'
import { Score } from './Score'

export type ScorerProps = {
  categories: Category[]
  scores: ScoreType[]
  baseScore: {
    judgeId: string
    submissionId: number
  }
}
export const Scorer = ({ categories, scores, baseScore }: ScorerProps) => {
  const components: JSX.Element[] = []

  for (const category of categories) {
    const score = scores.find((s) => s.categoryId === category.id)
    let scoreInput: CreateScoreDto
    if (score) {
      scoreInput = score
    } else {
      scoreInput = {
        ...baseScore,
        score: null,
        categoryId: category.id,
      }
    }
    components.push(
      <Score key={category.id} category={category} initialScore={scoreInput} />,
    )
  }

  return <>{...components}</>
}
