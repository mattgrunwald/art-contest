'use client'

import { Button } from '@headlessui/react'
import { approveSubmission } from '../actions'
import { useRouter } from 'next/navigation'

export type ApproveButtonProps = {
  subId: number
}
export const ApproveButton = ({ subId }: ApproveButtonProps) => {
  const router = useRouter()

  async function handleClick() {
    // todo check for error here?
    await approveSubmission(subId)
    router.refresh()
  }
  return <Button onClick={handleClick}>Approve</Button>
}
