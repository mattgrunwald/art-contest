import { Category } from '@/db/types'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export type CategoryPopoverProps = {
  category: Category
}

export default function CategoryDisclosure({ category }: CategoryPopoverProps) {
  return (
    // <div className="flex h-screen w-full justify-center pt-20">
    //   <div className="flex gap-8">
    <Disclosure as="div" className="p-6" defaultOpen={true}>
      <DisclosureButton className="group flex w-full items-center justify-between">
        <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
          {category.name}
        </span>
        <ChevronDownIcon className="size-5 fill-white/60 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50" />
      </DisclosureButton>
      <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
        {category.description}
      </DisclosurePanel>
    </Disclosure>
    // <div className="text-sm/6 font-semibold text-white/50">Pricing</div>
    //   </div>
    // </div>
  )
}
