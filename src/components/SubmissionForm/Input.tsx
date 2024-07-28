import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

export type InputProps = {
  name: string
  initialValue?: string
  disabled?: boolean
  required?: boolean
  pattern?: RegExp
  min?: number
  max?: number
  register: UseFormRegister<any>
  type?: 'number' | 'email' | 'text'
}

export const Input = ({
  name,
  type = 'text',
  required = false,
  disabled = false,
  register,
  initialValue = '',
  pattern,
  min,
  max,
}: InputProps) => {
  const [val, setVal] = useState(initialValue)
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
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  )
}
