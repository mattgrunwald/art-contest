import { Submission, SubmissionForAdmin, User } from '@/db/types'
import { FullTable } from '../themed'
import { PropsWithChildren } from 'react'

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
      <B key="0">Name</B>,
      sub.name,
      <B key="4">Created</B>,
      sub.createdAt.toLocaleString(),
    ],
    [
      <B key="1">Email</B>,
      sub.email,
      <B key="5">Updated</B>,
      sub.updatedAt.toLocaleString(),
    ],
    [<B key="2">Grade</B>, sub.grade, <B key="3">Address</B>, address],
  ]

  return (
    <FullTable title="Contestant Info" headers={headers} rows={rows} small />
  )
}

const B = ({ children }: PropsWithChildren) => (
  <div className="font-bold text-neutral-950 dark:text-neutral-400">
    {children}
  </div>
)
