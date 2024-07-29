import { AdminList, JudgeList } from '@/components/UserList'
import { Suspense } from 'react'
export default function Page() {
  return (
    <>
      <Suspense fallback={<div>LOADING ADMIN LIST...</div>}>
        <AdminList />
      </Suspense>
      <Suspense fallback={<div>LOADING JUDGE LIST...</div>}>
        <JudgeList />
      </Suspense>
    </>
  )
}
