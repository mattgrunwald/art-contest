import { BASE_INPUT_STYLE } from '@/consts'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { Textarea } from '@headlessui/react'
import { FormInput } from './FormInput'

export type TextAreaProps = {
  name: string
  register: UseFormRegister<any>
  title: string
  className: string
  error?: FieldError
  disabled?: boolean
}

export const TextArea = ({
  name,
  register,
  title,
  error,
  className,
  disabled = false,
}: TextAreaProps) => {
  return (
    <FormInput title={title} error={error} className={className}>
      <Textarea
        disabled={disabled}
        className={`my-3 h-[200px] resize-none ${BASE_INPUT_STYLE}`}
        {...register(name, { required: true })}
      />
    </FormInput>
  )
}
