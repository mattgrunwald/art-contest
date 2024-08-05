export type JudgeWithScores = {
  id: string
  name: string
  email: string
  scores: {
    categoryId: string
    score: number | null
  }[]
}
