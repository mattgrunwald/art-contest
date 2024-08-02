'use client'

import { Button } from '@headlessui/react'
import { unapproveSubmission } from '../actions'
import { useRouter } from 'next/navigation'
import { FlagIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@/components/util/Tooltip'

export type FlagButtonProps = {
  subId: string
}
export const FlagButton = ({ subId }: FlagButtonProps) => {
  const router = useRouter()

  async function handleClick() {
    // todo check for error here?
    await unapproveSubmission(subId)
    router.refresh()
  }
  return (
    <Button onClick={handleClick}>
      <Tooltip content="Flag" id="action-button-flag" bottom>
        <FlagIcon className="mx-2 text-slate-950 dark:text-slate-50 max-md:size-10 md:size-7" />
      </Tooltip>
    </Button>
  )
}
