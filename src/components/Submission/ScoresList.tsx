import { Category, JudgeWithScores } from '@/db/types'
import { FullTable, Primitive, TableTitle } from '../themed'
import { DropdownTable } from '../themed/client/DropdownTable'

export type ScoresListProps = {
  judgeScores: JudgeWithScores[]
  aggregateScore: number
  categories: Record<string, Category>
}

export const ScoresList = ({
  aggregateScore,
  judgeScores,
  categories,
}: ScoresListProps) => {
  const categoryIds = Object.keys(categories)
  const categoryNames = categoryIds.map((id) => categories[id].name)

  const noScores = judgeScores.length === 0

  if (noScores) {
    // should only happen now if there are no judges
    return (
      <>
        <TableTitle>Scores</TableTitle>
        <div className="pb-4 pl-4">No scores yet</div>
      </>
    )
  }

  const rows: Primitive[][] = []

  for (const { name, email, scores } of judgeScores) {
    const sortedScores = categoryIds.map((id) => {
      const val = scores.find((score) => score.categoryId === id)?.score
      if (val || val === null || val === 0) {
        return val
      }
      return '...'
    })
    rows.push([name || email, ...sortedScores])
  }

  const tableProps = {
    title: 'scores',
    subtitle: `Average Score: ${aggregateScore.toFixed(2)}`,
    headers: ['judge', ...categoryNames],
    rows,
  }

  return <FullTable {...tableProps} small />
}
