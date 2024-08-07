'use client'

import { FieldError, UseFormRegister, UseFormSetError } from 'react-hook-form'
import { FormInput } from './FormInput'
import { DragEventHandler, useContext, useRef, useState } from 'react'
import { ImageContext } from '../ImageContext'
import { Input } from '@headlessui/react'
import { ImagePreview } from '../ImagePreview'
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'

export type FilePickerProps = {
  title: string
  name: string
  error?: FieldError
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<any>
  className: string
  remoteSrc: string | null
  setError: UseFormSetError<any>
}

export const DndFilePicker = ({
  title,
  name,
  error,
  required = false,
  register,
  disabled = false,
  className,
  remoteSrc,
  setError,
}: FilePickerProps) => {
  const { setImage, imageSrc } = useContext(ImageContext)
  const { ref, ...registered } = register(name)
  // const [focused, setFocused] = useState(false)
  const inputRef = useRef<any>(null)

  const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
  }

  const onChange = (e: any) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setImage(files[0])
    }
  }

  const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const files = e.dataTransfer?.files || null
    if (!files) {
      return
    }
    if (files.length > 1) {
      setError(name, {
        message: 'too many files',
      })
      return
    }
    // todo validate file type

    if (inputRef?.current) {
      console.log(inputRef.current.files)
      inputRef.current.files = files
      console.log(inputRef.current.files)
      onChange({
        target: {
          files,
        },
      })
    }
  }

  return (
    <div className={className} onDrop={onDrop} onDragOver={onDragOver}>
      <FormInput title={title} error={error} className=""></FormInput>

      <label htmlFor="file-upload" tabIndex={11} className="h-full w-full">
        <div className="mt-3 h-[200px] w-full cursor-pointer rounded-xl bg-neutral-200 outline-none outline-2 outline-offset-0 focus-within:outline-black/25 dark:border-neutral-400 dark:bg-neutral-800 focus-within:dark:outline-white/25">
          {imageSrc === null && remoteSrc === null ? (
            <div className="flex h-full w-full flex-col items-center">
              <div className="flex h-[80px] items-end justify-center pb-2 text-lg">
                Choose a file or drag it here
              </div>
              <div className="flex h-[120px] items-start justify-center">
                <ArrowDownOnSquareIcon className="size-10" />
              </div>
            </div>
          ) : (
            <ImagePreview remoteSrc={remoteSrc} />
          )}
          <Input
            id="file-upload"
            required={required}
            disabled={disabled}
            type="file"
            className="h-10 w-10 opacity-10"
            accept="image/png, image/jpeg, image/webp"
            {...registered}
            ref={(e) => {
              ref(e)
              inputRef.current = e
            }}
            onChange={onChange}
            // onFocus={() => setFocused(true)}
            // onBlur={() => setFocused(false)}
          />
        </div>
      </label>
    </div>
  )
}
