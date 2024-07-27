import { Role } from '@/db/util'
import { getRoleAndId } from '@/app/serverSideUtils'
import { notFound } from 'next/navigation'
import { DAO } from '@/db/dao'
import { Submission } from '@/db/types'
import SubmissionForm from '@/components/SubmissionForm'

type EditSubmissionParams = {
  params: { id: string }
}

export default async function Page({ params }: EditSubmissionParams) {
  const { role } = await getRoleAndId()
  if (role !== Role.Admin) {
    return notFound()
  }

  let sub: Submission | null = null
  const { data, error } = await DAO.readUserSubmission(params.id)
  if (error !== null) {
    console.log(error.message)
    // todo make this error page or something
    return notFound()
  }
  if (data) {
    sub = data
  } else {
    return notFound()
  }

  return <SubmissionForm sub={sub} />
}
