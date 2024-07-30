import { BASE_INPUT_STYLE } from '@/consts'
import { Input } from '@headlessui/react'
import { FieldError, UseFormRegister, UseFormTrigger } from 'react-hook-form'
import { FormInput } from './FormInput'

export type FilePickerProps = {
  title: string
  name: string
  error?: FieldError
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<any>
  trigger: UseFormTrigger<any>
}

export const FilePicker = ({
  title,
  name,
  error,
  required = false,
  register,
  trigger,
}: FilePickerProps) => (
  <FormInput title={title} error={error}>
    <Input
      required={required}
      type="file"
      {...register(name)}
      accept="image/png, image/jpeg, image/webp"
      className={BASE_INPUT_STYLE}
      onChange={() => trigger('image')}
    />
  </FormInput>
)
