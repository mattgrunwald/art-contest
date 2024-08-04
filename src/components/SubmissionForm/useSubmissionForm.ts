import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { submit } from './actions'
import {
  CreateFormSchemaOutput,
  UpdateFormSchemaOutput,
  newSubmissionSchema,
  updateSubmissionSchema,
} from './formSchema/client'
import { SubmissionForEdit } from '@/db/types'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { UserInfo } from '@/hooks/useUser'

export const useSubmissionForm = (
  sub: SubmissionForEdit | null,
  subUserId: string | null,
  contestant: UserInfo | null,
) => {
  const router = useRouter()
  const disableNameAndEmail = useMemo(
    () => sub !== null || contestant !== null,
    [sub, contestant],
  )
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CreateFormSchemaOutput | UpdateFormSchemaOutput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(
      sub === null ? newSubmissionSchema : updateSubmissionSchema,
    ),
    defaultValues: {
      state: 'OH',
    },
  })

  if (contestant && contestant.name && contestant.email) {
    setValue('name', contestant.name)
    setValue('email', contestant.email)
  }

  if (sub) {
    setValue('email', sub.user.email)
    setValue('name', sub.user.name!)
    setValue('street', sub.street)
    setValue('street2', sub.street2 || null)
    setValue('city', sub.city)
    setValue('phone', sub.phone)
    setValue('state', sub.state)
    setValue('zip', sub.zip)
    setValue('grade', sub.grade)
    setValue('statement', sub.statement)
  }

  const onSubmit: SubmitHandler<
    CreateFormSchemaOutput | UpdateFormSchemaOutput
  > = async (data) => {
    setSubmitting(true)
    try {
      const formData = new FormData()

      formData.set('userId', subUserId || '')
      formData.set('submissionId', sub ? `${sub.id}` : '')

      for (const [key, val] of Object.entries(data)) {
        if (key === 'image') {
          if (val.length > 0) {
            formData.set(key, val[0])
          }
        } else {
          formData.set(key, val)
        }
      }
      const { message } = await submit(formData)
      if (message === 'success') {
        toast.success('Submission successful')
        router.push('/gallery')
      } else {
        toast.error(message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const getImageSrc = useCallback(
    (url: string | null) => {
      const imageList = getValues().image
      console.log('getting image src..')
      if (imageList) {
        return imageList[0] as File
      }
      return url
    },
    [getValues],
  )

  return {
    register,
    handleSubmit,
    trigger,
    errors,
    onSubmit,
    submitting,
    disableNameAndEmail,
    getImageSrc,
  }
}
