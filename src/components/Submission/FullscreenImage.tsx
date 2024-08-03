import { Button, Dialog, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export type DialogProps = {
  src: string
  isOpen: boolean
  onClose: () => void
}

export function FullscreenImage({ isOpen, onClose, src }: DialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="lg:h-fill lg:w-fill fixed inset-0 z-30 flex items-center justify-center p-4 backdrop-blur">
        <DialogPanel className="h-5/6 w-full lg:h-full">
          <div className="relative h-full w-full">
            <Button
              className="fixed right-2 top-2 z-40"
              onClick={() => onClose()}
            >
              <XMarkIcon className="size-10" />
            </Button>
            <Image
              src={src}
              className="z-30 translate-x-0 translate-y-0 transform-gpu object-contain"
              // placeholder="blur"
              alt="Submission"
              fill
              priority
              quality={100}
              sizes="(max-width: 400px) 400px, (max-width: 640px) 500px, (max-width: 2600px) 66vw, 50vw"
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
