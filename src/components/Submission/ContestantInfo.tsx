import { Submission, SubmissionForAdmin, User } from '@/db/types'
import { FullTable } from '../themed'

export type ContestantInfoProps = {
  sub: SubmissionForAdmin
}

const headers = new Array(4).fill('')

export const ContestantInfo = ({ sub }: ContestantInfoProps) => {
  const address = (
    <div>
      <p>{sub.street}</p>
      {sub.street2 && <p>{sub.street2}</p>}
      <p>
        {sub.city}, {sub.state} {sub.zip}
      </p>
    </div>
  )

  const rows = [
    [
      <b key="0">Name</b>,
      sub.name,
      <b key="4">Created</b>,
      sub.createdAt.toLocaleString(),
    ],
    [
      <b key="1">Email</b>,
      sub.email,
      <b key="5">Updated</b>,
      sub.updatedAt.toLocaleString(),
    ],
    [<b key="2">Grade</b>, sub.grade, <b key="3">Address</b>, address],
  ]

  return (
    <FullTable title="Contestant Info" headers={headers} rows={rows} small />
  )
}
