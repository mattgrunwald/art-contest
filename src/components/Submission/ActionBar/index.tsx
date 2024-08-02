import { SubmissionForAdmin } from '@/db/types'
import { ApproveButton } from './ApproveButton'
import { DeleteDialog } from './DeleteDialog'
import { EditButton } from './EditButton'
import { FlagButton } from './FlagButton'

export type ActionBarProps = {
  sub: SubmissionForAdmin
}
export const ActionBar = ({ sub }: ActionBarProps) => (
  <div className="mb-2 flex pr-2">
    <DeleteDialog subId={sub.id} approved={sub.approved} />
    <EditButton subId={sub.id} />
    {sub.approved ? (
      <FlagButton subId={sub.id} />
    ) : (
      <ApproveButton subId={sub.id} />
    )}
  </div>
)
