import { Level, Role } from '@/db/util'
import Link from 'next/link'
import { DisableableLink } from './themed'

export type SubmissionFilterProps = {
  currentLevel: Level
  role: Role
  showingUnscored: boolean
  showingUnapproved: boolean
}

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

  return (
    <>
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
      {role === Role.Judge && (
        <>
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
        </>
      )}
      {role === Role.Admin && (
        <>
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
        </>
      )}
    </>
  )
}
