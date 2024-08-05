import { BASE_INPUT_STYLE } from '@/consts'
import { useState } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { Select as HeadlessSelect } from '@headlessui/react'
import { FormInput } from './FormInput'

const grades: Record<string, number> = {
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  '11': 11,
  '12': 12,
}

const states: Record<string, string> = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
}

export type SelectProps = {
  name: string
  register: UseFormRegister<any>
  required?: boolean
  type: 'grade' | 'state'
  title: string
  error?: FieldError
  disabled?: boolean
  sm?: number
  lg?: number
  className: string
}
export const Select = ({
  name,
  register,
  type,
  title,
  error,
  required = false,
  disabled = false,
  className,
}: SelectProps) => {
  const options = type === 'grade' ? grades : states
  return (
    <FormInput title={title} error={error} className={`${className}`}>
      <HeadlessSelect
        disabled={disabled}
        {...register(name, {
          required,
        })}
        className={`${BASE_INPUT_STYLE} my-3 h-9`}
      >
        {Object.entries(options).map(([key, val]) => (
          <option key={key} value={val}>
            {key}
          </option>
        ))}
      </HeadlessSelect>
    </FormInput>
  )
}
