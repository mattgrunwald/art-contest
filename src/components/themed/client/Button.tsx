'use client'
import { Button } from '@headlessui/react'
import Link from 'next/link'
import { MouseEventHandler, PropsWithChildren } from 'react'

export type PrimaryButtonProps = PropsWithChildren & {
  onClick: MouseEventHandler<HTMLButtonElement>
}
export const PrimaryButton = ({ onClick, children }: PrimaryButtonProps) => (
  <Button
    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-slate-600"
    onClick={onClick}
  >
    {children}
  </Button>
)
