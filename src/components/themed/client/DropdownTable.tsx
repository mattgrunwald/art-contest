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
      <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
        <TableTitle>{title}</TableTitle>
      </span>
      <ChevronDownIcon className="mx-4 size-5 fill-white/60 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50" />
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
