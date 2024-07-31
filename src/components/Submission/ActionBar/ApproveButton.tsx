'use client'

import { Button } from '@headlessui/react'
import { approveSubmission } from '../actions'
import { useRouter } from 'next/navigation'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@/components/util/Tooltip'

export type ApproveButtonProps = {
  subId: string
}
export const ApproveButton = ({ subId }: ApproveButtonProps) => {
  const router = useRouter()

  async function handleClick() {
    // todo check for error here?
    await approveSubmission(subId)
    router.refresh()
  }
  return (
    <Button onClick={handleClick}>
      <Tooltip content="Approve" id="action-button-approve">
        <FaceSmileIcon className="mx-4 size-5 text-slate-950 dark:text-slate-50" />
      </Tooltip>
    </Button>
  )
}
