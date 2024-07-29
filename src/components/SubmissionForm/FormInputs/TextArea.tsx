import { BASE_INPUT_STYLE } from '@/consts'
import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

export type TextAreaProps = {
  name: string
  register: UseFormRegister<any>
}

export const TextArea = ({ name, register }: TextAreaProps) => {
  return (
    <textarea
      className={`h-[200px] resize-none ${BASE_INPUT_STYLE}`}
      {...register(name, { required: true })}
    />
  )
}
