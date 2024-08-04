'use client'

import { BASE_INPUT_STYLE } from '@/consts'
import { Input } from '@headlessui/react'
import { FieldError, UseFormRegister, UseFormTrigger } from 'react-hook-form'
import { FormInput } from './FormInput'
import { useContext } from 'react'
import { ImageContext } from '../ImageContext'

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
  disabled = false,
}: FilePickerProps) => {
  const { setImage } = useContext(ImageContext)
  return (
    <FormInput title={title} error={error}>
      <input
        required={required}
        disabled={disabled}
        type="file"
        {...register(name)}
        accept="image/png, image/jpeg, image/webp"
        className={`${BASE_INPUT_STYLE} my-3 cursor-pointer`}
        onChange={(e) => {
          const files = e.target.files
          if (files && files.length > 0) {
            console.log('SETTING IMAGE', files[0])
            setImage(files[0])
          }
          trigger('image')
        }}
      />
    </FormInput>
  )
}
