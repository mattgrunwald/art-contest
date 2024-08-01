'use client'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { deleteSubmission } from '../actions'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@/components/util/Tooltip'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export type DeleteDialogProps = {
  subId: string
}

export const DeleteDialog = ({ subId }: DeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  async function onDelete() {
    setDeleting(true)
    try {
      const error = await deleteSubmission(subId)
      if (error != null) {
        console.error(error)
        toast.error(`Error: ${error.message}`)
      } else {
        toast.success('Submission deleted')
        close()
        router.back()
        router.refresh()
      }
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <Button onClick={open} className="rounded-md py-2 text-sm font-medium">
        <Tooltip content="Delete" id="action-button-delete">
          <TrashIcon className="mx-4 size-5 text-slate-950 dark:text-slate-50" />
        </Tooltip>
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-slate-300/60 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0 dark:bg-slate-900/60"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-slate-950 dark:text-slate-50"
              >
                Warning
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-slate-950 dark:text-slate-50">
                Are you sure you want to permanently delete this submission?
              </p>
              <div className="mt-4">
                <Button
                  className="mr-2 inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-slate-50 shadow-inner shadow-white/10 hover:bg-red-500 focus:outline-none data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-slate-600 dark:bg-red-800"
                  onClick={onDelete}
                  disabled={deleting}
                >
                  Delete
                </Button>
                <Button
                  className="mr-2 inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-slate-600"
                  onClick={close}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
