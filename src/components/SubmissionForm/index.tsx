'use client'

import { Level } from '@/db/util'
import { useUser } from '@/hooks/useUser'
import { File } from 'buffer'
import { SessionProvider, useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { submit } from './actions'
import { emailRegex } from '@/util/helpers'
import { useMemo } from 'react'
import { Submission } from '@/db/types'

interface IFormInput {
  email: string
  name: string
  grade: number
  statement: string
  image: FileList
}

export type SubmissionFormProps = {
  sub: Submission | null
}

export default function SubmissionForm({ sub }: SubmissionFormProps) {
  const user = useUser()
  const submissionUserId = useMemo(() => {
    if (user?.isAdmin) {
      if (sub) {
        return sub.userId
      }
      return ''
    }
    return user?.id || ''
  }, [user, sub])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = new FormData()

    formData.set('userId', submissionUserId)
    formData.set('submissionId', sub ? `${sub.id}` : '')

    for (const [key, val] of Object.entries(data)) {
      if (key === 'image') {
        formData.set(key, val[0])
      } else {
        formData.set(key, val)
      }
    }
    submit(formData)
  }
  if (!user) {
    return <div>loading...</div>
  }

  if (!user.id) {
    return <div>no id</div>
  }

  if (!user.loggedIn) {
    return <div>You must be logged in to submit!</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email:</label>
      <input
        disabled={!user.isAdmin}
        {...register('email', {
          required: true,
          pattern: emailRegex,
        })}
        value={user.isAdmin ? undefined : user.email}
      />
      {errors.email && <p>Required</p>}
      <br />

      <label>Name:</label>
      <input
        disabled={!user.isAdmin}
        {...register('name', { required: true })}
        value={user.isAdmin ? undefined : user.name!}
      />
      {errors.name && <p>Required</p>}
      <br />

      <label>Grade:</label>
      <input
        type="number"
        min={6}
        max={12}
        {...register('grade', { required: true, min: 6, max: 12 })}
      />
      {errors.grade && <p>Required. Must be between 6 and 12</p>}
      <br />
      <label>{"Artist's Statement"}</label>
      <textarea {...register('statement', { required: true })} />
      {errors.statement && <p>Required</p>}
      <br />
      <label>Image (max 4.5MB)</label>
      <input
        type="file"
        {...register('image', { required: true })}
        accept="image/png, image/jpeg, image/webp"
      />
      {errors.image && <p>Required</p>}
      {/* <button>Upload</button> */}
      <input type="submit" />
    </form>
  )
}
