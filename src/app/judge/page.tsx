import { SubmissionView } from '@/components/Submission'
import { submissions } from '@/components/util/types'

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-x-1 gap-y-1">
      {submissions.map((sub, imageIndex) => (
        <SubmissionView key={sub.id} sub={sub} role="judging" />
      ))}
    </div>
  )
}
