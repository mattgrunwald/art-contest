'use client'
import { Button } from '@headlessui/react'
import Link from 'next/link'
import { MouseEventHandler, PropsWithChildren } from 'react'

export type PrimaryButtonProps = PropsWithChildren & {
  onClick: MouseEventHandler<HTMLButtonElement>
  small?: boolean
}
export const PrimaryButton = ({
  small = false,
  onClick,
  children,
}: PrimaryButtonProps) => (
  <Button
    className={`inline-flex items-center gap-2 rounded-md bg-gray-700 ${small ? 'px-2 py-1' : 'px-3 py-1.5'} bg-slate-200 text-sm/6 font-semibold text-slate-950 shadow-inner shadow-white/10 hover:bg-slate-300 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-slate-600 dark:bg-slate-600 dark:text-slate-50 hover:dark:bg-slate-500`}
    onClick={onClick}
  >
    {children}
  </Button>
)
