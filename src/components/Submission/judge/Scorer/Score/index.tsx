'use client'

import {
  AdapterReturn,
  Category,
  CreateScoreDto,
  Score as ScoreType,
} from '@/db/types'
import { Field, Label } from '@headlessui/react'
import { useMemo, useState } from 'react'
import { createScore, updateScore } from '@/actions/judge/scoring'
import _ from 'lodash'
import CategoryPopover from './CategoryPopover'
import { Slider } from '@/components/util/Slider'
import { MAX_SCORE, MIN_SCORE } from '@/consts'

export type ScoreProps = {
  category: Category
  initialScore: CreateScoreDto
}
export const Score = ({ category, initialScore }: ScoreProps) => {
  const [localScore, setLocalScore] = useState<CreateScoreDto>(initialScore)
  const [error, setError] = useState<string | null>(null)
  const previouslySaved = useMemo(
    () => localScore.id !== undefined,
    [localScore],
  )

  const validate = (input: string): [number, string | null] => {
    const num = parseFloat(input)
    if (isNaN(num)) {
      return [-1, 'must be a number']
    }
    if (num > MAX_SCORE || num < MIN_SCORE) {
      return [-1, `must be between ${MIN_SCORE} and ${MAX_SCORE}`]
    }

    return [num, null]
  }

  const onChange = async (input: string) => {
    const [num, error] = validate(input)
    if (error !== null) {
      setError(error)
      return
    }
    setError(null)
    let result: AdapterReturn<ScoreType>
    if (previouslySaved) {
      result = await updateScore(
        localScore.judgeId,
        localScore.submissionId,
        localScore.categoryId,
        num,
      )
    } else {
      result = await createScore(
        localScore.judgeId,
        localScore.submissionId,
        localScore.categoryId,
        num,
      )
      if (result.error != null) {
        // TODO show toast
        console.error(result.error.message)
        return
      }
      setError(null)
      setLocalScore(result.data)
    }
  }

  return (
    <Field>
      {/* <Label className="capitalize">{category.name}</Label> */}
      <CategoryPopover category={category} />
      {/* <CategoryDisclosure category={category} /> */}
      {error && <Label className="text-red-600">{error}</Label>}
      <Slider
        initialValue={localScore.score || 0}
        onChange={onChange}
        min={MIN_SCORE}
        max={MAX_SCORE}
      />
    </Field>
  )
}
