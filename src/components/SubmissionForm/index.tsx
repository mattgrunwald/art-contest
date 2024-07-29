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
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, FormSchemaOutput } from './formSchema/client'
import { SubmissionFormSkeleton } from '../skeleton/SubmissonFormSkeleton'

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
    trigger,
    formState: { errors },
  } = useForm<FormSchemaOutput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues:
      sub === null
        ? {}
        : {
            email: sub.user.email,
            name: sub.user.name!,
            street: sub.street,
            street2: sub.street2 || undefined,
            city: sub.city,
            phone: sub.phone,
            state: sub.state,
            zip: sub.zip,
            grade: sub.grade,
            statement: sub.statement,
            // todo fetch image
          },
  })
  const onSubmit: SubmitHandler<FormSchemaOutput> = (data) => {
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
    console.log(data)
    submit(formData)
  }
  if (!user) {
    return <SubmissionFormSkeleton />
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
                  <ErrorMessage msg={errors.email.message as string} />
                )}
              </Label>
              <Input
                disabled={sub !== null}
                name="email"
                register={register}
                required
                pattern={emailRegex}
              />
            </Block>
            <Block>
              <Label>
                Name
                {errors.name && (
                  <ErrorMessage msg={errors.name.message as string} />
                )}
              </Label>
              <Input
                disabled={sub !== null}
                register={register}
                name="name"
                required
              />
            </Block>
          </Group>
          <Group>
            <Block>
              <Label>
                Address
                {errors.street && (
                  <ErrorMessage msg={errors.street.message as string} />
                )}
              </Label>
              <Input register={register} name="street" required />
            </Block>
            <Block>
              <Label>
                Address Line 2
                {errors.street2 && (
                  <ErrorMessage msg={errors.street2.message as string} />
                )}
              </Label>
              <Input register={register} name="street2" />
            </Block>
          </Group>
          <Group>
            <Block>
              <Label>
                City
                {errors.city && (
                  <ErrorMessage msg={errors.city.message as string} />
                )}
              </Label>
              <Input register={register} name="city" required />
            </Block>
            <Block>
              <Label>
                Phone
                {errors.phone && (
                  <ErrorMessage msg={errors.phone.message as string} />
                )}
              </Label>
              <Input
                register={register}
                name="phone"
                required
                pattern={phoneRegex}
                placeholder="(555) 555-5555"
              />
            </Block>
          </Group>
          <Group>
            <Block small>
              <Label>
                State
                {errors.state && (
                  <ErrorMessage msg={errors.state.message as string} />
                )}
              </Label>
              <Select register={register} name="state" required type="state" />
            </Block>
            <Block small>
              <Label>
                Zip Code
                {errors.zip && (
                  <ErrorMessage msg={errors.zip.message as string} />
                )}
              </Label>
              <Input register={register} name="zip" required />
            </Block>
            <Block small>
              <Label>
                Grade
                {errors.grade && (
                  <ErrorMessage msg={errors.grade.message as string} />
                )}
              </Label>
              <Select name="grade" type="grade" required register={register} />
            </Block>
          </Group>
          <Label>
            {"Artist's Statement"}
            {errors.statement && (
              <ErrorMessage msg={errors.statement.message as string} />
            )}
          </Label>
          <TextArea name="statement" register={register} />

          <Label>
            Image
            {errors.image && (
              <ErrorMessage msg={errors.image.message as string} />
            )}
          </Label>
          {/* TODO add image preview */}
          <input
            type="file"
            {...register('image')}
            accept="image/png, image/jpeg, image/webp"
            className="mb-3 mt-3 block w-full cursor-pointer rounded-lg border-none bg-slate-200 px-3 py-1.5 text-sm/6 text-slate-950 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 dark:bg-slate-800 dark:text-slate-50"
            onChange={() => trigger('image')}
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
