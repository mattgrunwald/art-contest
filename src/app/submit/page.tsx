import { Role } from '@/db/util'
import { getRoleAndId } from '../serverSideUtils'
import { DAO } from '@/db/dao'
import { redirect } from 'next/navigation'
import SubmissionForm from '@/components/SubmissionForm'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const { role, id } = await getRoleAndId()
  if (role === Role.Contestant && id) {
    // try to find their submission
    const { data, error } = await DAO.readSubmissionForEdit(id)

    if (error !== null) {
      console.error('failed to read submission for user', error)
    }
    if (data) {
      redirect(`/submission/edit/${data.id}`)
    }
    return <SubmissionForm sub={data ?? null} />
  } else if (role === Role.Admin) {
    return <SubmissionForm sub={null} />
  } else {
    // todo call signIn()
    return <div> Sign in to submit!</div>
  }
}
