import { Role } from '@/drizzle/util'
import { getRoleAndId } from '../serverSideUtils'
import { notFound, redirect } from 'next/navigation'
import { DAO } from '@/drizzle/dao'
import SubmissionForm from '@/components/SubmissionForm'

export default async function Page() {
  const { role, id } = await getRoleAndId()
  let editingByAdmin = false
  console.log(role, id)
  if (role === Role.Contestant && id) {
    // try to find their submission
    const { data, error } = await DAO.readUserSubmission(id)

    if (error !== null) {
      // todo something
    }
    if (data !== null && data !== undefined) {
      redirect(`/submission/${data.id}`)
    }
  } else if (role !== Role.Admin) {
    return notFound()
  }
  return <SubmissionForm />
}
