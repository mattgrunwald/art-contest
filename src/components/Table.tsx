import { PropsWithChildren } from 'react'

export const Th = ({ children }: PropsWithChildren) => (
  <th className="px-1 capitalize">{children}</th>
)
export const Td = ({ children }: PropsWithChildren) => (
  <td className="px-1 capitalize">{children}</td>
)
