import { Field, Label } from '@headlessui/react'
import { PropsWithChildren } from 'react'
import { FieldError } from 'react-hook-form'
import { ErrorMessage } from './ErrorMessage'

export type FormInputProps = PropsWithChildren & {
  title: string
  error: FieldError | undefined
}
export const FormInput = ({ children, title, error }: FormInputProps) => (
  <Field className="mb-4">
    <Label className="text-sm font-medium">
      {title}
      {error && <ErrorMessage msg={error.message || 'Error'} />}
    </Label>
    {children}
  </Field>
)
