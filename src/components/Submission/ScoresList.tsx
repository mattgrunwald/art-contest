import { Category, SubmissionScores } from '@/db/types'
import { FullTable, Primitive } from '../themed'
import { DropdownTable } from '../themed/client/DropdownTable'

export type ScoresListProps = SubmissionScores & {
  categories: Record<string, Category>
}

export const ScoresList = (props: ScoresListProps) => {
  const { aggregateScore, scores, categories } = props

  const categoryIds = Object.keys(categories)

  const rows: Primitive[][] = []

  for (const [email, scoreWithName] of Object.entries(scores)) {
    const [name, judgeScores] = scoreWithName
    const cols = categoryIds.map((id) => {
      const score = judgeScores.find((s) => `${s.categoryId}` === id)
      return score ? score.score : null
    })
    rows.push([name, email, ...cols])
  }

  const sortedCategories = categoryIds.map((id) => categories[id].name)

  const tableProps = {
    title: 'scores',
    subtitle: `Average Score: ${aggregateScore}`,
    headers: ['name', 'email', ...sortedCategories],
    rows,
  }

  // return <FullTable {...tableProps} />
  return <DropdownTable {...tableProps} />
}
