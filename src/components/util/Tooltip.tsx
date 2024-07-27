'use client'
import { PropsWithChildren } from 'react'
import { Tooltip as TT } from 'react-tooltip'
export type TooltipProps = PropsWithChildren & {
  content: string
  id: string
}

export const Tooltip = ({ id, content, children }: TooltipProps) => {
  return (
    <>
      <span data-tooltip-id={id} data-tooltip-content={content}>
        {children}
      </span>
      <TT id={id} />
    </>
  )
}
