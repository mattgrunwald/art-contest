import { Category, SubmissionScores } from '@/db/types'
import { FullTable, Primitive, TableTitle } from '../themed'
import { DropdownTable } from '../themed/client/DropdownTable'

export type ScoresListProps = SubmissionScores & {
  categories: Record<string, Category>
}

export const ScoresList = ({
  aggregateScore,
  scores,
  categories,
}: ScoresListProps) => {
  const categoryIds = Object.keys(categories)

  const noScores = Object.keys(scores).length === 0

  if (noScores) {
    return (
      <>
        <TableTitle>Scores</TableTitle>
        <div className="pb-4 pl-4">No scores yet</div>
      </>
    )
  }

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
    subtitle: `Average Score: ${aggregateScore.toFixed(2)}`,
    headers: ['name', 'email', ...sortedCategories],
    rows,
  }

  return <DropdownTable {...tableProps} />
}
