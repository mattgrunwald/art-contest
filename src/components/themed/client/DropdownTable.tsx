'use client'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Table, TableTitle, TableSubtitle, FullTableProps } from '../Table'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export const DropdownTable = ({
  title,
  subtitle,
  headers,
  rows,
}: FullTableProps) => (
  <Disclosure as="div" defaultOpen={true}>
    <DisclosureButton className="group flex items-center justify-between">
      <span className="text-sm/6 font-medium group-data-[hover]:text-neutral-600/80 dark:group-data-[hover]:text-neutral-200/80">
        <TableTitle>{title}</TableTitle>
      </span>
      <ChevronDownIcon className="mx-4 size-5 text-neutral-600 group-data-[open]:rotate-180 group-data-[hover]:text-neutral-600/80 dark:text-neutral-200 dark:group-data-[hover]:text-neutral-200/80" />
    </DisclosureButton>
    <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
      <div className="pb-4">
        {subtitle && (
          <div className="pb-4">
            <TableSubtitle>{subtitle}</TableSubtitle>
          </div>
        )}
        <Table {...{ headers, rows }} />
      </div>
    </DisclosurePanel>
  </Disclosure>
)
