import { BASE_INPUT_STYLE } from '@/consts'
import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

export type InputProps = {
  name: string
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
  name,
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
    <input
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
  )
}
