import { SubmissionForGallery } from '@/db/types'
import { SubmissionFilter } from './SubmissionFilter'
import { SubmissionGalleryImage } from './SubmissionGalleryImage'
import { Pager } from '../util/Pager'
import { Level, Role } from '@/db/util'

export type SubmissionGalleryProps = {
  subs: SubmissionForGallery[]
  level: Level
  unscored: boolean
  unapproved: boolean
  role: Role
  total: number
  page: number
}

export const SubmissionGallery = ({
  subs,
  level,
  role,
  unscored,
  unapproved,
  total,
  page,
}: SubmissionGalleryProps) => {
  return (
    <>
      <SubmissionFilter
        currentLevel={level}
        showingUnscored={unscored}
        showingUnapproved={unapproved}
        role={role}
      />
      <div className="grid grid-cols-2 gap-x-1 gap-y-1">
        {subs.map((sub) => (
          <SubmissionGalleryImage key={sub.id} sub={sub} />
        ))}
      </div>
      <Pager totalPages={total} page={page} path="/gallery/unscored" />
    </>
  )
}
