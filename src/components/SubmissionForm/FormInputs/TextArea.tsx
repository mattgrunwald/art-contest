import { BASE_INPUT_STYLE } from '@/consts'
import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

export type TextAreaProps = {
  name: string
  initialValue?: string
  register: UseFormRegister<any>
}

export const TextArea = ({
  name,
  initialValue = '',
  register,
}: TextAreaProps) => {
  const [val, setVal] = useState(initialValue)
  return (
    <textarea
      className={`h-[200px] resize-none ${BASE_INPUT_STYLE}`}
      value={val}
      {...register(name, { required: true })}
      onChange={(e) => setVal(e.target.value)}
    />
  )
}
