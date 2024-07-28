import { PropsWithChildren } from 'react'

export const Label = ({ children }: PropsWithChildren) => (
  <label className="text-sm font-medium">{children}</label>
)
