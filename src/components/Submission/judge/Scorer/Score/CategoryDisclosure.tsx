'use client'

import { Category } from '@/db/types'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export type CategoryPopoverProps = {
  category: Category
}

export default function CategoryDisclosure({ category }: CategoryPopoverProps) {
  return (
    // <div className="flex h-screen w-full justify-center pt-20">
    //   <div className="flex gap-8">
    <Disclosure as="div" className="p-6" defaultOpen={true}>
      <DisclosureButton className="group flex w-full items-center justify-between">
        <span className="text-sm/6 font-medium text-neutral-950 dark:text-neutral-50">
          {category.name}
        </span>
        <ChevronDownIcon className="size-5text-neutral-950 dark:text-neutral-50" />
      </DisclosureButton>
      <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
        <div>Exceeds</div>
        <div>{category.exceeds}</div>
        <div>Meets</div>
        <div>{category.meets}</div>
        <div>Misses</div>
        <div>{category.misses}</div>
      </DisclosurePanel>
    </Disclosure>
    // <div className="text-sm/6 font-semibold text-white/50">Pricing</div>
    //   </div>
    // </div>
  )
}
