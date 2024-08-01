import { Role } from '@/db/util'
import { getRoleAndId } from '../serverSideUtils'
import { DAO } from '@/db/dao'
import SubmissionForm from '@/components/SubmissionForm'

export const dynamic = 'force-dynamic'

export default async function Page() {
  // TODO redirect if user has submitted already
  const { role, id } = await getRoleAndId()
  if (role === Role.Contestant && id) {
    // try to find their submission
    const { data, error } = await DAO.readSubmissionForEdit(id)

    if (error !== null) {
      // todo something
    }
    if (data) {
      return <SubmissionForm sub={data} />
    }
  } else if (role === Role.Admin) {
    return <SubmissionForm sub={null} />
  } else {
    return <div> Sign in to submit!</div>
  }
}
