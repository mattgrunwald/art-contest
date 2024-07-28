import { Role } from '@/db/util'
import { getRoleAndId } from '@/app/serverSideUtils'
import { notFound } from 'next/navigation'
import { DAO } from '@/db/dao'
import { SubmissionForEdit } from '@/db/types'
import SubmissionForm from '@/components/SubmissionForm'

type EditSubmissionParams = {
  params: { id: string }
}

export default async function Page({ params }: EditSubmissionParams) {
  const { role } = await getRoleAndId()
  const subId = parseInt(params.id)
  if (role !== Role.Admin || isNaN(subId)) {
    return notFound()
  }

  let sub: SubmissionForEdit | null = null
  const { data, error } = await DAO.readSubmissionForEdit(subId)
  if (error !== null) {
    console.error(error.message)
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
