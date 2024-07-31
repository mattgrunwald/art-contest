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
import { useState } from 'react'

export const useSubmissionForm = (
  sub: SubmissionForEdit | null,
  subUserId: string | null,
) => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateFormSchemaOutput | UpdateFormSchemaOutput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(
      sub === null ? newSubmissionSchema : updateSubmissionSchema,
    ),
    defaultValues:
      sub === null
        ? {
            state: 'OH',
          }
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

  return { register, handleSubmit, trigger, errors, onSubmit, submitting }
}
