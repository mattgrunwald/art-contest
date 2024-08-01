import { Level, Role } from '@/db/util'
import { DisableableLink } from '../themed'

export type SubmissionFilterProps = {
  currentLevel: Level
  role: Role
  showingUnscored: boolean
  showingUnapproved: boolean
}
// todo add pager to this component
export const SubmissionFilter = ({
  currentLevel,
  role,
  showingUnscored,
  showingUnapproved,
}: SubmissionFilterProps) => {
  let subPath = ''
  if (showingUnscored) {
    subPath = '/unscored'
  } else if (showingUnapproved) {
    subPath = '/unapproved'
  }

  const buttonGroupClass =
    'max-sm:flex max-sm:justify-evenly max-sm:*:w-[45vw] py-2'

  return (
    <div className="flex w-full justify-center pb-4 max-sm:flex-col sm:flex-row">
      <div className={buttonGroupClass}>
        <DisableableLink
          href={`/gallery${subPath}/1?level=${Level.HighSchool}`}
          ariaLabel="show high school submissions"
          text="High School"
          disabled={currentLevel === Level.HighSchool}
        />
        <DisableableLink
          href={`/gallery${subPath}/1?level=${Level.MiddleSchool}`}
          ariaLabel="show middle school submissions"
          text="Middle School"
          disabled={currentLevel === Level.MiddleSchool}
        />
      </div>
      {role === Role.Judge && (
        <div className={buttonGroupClass}>
          <DisableableLink
            href={`/gallery/1?level=${currentLevel}`}
            ariaLabel="show all submissions"
            text="All"
            disabled={!showingUnscored}
          />

          <DisableableLink
            href={`/gallery/unscored/1?level=${currentLevel}`}
            ariaLabel="show unscored submissions"
            text="Unscored"
            disabled={showingUnscored}
          />
        </div>
      )}
      {role === Role.Admin && (
        <div className={buttonGroupClass}>
          <DisableableLink
            href={`/gallery/1?level=${currentLevel}`}
            ariaLabel="show approved submissions"
            text="Approved"
            disabled={!showingUnapproved}
          />

          <DisableableLink
            href={`/gallery/unapproved/1?level=${currentLevel}`}
            ariaLabel="show approved submissions"
            text="Unapproved"
            disabled={showingUnapproved}
          />
        </div>
      )}
    </div>
  )
}
