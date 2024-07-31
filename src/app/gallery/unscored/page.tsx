import { getRoleAndId } from '@/app/serverSideUtils'
import { Role } from '@/db/util'
import { notFound, redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const { role, id } = await getRoleAndId()
  if (role !== Role.Judge || id == null) {
    return notFound()
  }
  redirect('/gallery/unscored/1')
}
