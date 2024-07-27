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
    <>
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
      />
      <Label className="px-1">{inputValue}</Label>
    </>
  )
}
