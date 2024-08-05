import { PropsWithChildren } from 'react'

export const Banner = ({ children }: PropsWithChildren) => (
  <div className="mb-2 w-full rounded-lg bg-orange-300 p-2 font-semibold dark:bg-orange-800 md:w-[700px]">
    <div className="flex justify-center">{children}</div>
  </div>
)
