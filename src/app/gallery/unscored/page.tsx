import { getRoleAndId } from '@/app/serverSideUtils'
import { Role } from '@/drizzle/util'
import { notFound, redirect } from 'next/navigation'

export default async function Page() {
  const { role, id } = await getRoleAndId()
  if (role !== Role.Judge || id == null) {
    return notFound()
  }
  redirect('/gallery/1')
}
