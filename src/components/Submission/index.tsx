import { Submission } from '../util/types'
import Image from 'next/image'

export type SubmissionViewProps = {
  sub: Submission
  role: 'judging' | 'admin'
}
export const SubmissionView = ({ sub, role }: SubmissionViewProps) => {
  return (
    <div className="max-w-[500px] justify-center">
      <div className="w-full">
        <Image
          src={`/images/${sub.image}`}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
      <div>
        <p>{sub.statement}</p>
      </div>
    </div>
  )
}
