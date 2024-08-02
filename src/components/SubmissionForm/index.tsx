'use client'

import { useUser } from '@/hooks/useUser'
import { FieldError } from 'react-hook-form'

import { SubmissionForEdit } from '@/db/types'
import { emailRegex, phoneRegex } from '@/util/helpers'
import { useMemo } from 'react'
import { SubmissionFormSkeleton } from '../skeleton/SubmissonFormSkeleton'
import { Block, Group } from './Containers'
import { Buttons, FilePicker, Input, Select, TextArea } from './FormInputs'
import { useSubmissionForm } from './useSubmissionForm'
import { Banner } from './Banner'

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
    trigger,
    errors,
    onSubmit,
    submitting,
    disableNameAndEmail,
  } = useSubmissionForm(sub, submissionUserId, contestant)

  if (!user) {
    return <SubmissionFormSkeleton />
  }

  if (!user.id) {
    console.log(user)
    return <div>no id</div>
  }

  if (!user.loggedIn) {
    return <div>You must be logged in to submit!</div>
  }
  return (
    <div className="flex w-full flex-col items-center">
      {showUnapprovedBanner && <Banner>Pending Approval</Banner>}
      <div className="w-full md:w-[700px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Group>
            <Block>
              <Input
                title="Email"
                error={errors.email}
                disabled={disableNameAndEmail || submitting}
                register={register}
                required
                pattern={emailRegex}
                name="email"
              />
            </Block>
            <Block>
              <Input
                title="Name"
                error={errors.name}
                disabled={disableNameAndEmail || submitting}
                register={register}
                name="name"
                required
              />
            </Block>
          </Group>
          <Group>
            <Block>
              <Input
                title="Address"
                error={errors.street}
                register={register}
                name="street"
                required
                disabled={submitting}
              />
            </Block>
            <Block>
              <Input
                title="Address Line 2"
                error={errors.street2}
                register={register}
                name="street2"
                disabled={submitting}
              />
            </Block>
          </Group>
          <Group>
            <Block>
              <Input
                title="City"
                error={errors.city}
                register={register}
                name="city"
                required
                disabled={submitting}
              />
            </Block>
            <Block>
              <Input
                title="Phone"
                error={errors.phone}
                register={register}
                name="phone"
                required
                pattern={phoneRegex}
                placeholder="(555) 555-5555"
                disabled={submitting}
              />
            </Block>
          </Group>
          <Group>
            <Block small>
              <Select
                title="State"
                error={errors.state}
                register={register}
                name="state"
                required
                type="state"
                disabled={submitting}
              />
            </Block>
            <Block small>
              <Input
                title="Zip"
                error={errors.zip}
                register={register}
                name="zip"
                required
                disabled={submitting}
              />
            </Block>
            <Block small>
              <Select
                name="grade"
                title="Grade"
                error={errors.grade}
                type="grade"
                required
                register={register}
                disabled={submitting}
              />
            </Block>
          </Group>
          <TextArea
            title="Artist's Statement"
            error={errors.statement}
            name="statement"
            register={register}
            disabled={submitting}
          />

          {/* TODO add image preview */}
          <FilePicker
            title={'Image'}
            name={'image'}
            required={sub === null}
            error={errors.image as FieldError | undefined}
            register={register}
            trigger={trigger}
            disabled={submitting}
          />
          <div className="my-3 inline-flex w-full justify-between">
            <Buttons sub={sub} disabled={submitting} />
          </div>
        </form>
      </div>
    </div>
  )
}
