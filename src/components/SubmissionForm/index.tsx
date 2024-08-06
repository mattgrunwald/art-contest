'use client'

import { useUser } from '@/hooks/useUser'
import { FieldError } from 'react-hook-form'

import { SubmissionForEdit } from '@/db/types'
import { emailRegex, phoneRegex } from '@/util/helpers'
import { useMemo } from 'react'
import { SubmissionFormSkeleton } from '../skeleton/SubmissonFormSkeleton'
import { Buttons, Input, Select, TextArea } from './FormInputs'
import { useSubmissionForm } from './useSubmissionForm'
import { Banner } from './Banner'
import { ImageProvider } from './ImageContext'
import { DndFilePicker } from './FormInputs/DndFilePicker'

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
      return null
    }
    return user?.id || ''
  }, [user, sub])

  const showUnapprovedBanner = useMemo(() => sub && !sub.approved, [sub])
  const contestant = useMemo(
    () => (user && user.isContestant ? user : null),
    [user],
  )

  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    submitting,
    disableNameAndEmail,
    setError,
  } = useSubmissionForm(sub, submissionUserId, contestant)

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
    <div className="flex w-full flex-col items-center">
      {showUnapprovedBanner && <Banner>Pending Approval</Banner>}
      <div className="w-full md:w-[700px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-x-4 gap-y-1"
        >
          <Input
            title="Email"
            error={errors.email}
            disabled={disableNameAndEmail || submitting}
            register={register}
            required
            pattern={emailRegex}
            name="email"
            className="order-1 col-span-12 sm:col-span-6"
          />

          <Input
            title="Name"
            error={errors.name}
            disabled={disableNameAndEmail || submitting}
            register={register}
            name="name"
            required
            className="order-2 col-span-12 sm:col-span-6"
          />

          <Input
            title="Address"
            error={errors.street}
            register={register}
            name="street"
            required
            disabled={submitting}
            className="order-3 col-span-12 sm:col-span-6"
          />

          <Input
            title="Address Line 2"
            error={errors.street2}
            register={register}
            name="street2"
            disabled={submitting}
            className="order-4 col-span-12 sm:col-span-6"
          />

          <Input
            title="City"
            error={errors.city}
            register={register}
            name="city"
            required
            disabled={submitting}
            className="order-5 col-span-12 sm:col-span-6"
          />

          <Input
            title="Phone"
            error={errors.phone}
            register={register}
            name="phone"
            required
            pattern={phoneRegex}
            placeholder="(555) 555-5555"
            disabled={submitting}
            className="order-8 col-span-6 sm:order-6"
          />

          <Select
            title="State"
            error={errors.state}
            register={register}
            name="state"
            required
            type="state"
            disabled={submitting}
            className="order-6 col-span-6 sm:order-7 sm:col-span-4"
          />

          <Input
            title="Zip"
            error={errors.zip}
            register={register}
            name="zip"
            required
            disabled={submitting}
            className="order-7 col-span-6 sm:order-8 sm:col-span-4"
          />

          <Select
            name="grade"
            title="Grade"
            error={errors.grade}
            type="grade"
            required
            register={register}
            disabled={submitting}
            className="order-9 col-span-6 sm:col-span-4"
          />

          <ImageProvider>
            <DndFilePicker
              title="Image"
              name="image"
              required={sub === null}
              error={errors.image as FieldError | undefined}
              register={register}
              disabled={submitting}
              className="order-10 col-span-12"
              setError={setError}
              remoteSrc={sub?.imageSrc || null}
            />
          </ImageProvider>

          <TextArea
            title="Artist's Statement"
            error={errors.statement}
            name="statement"
            register={register}
            disabled={submitting}
            className="order-12 col-span-12"
          />

          <Buttons
            className="order-last col-span-12 mb-8 sm:mb-6"
            sub={sub}
            disabled={submitting}
          />
        </form>
      </div>
    </div>
  )
}
