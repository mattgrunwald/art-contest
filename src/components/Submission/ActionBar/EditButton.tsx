'use client'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Tooltip } from '@/components/util/Tooltip'

export type EditButtonProps = {
  subId: string
}
export const EditButton = ({ subId }: EditButtonProps) => {
  return (
    <div className="z-10">
      <Tooltip content="Edit" id="action-button-edit" bottom>
        <Link href={`/submission/edit/${subId}`} aria-label="Edit submission">
          <PencilSquareIcon className="mx-2 my-2 text-neutral-950 dark:text-neutral-50 max-md:size-10 md:size-7" />
        </Link>
      </Tooltip>
    </div>
  )
}
