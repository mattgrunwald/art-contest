'use client'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { deleteSubmission } from '../actions'
import { TrashIcon } from '@heroicons/react/24/solid'
import { Tooltip } from '@/components/util/Tooltip'

export type DeleteDialogProps = {
  subId: number
}

export const DeleteDialog = ({ subId }: DeleteDialogProps) => {
  let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  async function onDelete() {
    const error = await deleteSubmission(subId)
    if (error != null) {
      // todo show toast
      console.error(error)
    } else {
      // todo show success toast
      close()
      // todo navigate back to gallery page?
    }
  }

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <Tooltip content="Delete" id="action-button-delete">
          <TrashIcon className="mx-4 size-5 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50" />
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
              className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Warning
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                Are you sure you want to permanently delete this submission?
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={onDelete}
                >
                  Delete
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
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
