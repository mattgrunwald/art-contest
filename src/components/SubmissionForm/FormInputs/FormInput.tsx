import { Field, Label } from '@headlessui/react'
import { PropsWithChildren } from 'react'
import { FieldError } from 'react-hook-form'
import { ErrorMessage } from './ErrorMessage'

export type FormInputProps = PropsWithChildren & {
  title: string
  error: FieldError | undefined
  className: string
}
export const FormInput = ({
  children,
  title,
  className,
  error,
}: FormInputProps) => (
  <Field className={`${className}`}>
    <Label className="text-sm font-medium">
      {title}
      {error && <ErrorMessage msg={error.message || 'Error'} />}
    </Label>
    {children}
  </Field>
)
