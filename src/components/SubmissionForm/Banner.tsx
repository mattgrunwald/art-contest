import { PropsWithChildren } from 'react'

export const Banner = ({ children }: PropsWithChildren) => (
  <div className="dark: mb-2 w-full rounded-lg bg-orange-300 p-2 dark:bg-orange-800 md:w-[700px]">
    <div className="flex justify-center">{children}</div>
  </div>
)
