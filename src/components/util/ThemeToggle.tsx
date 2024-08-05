'use client'

import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

export function ThemeToggle({ large = false }: { large?: boolean }) {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  const changeTheme = useCallback(
    () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light'),
    [setTheme, resolvedTheme],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Switch
        disabled
        className={`group relative mr-2 flex ${large ? 'h-10 w-20' : 'h-7 w-14'} cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-white/10 data-[open]:bg-neutral-700 data-[focus]:outline-1 data-[focus]:outline-neutral-600`}
      ></Switch>
    )
  }

  return (
    <Switch
      checked={resolvedTheme === 'dark'}
      onChange={changeTheme}
      className={`group relative mr-2 flex ${large ? 'h-10 w-20' : 'h-7 w-14'} cursor-pointer rounded-full bg-neutral-200 p-1 transition-colors duration-200 ease-in-out hover:bg-neutral-300 focus:outline-none data-[checked]:bg-white/10 data-[open]:bg-neutral-700 data-[focus]:outline-1 data-[focus]:outline-neutral-600 dark:bg-neutral-600 hover:dark:bg-neutral-500`}
    >
      <span
        aria-hidden="true"
        className="bg-neutral-30 pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
      >
        <span className="sr-only">Toggle mode</span>
        {resolvedTheme === 'light' ? (
          <SunIcon
            className={`${large ? 'size-8' : 'size-5'} text-neutral-950`}
          />
        ) : (
          <MoonIcon className={`${large ? 'size-8' : 'size-5'}`} />
        )}
      </span>
    </Switch>
  )
}
