import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export type ErrorMessageProps = {
  msg?: string
}
export const ErrorMessage = ({ msg = 'Required' }: ErrorMessageProps) => (
  <span className="text-sm text-red-800 dark:text-red-400">
    <ErrorIcon />
    {msg}
  </span>
)

export const ErrorIcon = () => (
  <ExclamationTriangleIcon className="mx-2 inline size-4" />
)
