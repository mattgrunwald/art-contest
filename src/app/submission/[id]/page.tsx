import { getRoleAndId } from '@/app/serverSideUtils'
import {
  AdminSubmission,
  ContestantSubmission,
  JudgeSubmission,
} from '@/components/Submission'
import { Role } from '@/db/util'
import { ReactNode } from 'react'

type SubmissionParams = {
  params: { id: string }
}

export default async function Page({ params }: SubmissionParams) {
  const subId = params.id
  const { role, id } = await getRoleAndId()
  switch (role) {
    case Role.Admin:
      return <AdminSubmission subId={subId} />
    case Role.Judge:
      return <JudgeSubmission judgeId={id} subId={subId} />
    case Role.Contestant:
    default:
      return <ContestantSubmission subId={subId} userId={id} />
  }
}
