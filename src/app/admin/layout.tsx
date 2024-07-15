import { PropsWithChildren } from 'react'
import { getIsAdmin } from '../serverSideUtils'
import { notFound } from 'next/navigation'

export default async function Layout({ children }: PropsWithChildren) {
  const isAdmin = await getIsAdmin()
  if (!isAdmin) {
    return notFound()
  }
  return { children }
}
