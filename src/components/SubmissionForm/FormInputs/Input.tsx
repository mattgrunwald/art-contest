import { BASE_INPUT_STYLE } from '@/consts'
import { useState } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { Input as HeadlessInput } from '@headlessui/react'
import { FormInput } from './FormInput'

export type InputProps = {
  title: string
  name: string
  error?: FieldError
  disabled?: boolean
  required?: boolean
  pattern?: RegExp
  min?: number
  max?: number
  register: UseFormRegister<any>
  type?: 'number' | 'email' | 'text'
  placeholder?: string
}

export const Input = ({
  title,
  name,
  error,
  type = 'text',
  required = false,
  disabled = false,
  register,
  placeholder,
  pattern,
  min,
  max,
}: InputProps) => {
  return (
    <FormInput title={title} error={error}>
      <HeadlessInput
        disabled={disabled}
        type={type}
        {...register(name, {
          required,
          pattern,
          min,
          max,
        })}
        min={min}
        max={max}
        className={BASE_INPUT_STYLE}
        placeholder={placeholder}
      />
    </FormInput>
  )
}
