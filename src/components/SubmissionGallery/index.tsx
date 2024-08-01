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
  let subPath = ''
  if (unscored) {
    subPath = '/unscored'
  } else if (unapproved) {
    subPath = '/unapproved'
  }

  const path = `/gallery${subPath}`
  return (
    <>
      <SubmissionFilter
        currentLevel={level}
        showingUnscored={unscored}
        showingUnapproved={unapproved}
        role={role}
      />
      <div className="flex w-full flex-col items-center">
        <div className="mb-4 grid w-full grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subs.map((sub) => (
            <SubmissionGalleryImage key={sub.id} sub={sub} />
          ))}
        </div>
        <Pager totalPages={total} page={page} path={path} />
      </div>
    </>
  )
}
