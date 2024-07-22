import { Category } from '@/db/types'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

export type CategoryPopoverProps = {
  category: Category
}

export default function CategoryPopover({ category }: CategoryPopoverProps) {
  return (
    // <div className="flex h-screen w-full justify-center pt-20">
    //   <div className="flex gap-8">
    <Popover>
      <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
        {category.name}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <p className="p-3">{category.description}</p>
      </PopoverPanel>
    </Popover>
    // <div className="text-sm/6 font-semibold text-white/50">Pricing</div>
    //   </div>
    // </div>
  )
}
