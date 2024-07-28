'use client'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Table, TableTitle, TableSubtitle, FullTableProps } from '../Table'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export const DropdownTable = ({
  title,
  subtitle,
  headers,
  rows,
}: FullTableProps) => (
  <Disclosure as="div" defaultOpen={true}>
    <DisclosureButton className="group flex items-center justify-between">
      <span className="text-sm/6 font-medium group-data-[hover]:text-slate-600/80 dark:group-data-[hover]:text-slate-200/80">
        <TableTitle>{title}</TableTitle>
      </span>
      <ChevronDownIcon className="mx-4 size-5 text-slate-600 group-data-[open]:rotate-180 group-data-[hover]:text-slate-600/80 dark:text-slate-200 dark:group-data-[hover]:text-slate-200/80" />
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
