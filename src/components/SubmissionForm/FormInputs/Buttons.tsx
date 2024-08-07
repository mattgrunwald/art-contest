import { SubmissionForEdit } from '@/db/types'
import { Button, Input } from '@headlessui/react'
import { useRouter } from 'next/navigation'

export const Buttons = ({
  sub,
  disabled,
  className,
}: {
  sub: SubmissionForEdit | null
  disabled: boolean
  className: string
}) => {
  const router = useRouter()
  return (
    <div className={className}>
      <div className="flex justify-between">
        <Input
          className="inline-flex w-[48%] cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-300 px-3 py-1.5 text-sm/6 font-semibold text-neutral-950 shadow-inner shadow-white/10 hover:bg-emerald-400 focus:outline-none data-[open]:bg-neutral-700 data-[focus]:outline-2 data-[focus]:outline-offset-0 data-[focus]:outline-black/25 dark:bg-emerald-700 dark:text-neutral-50 hover:dark:bg-emerald-600 dark:data-[focus]:outline-white/25 data-[focus]:dark:outline-white/25"
          type="submit"
          value={`${sub === null ? 'Submit' : 'Update'}`}
          disabled={disabled}
        />

        <Button
          onClick={() =>
            sub === null ? router.back() : router.push(`/submission/${sub.id}`)
          }
          aria-label="cancel"
          className="inline-flex w-[48%] items-center justify-center gap-2 rounded-md bg-neutral-300 px-3 py-1.5 text-sm/6 font-semibold text-neutral-950 shadow-white/10 hover:bg-neutral-400 focus:outline-none data-[open]:bg-neutral-700 data-[focus]:outline-2 data-[focus]:outline-offset-0 data-[focus]:outline-black/25 dark:bg-neutral-700 dark:text-neutral-50 hover:dark:bg-neutral-50 data-[focus]:dark:outline-white/25"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
