'use client'

import { Level } from '@/db/util'
import { useUser } from '@/hooks/useUser'
import { File } from 'buffer'
import { SessionProvider, useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { submit } from './actions'
// import { revalidatePath } from 'next/cache';

interface IFormInput {
  email: string
  name: string
  grade: number
  statement: string
  image: File
}

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

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     <label>
  //       Email:
  //       <input
  //         disabled={!user.isAdmin}
  //         {...register('email', {
  //           required: true,
  //           // pattern: emailRegex,
  //         })}
  //         value={user.isAdmin ? '' : user.email!}
  //       />
  //     </label>
  //     <br />

  //     <label>
  //       Name:
  //       <input
  //         disabled={!user.isAdmin}
  //         {...register('name', { required: true })}
  //         value={user.isAdmin ? '' : user.name!}
  //       />
  //     </label>
  //     <br />

  //     <label>
  //       Grade:
  //       <input
  //         type="number"
  //         min={6}
  //         max={12}
  //         {...register('grade', { required: true, min: 6, max: 12 })}
  //       />
  //     </label>
  //     <br />
  //     <label>
  //       {"Artist's statement"}
  //       <textarea {...register('statement', { required: true })} />
  //     </label>
  //     <br />
  //     <label>
  //       Image (max 4.5MB)
  //       <input
  //         type="file"
  //         {...register('image', { required: true })}
  //         accept="image/png, image/jpeg, image/gif, image/webp"
  //       />
  //     </label>
  //     <button>Upload</button>
  //   </form>
  // )

  if (!user.id) {
    return <div>no id</div>
  }

  // todo figure out how to return data from a form submit
  // so we can navigate to submission page
  const submitWithId = submit.bind(null, user.id)

  return (
    <form action={submitWithId}>
      <label>
        Email:
        <input
          disabled={!user.isAdmin}
          name="email"
          value={user.isAdmin ? '' : user.email!}
        />
      </label>
      <br />

      <label>
        Name:
        <input
          disabled={!user.isAdmin}
          name="name"
          value={user.isAdmin ? '' : user.name!}
        />
      </label>
      <br />

      <label>
        Grade:
        <input type="number" min={6} max={12} name="grade" />
      </label>
      <br />
      <label>
        {"Artist's statement"}
        <textarea name="statement" />
      </label>
      <br />
      <label>
        Image (max 4.5MB)
        <input
          // TODO add ref so can check file size before upload
          type="file"
          required
          name="image"
          accept="image/png, image/jpeg, image/gif, image/webp"
        />
      </label>
      <button>Upload</button>
    </form>
  )
}
