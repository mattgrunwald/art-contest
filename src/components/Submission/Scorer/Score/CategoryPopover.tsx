import { Category } from '@/db/types'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export type CategoryPopoverProps = {
  category: Category
}

export default function CategoryPopover({ category }: CategoryPopoverProps) {
  return (
    <Popover>
      <PopoverButton className="block font-semibold text-neutral-950 focus:outline-none data-[active]:text-neutral-700 data-[hover]:text-neutral-600 data-[open]:text-neutral-600 data-[focus]:outline-1 data-[focus]:outline-neutral-600 dark:text-neutral-100 dark:data-[active]:text-neutral-300 dark:data-[hover]:text-neutral-300 dark:data-[open]:text-neutral-300">
        <div className="inline-flex items-center justify-center">
          {category.name}
          <InformationCircleIcon className="ml-2 size-5" />
        </div>
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="z-20 divide-y divide-white/80 rounded-xl bg-neutral-300/80 p-3 text-sm/6 backdrop-blur-2xl transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:bg-neutral-900/80"
      >
        <div className="w-full p-3 md:max-w-[500px]">
          <div className="mb-2 text-2xl font-bold">{category.name}</div>
          <CategoryDescription
            title="Exceeds"
            subtitle="3-4 points"
            description={category.exceeds}
          />
          <CategoryDescription
            title="Meets"
            subtitle="1-2 points"
            description={category.meets}
          />
          <CategoryDescription
            title="Misses"
            subtitle="0 points"
            description={category.misses}
          />
        </div>
      </PopoverPanel>
    </Popover>
  )
}

type CategoryDescriptionProps = {
  title: string
  subtitle: string
  description: string
}
const CategoryDescription = ({
  title,
  subtitle,
  description,
}: CategoryDescriptionProps) => {
  return (
    <div className="my-4">
      <p className="text-xl font-semibold">
        {title} <span className="text-lg opacity-80">({subtitle})</span>
      </p>
      <p className="mx-4">{description}</p>
    </div>
  )
}
