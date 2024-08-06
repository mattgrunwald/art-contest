import { Role } from '@/db/util'
import { getRoleAndId } from '@/app/serverSideUtils'
import { notFound } from 'next/navigation'
import { DAO } from '@/db/dao'
import SubmissionForm from '@/components/SubmissionForm'

type EditSubmissionParams = {
  params: { id: string }
}

export default async function Page({ params }: EditSubmissionParams) {
  const { role, id } = await getRoleAndId()
  const subId = params.id
  if ((role !== Role.Admin && role !== Role.Contestant) || subId === '') {
    return notFound()
  }

  const { data, error } = await DAO.submissions.read.readSubmissionForEdit(
    undefined,
    subId,
  )
  if (error !== null) {
    console.error(`failed to read submission for edit`, error.message)
    return notFound()
  } else if (!data) {
    return notFound()
  } else if (role !== Role.Admin && data.userId !== id) {
    return notFound()
  }

  return <SubmissionForm sub={data} />
}
