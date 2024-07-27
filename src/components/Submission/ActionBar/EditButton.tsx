'use client'
import { PencilIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Tooltip } from '@/components/util/Tooltip'

export type EditButtonProps = {
  subId: number
}
export const EditButton = ({ subId }: EditButtonProps) => {
  return (
    <Tooltip content="Edit" id="action-button-edit">
      <Link href={`/submission/edit/${subId}`} aria-label="Edit submission">
        <PencilIcon className="mx-4 size-5 text-white" />
      </Link>
    </Tooltip>
  )
}
