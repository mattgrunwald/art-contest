import { Category, SubmissionScores } from '@/db/types'
import { Td, Th } from './Table'

export type ScoresListProps = SubmissionScores & {
  categories: Record<string, Category>
}

export const ScoresList = (props: ScoresListProps) => {
  const { aggregateScore, scores, categories } = props

  const categoryIds = Object.keys(categories)

  const rows: JSX.Element[] = []

  for (const [email, scoreWithName] of Object.entries(scores)) {
    const [name, judgeScores] = scoreWithName
    const cols = categoryIds.map((id) => {
      const score = judgeScores.find((s) => `${s.categoryId}` === id)
      return score ? `${score.score}` : '-'
    })
    const row = (
      <tr>
        <Td>{name}</Td>
        <Td>{email}</Td>
        {cols.map((score, index) => (
          <Td key={index}>{score}</Td>
        ))}
      </tr>
    )
    rows.push(row)
  }
  return (
    <>
      <h2>Scores</h2>
      <div>Average Score: {aggregateScore}</div>
      <table className="table-auto">
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            {/* TODO capitalize first letter */}
            {categoryIds.map((id) => (
              <Th key={id}>{categories[id].name}</Th>
            ))}
          </tr>
        </thead>
        <tbody>{...rows}</tbody>
      </table>
    </>
  )
}
