import { SubmissionForContestant } from '@/db/types'
import { EditButton } from '../ActionBar/EditButton'
import { BaseSubmissionView } from '../shared/BaseSubmissionView'

export type ContestantSubmissionViewProps = {
  sub: SubmissionForContestant
  canEdit: boolean
}
export const ContestantSubmissionView = async ({
  sub,
  canEdit = false,
}: ContestantSubmissionViewProps) => {
  return (
    <>
      {canEdit && (
        <div className="mb-2 flex w-full items-center justify-between">
          <div></div>
          <div>
            {!sub.approved && (
              <div className="flex w-full justify-center rounded-lg bg-orange-300 p-2 font-semibold dark:bg-orange-800">
                Pending Approval
              </div>
            )}
          </div>

          <div className="mr-2">
            <EditButton subId={sub.id} />
          </div>
        </div>
      )}
      <BaseSubmissionView sub={sub} grid />
    </>
  )
}
