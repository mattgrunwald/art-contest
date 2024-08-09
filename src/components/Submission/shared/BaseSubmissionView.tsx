import {
  SubmissionForAdmin,
  SubmissionForContestant,
  SubmissionForJudge,
} from '@/db/types'
import { imageUrl } from '@/util/helpers'
import { SubmissionImage } from './SubmissionImage'
import { SubmissionStatement } from './SubmissionStatement'

export type SubmissionViewProps = {
  sub: SubmissionForAdmin | SubmissionForContestant | SubmissionForJudge
  maybeGrid?: boolean
  grid?: boolean
}

export const BaseSubmissionView = async ({
  sub,
  maybeGrid = false,
  grid = false,
}: SubmissionViewProps) => {
  const src = imageUrl(sub.imageSrc)
  return (
    <div
      className={`w-full ${maybeGrid ? 'overflow-y-auto lg:h-[80vh]' : grid ? 'grid grid-cols-1 gap-3 lg:grid-cols-[2fr,auto]' : ''}`}
    >
      <SubmissionImage src={src} maybeGrid={maybeGrid} />
      <SubmissionStatement text={sub.statement} />
    </div>
  )
}
