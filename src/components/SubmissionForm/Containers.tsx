import { PropsWithChildren } from 'react'

export const Group = ({ children }: PropsWithChildren) => (
  <div className="block md:flex md:justify-between">{children}</div>
)

export type BlockProps = PropsWithChildren & {
  small?: boolean
}
export const Block = ({ children, small = false }: BlockProps) => (
  <div className={`md:inline-block ${small ? 'md:w-[32%]' : 'md:w-[49%]'}`}>
    {children}
  </div>
)
