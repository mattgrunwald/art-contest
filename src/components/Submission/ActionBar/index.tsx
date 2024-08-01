import { SubmissionForAdmin } from '@/db/types'
import { ApproveButton } from './ApproveButton'
import { DeleteDialog } from './DeleteDialog'
import { FullTable } from '@/components/themed/'
import { EditButton } from './EditButton'
import { FlagButton } from './FlagButton'

export type ActionBarProps = {
  sub: SubmissionForAdmin
}
export const ActionBar = ({ sub }: ActionBarProps) => {
  const row = [
    <DeleteDialog key={0} subId={sub.id} approved={sub.approved} />,
    <EditButton key={1} subId={sub.id} />,
  ]
  if (!sub.approved) {
    row.push(<ApproveButton key={2} subId={sub.id} />)
  } else {
    row.push(<FlagButton key={2} subId={sub.id} />)
  }
  const headers = Array(row.length).fill('')

  return <FullTable small title="actions" headers={headers} rows={[row]} />
}
