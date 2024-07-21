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

  console.log('hello?')
  for (const category of categories) {
    const score = scores.find((s) => s.categoryId === category.id)
    let scoreInput: CreateScoreDto
    if (score) {
      console.log('score found!')
      scoreInput = score
    } else {
      console.log('score not found..')
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
