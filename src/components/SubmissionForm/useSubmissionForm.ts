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

export const useSubmissionForm = (
  sub: SubmissionForEdit | null,
  subUserId: string | null,
) => {
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
  > = (data) => {
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
    submit(formData)
  }

  return { register, handleSubmit, trigger, errors, onSubmit }
}
