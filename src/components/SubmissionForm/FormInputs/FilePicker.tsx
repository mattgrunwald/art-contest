'use client'

import { BASE_INPUT_STYLE } from '@/consts'
import { FieldError, UseFormRegister, UseFormTrigger } from 'react-hook-form'
import { FormInput } from './FormInput'
import { useContext } from 'react'
import { ImageContext } from '../ImageContext'
import { Input } from '@headlessui/react'

export type FilePickerProps = {
  title: string
  name: string
  error?: FieldError
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<any>
  trigger: UseFormTrigger<any>
  className: string
}

export const FilePicker = ({
  title,
  name,
  error,
  required = false,
  register,
  trigger,
  disabled = false,
  className,
}: FilePickerProps) => {
  const { setImage } = useContext(ImageContext)
  return (
    <FormInput title={title} error={error} className={className}>
      <Input
        required={required}
        disabled={disabled}
        type="file"
        {...register(name)}
        accept="image/png, image/jpeg, image/webp"
        className={`${BASE_INPUT_STYLE} my-3 cursor-pointer ${className}`}
        onChange={(e) => {
          const files = e.target.files
          if (files && files.length > 0) {
            trigger(name)
            setImage(files[0])
          }
        }}
      />
    </FormInput>
  )
}
