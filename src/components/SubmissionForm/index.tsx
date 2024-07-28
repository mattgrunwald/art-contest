'use client'

import { useUser } from '@/hooks/useUser'
import { useForm, SubmitHandler } from 'react-hook-form'

import { submit } from './actions'
import { emailRegex, phoneRegex } from '@/util/helpers'
import { useMemo } from 'react'
import { SubmissionForEdit } from '@/db/types'
import { Block, Group } from './Containers'
import { ErrorMessage, Input, Label, Select, TextArea } from './FormInputs'
import { LinkButton } from '../themed'

interface IFormInput {
  email: string
  name: string
  grade: number
  statement: string
  image: FileList
  phone: string
  street: string
  street2: string
  state: string
  zip: string
  city: string
}

export type SubmissionFormProps = {
  sub: SubmissionForEdit | null
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
    <div className="flex w-full justify-center">
      <div className="w-full md:w-[700px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Group>
            <Block>
              <Label>
                Email
                {errors.email && (
                  <ErrorMessage msg="Required. Must be an email address" />
                )}
              </Label>
              <Input
                disabled={sub !== null}
                name="email"
                register={register}
                required
                pattern={emailRegex}
                initialValue={sub === null ? undefined : sub.user.email}
              />
            </Block>
            <Block>
              <Label>Name{errors.name && <ErrorMessage />}</Label>
              <Input
                disabled={sub !== null}
                register={register}
                name="name"
                required
                initialValue={sub === null ? undefined : sub.user.name!}
              />
            </Block>
          </Group>
          <Group>
            <Block>
              <Label>Address{errors.street && <ErrorMessage />}</Label>
              <Input
                register={register}
                name="street"
                required
                initialValue={sub === null ? undefined : sub.street}
              />
            </Block>
            <Block>
              <Label>Address Line 2{errors.street2 && <ErrorMessage />}</Label>
              <Input
                register={register}
                name="street2"
                initialValue={
                  sub === null ? undefined : sub.street2 || undefined
                }
              />
            </Block>
          </Group>
          <Group>
            <Block>
              <Label>City{errors.city && <ErrorMessage />}</Label>
              <Input
                register={register}
                name="city"
                required
                initialValue={sub === null ? undefined : sub.city}
              />
            </Block>
            <Block>
              <Label>Phone{errors.phone && <ErrorMessage />}</Label>
              <Input
                register={register}
                name="phone"
                required
                pattern={phoneRegex}
                initialValue={sub === null ? undefined : sub.phone}
                placeholder="(555) 555-5555"
              />
            </Block>
          </Group>
          <Group>
            <Block small>
              <Label>State{errors.state && <ErrorMessage />}</Label>
              <Select
                register={register}
                name="state"
                required
                type="state"
                initialValue={sub === null ? undefined : sub.state}
              />
            </Block>
            <Block small>
              <Label>Zip Code{errors.zip && <ErrorMessage />}</Label>
              <Input
                register={register}
                name="zip"
                required
                initialValue={sub === null ? undefined : sub.zip}
              />
            </Block>
            <Block small>
              <Label>
                Grade
                {errors.grade && (
                  <ErrorMessage msg="Required. Must be between 6 and 12" />
                )}
              </Label>
              <Select
                name="grade"
                type="grade"
                required
                register={register}
                initialValue={sub === null ? undefined : `${sub.grade}`}
              />
            </Block>
          </Group>
          <Label>
            {"Artist's Statement"}
            {errors.statement && <ErrorMessage />}
          </Label>
          <TextArea
            name="statement"
            register={register}
            initialValue={sub === null ? undefined : sub.statement}
          />

          <Label>
            Image (max 4.5MB)
            {errors.image && (
              <ErrorMessage msg="Required. Must be under 4.5MB" />
            )}
          </Label>
          {/* TODO add image preview */}
          <input
            type="file"
            {...register('image', { required: true })}
            accept="image/png, image/jpeg, image/webp"
            className="mb-3 mt-3 block w-full cursor-pointer rounded-lg border-none bg-slate-200 px-3 py-1.5 text-sm/6 text-slate-950 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 dark:bg-slate-800 dark:text-slate-50"
          />
          <div className="my-8 inline-flex w-full justify-between">
            <input
              className="inline-flex w-[48%] cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-300 px-3 py-1.5 text-sm/6 font-semibold text-slate-950 shadow-inner shadow-white/10 hover:bg-emerald-400 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white dark:bg-emerald-700 dark:text-slate-50 hover:dark:bg-emerald-600"
              type="submit"
              value={`${sub === null ? 'Submit' : 'Update'}`}
            />
            <LinkButton
              href={sub === null ? '' : `/submission/${sub.id}`}
              ariaLabel="cancel"
              className="w-[48%]"
            >
              Cancel
            </LinkButton>
          </div>
        </form>
      </div>
    </div>
  )
}
