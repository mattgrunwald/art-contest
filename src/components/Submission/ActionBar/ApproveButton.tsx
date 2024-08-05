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
    await approveSubmission(subId)
    router.refresh()
  }
  return (
    <Button onClick={handleClick} className="z-10">
      <Tooltip content="Approve" id="action-button-approve" bottom>
        <FaceSmileIcon className="mx-2 text-neutral-950 dark:text-neutral-50 max-md:size-10 md:size-7" />
      </Tooltip>
    </Button>
  )
}
