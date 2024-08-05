import { MenuItem } from './MenuItem'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export const BigNav = ({
  href,
  label,
  close,
  children,
}: PropsWithChildren & { href: string; label: string; close: () => void }) => (
  <nav className="ml-auto space-x-6 text-4xl font-medium max-lg:mr-4 lg:mr-6">
    <Link href={href} prefetch={false} aria-label={label} onClick={close}>
      {children}
    </Link>
  </nav>
)

export const makeBigNav =
  // eslint-disable-next-line react/display-name
  (text: string, href: string, label: string, close: () => void) => () => (
    <MenuItem>
      <BigNav href={href} label={label} close={close}>
        {text}
      </BigNav>
    </MenuItem>
  )
