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
      className="h-[300px] w-full resize-none"
      value={val}
      {...register(name, { required: true })}
      onChange={(e) => setVal(e.target.value)}
    />
  )
}
