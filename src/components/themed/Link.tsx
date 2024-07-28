import Link from 'next/link'
import { PropsWithChildren } from 'react'

export type DLProps = {
  href: string
  ariaLabel: string
  text: string
  disabled: boolean
}

export const DisableableLink = ({
  href,
  ariaLabel,
  text,
  disabled,
}: DLProps) => {
  if (disabled) {
    return (
      <div className="mr-4 inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-slate-50 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
        {text}
      </div>
    )
  }
  return (
    <Link
      className="mr-4 inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-slate-950 shadow-white/10 hover:bg-gray-700 hover:text-slate-50 focus:outline-none dark:text-slate-50"
      href={href}
      aria-label={ariaLabel}
      prefetch={false}
    >
      {text}
    </Link>
  )
}

export type LinkButtonProps = PropsWithChildren & {
  href: string
  ariaLabel: string
  className?: string
}
export const LinkButton = ({
  href,
  ariaLabel,
  children,
  className = '',
}: LinkButtonProps) => {
  return (
    <Link
      className={`${className} inline-flex items-center justify-center gap-2 rounded-md bg-slate-300 px-3 py-1.5 text-sm/6 font-semibold text-slate-950 shadow-white/10 hover:bg-slate-400 focus:outline-none dark:bg-slate-700 dark:text-slate-50 hover:dark:bg-slate-500`}
      href={href}
      aria-label={ariaLabel}
      prefetch={false}
    >
      {children}
    </Link>
  )
}
