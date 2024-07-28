import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export type ErrorMessageProps = {
  msg?: string
}
export const ErrorMessage = ({ msg = 'Required' }: ErrorMessageProps) => (
  <span className="text-red-800 dark:text-red-400">
    <ErrorIcon />
    {msg}
  </span>
)

export const ErrorIcon = () => (
  <ExclamationTriangleIcon className="mx-2 inline size-4" />
)
