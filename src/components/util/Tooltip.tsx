'use client'
import { PropsWithChildren } from 'react'
import { Tooltip as TT } from 'react-tooltip'
export type TooltipProps = PropsWithChildren & {
  content: string
  id: string
  bottom?: boolean
}

export const Tooltip = ({
  id,
  content,
  bottom = false,
  children,
}: TooltipProps) => {
  return (
    <>
      <span
        data-tooltip-id={id}
        data-tooltip-content={content}
        className="pb-2"
      >
        {children}
      </span>
      <TT id={id} place={bottom ? 'bottom' : undefined} />
    </>
  )
}
