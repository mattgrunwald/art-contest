'use client'
import { Label } from '@headlessui/react'
import { useCallback, useState } from 'react'
import { debounce } from 'lodash'

export type SliderProps = {
  min?: number
  max?: number
  initialValue: number
  onChange: (value: string) => Promise<void>
}

export const Slider = ({
  initialValue,
  min = 1,
  max = 10,
  onChange,
}: SliderProps) => {
  const [inputValue, setInputValue] = useState<string>(`${initialValue}`)
  const doOnChange = useCallback(
    debounce((input: string) => {
      onChange(input)
    }, 1000),
    [],
  )
  return (
    <div className="flex h-12 items-center">
      <input
        type="range"
        defaultValue={initialValue}
        min={min}
        max={max}
        step={0.1}
        onChange={(e) => {
          const input = e.target.value
          setInputValue(input)
          doOnChange(input)
        }}
        className="w-[80%]"
      />
      <Label className="flex h-full w-[20%] items-center justify-center pb-1 text-2xl">
        {inputValue}
      </Label>
    </div>
  )
}
