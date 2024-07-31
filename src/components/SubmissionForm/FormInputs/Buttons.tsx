import { SubmissionForEdit } from '@/db/types'
import { Button, Input } from '@headlessui/react'
import { useRouter } from 'next/navigation'

export const Buttons = ({
  sub,
  disabled,
}: {
  sub: SubmissionForEdit | null
  disabled: boolean
}) => {
  const router = useRouter()
  return (
    <>
      <Input
        className="inline-flex w-[48%] cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-300 px-3 py-1.5 text-sm/6 font-semibold text-slate-950 shadow-inner shadow-white/10 hover:bg-emerald-400 focus:outline-none data-[hover]:bg-emerald-300 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-slate-600 dark:bg-emerald-700 dark:text-slate-50 hover:dark:bg-emerald-600"
        type="submit"
        value={`${sub === null ? 'Submit' : 'Update'}`}
        disabled={disabled}
      />

      <Button
        onClick={() =>
          sub === null ? router.back() : router.push(`/submission/${sub.id}`)
        }
        aria-label="cancel"
        className="inline-flex w-[48%] items-center justify-center gap-2 rounded-md bg-slate-300 px-3 py-1.5 text-sm/6 font-semibold text-slate-950 shadow-white/10 hover:bg-slate-400 focus:outline-none data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-slate-600 dark:bg-slate-700 dark:text-slate-50 hover:dark:bg-slate-500 dark:data-[focus]:outline-slate-100"
      >
        Cancel
      </Button>
    </>
  )
}
