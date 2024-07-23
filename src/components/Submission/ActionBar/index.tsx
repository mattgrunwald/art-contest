import { SubmissionForAdmin } from '@/db/types'
import { ApproveButton } from './ApproveButton'
import { DeleteDialog } from './DeleteDialog'
import { FullTable } from '@/components/themed/'

export type ActionBarProps = {
  sub: SubmissionForAdmin
}
export const ActionBar = ({ sub }: ActionBarProps) => {
  const rows = [<DeleteDialog key={0} subId={sub.id} />]
  if (!sub.approved) {
    rows.push(<ApproveButton key={1} subId={sub.id} />)
  }
  const headers = Array(rows.length).fill('')

  return <FullTable title="actions" headers={headers} rows={[rows]} />
}
