'use client'

import { Button } from '@headlessui/react'
import { unapproveSubmission } from '../actions'
import { useRouter } from 'next/navigation'
import { FlagIcon } from '@heroicons/react/24/solid'
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
      <Tooltip content="Flag" id="action-button-flag">
        <FlagIcon className="mx-4 size-5 text-slate-950 dark:text-slate-50" />
      </Tooltip>
    </Button>
  )
}
