'use client'

import { Level } from '@/drizzle/util'
import { useUser } from '@/hooks/useUser'
import { File } from 'buffer'
import { SessionProvider, useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  email: string
  name: string
  grade: number
  statement: string
  image: File
}

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export default function SubmissionForm() {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
  const user = useUser()
  if (!user) {
    return <div>loading...</div>
  }

  if (!user.loggedIn) {
    return <div>You must be logged in to submit!</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email:
        <input
          disabled={!user.isAdmin}
          {...register('email', {
            required: true,
            // pattern: emailRegex,
          })}
          value={user.isAdmin ? '' : user.email!}
        />
      </label>
      <br />

      <label>
        Name:
        <input
          disabled={!user.isAdmin}
          {...register('name', { required: true })}
          value={user.isAdmin ? '' : user.name!}
        />
      </label>
      <br />

      <label>
        Grade:
        <input
          type="number"
          min={6}
          max={12}
          {...register('grade', { required: true, min: 6, max: 12 })}
        />
      </label>
      <br />
      <label>
        {"Artist's statement"}
        <textarea {...register('statement', { required: true })} />
      </label>
      <br />
      <label>
        Image (max 4.5MB)
        <input
          type="file"
          {...register('image')}
          accept="image/png, image/jpeg, image/gif, image/webp"
        />
      </label>
    </form>
  )
}
