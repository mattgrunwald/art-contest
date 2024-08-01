import { User } from '@/db/types'
import Image from 'next/image'

export const UserInfo = ({ user }: { user: User | null }) => {
  if (!user) {
    return <div className="mb-4 h-8"></div>
  }
  return (
    <div className="mb-4 flex w-full justify-between bg-slate-300 dark:bg-slate-800">
      <div>
        <div className="text-lg">{user.name}</div>
        <div className="text-sm">{user.email}</div>
      </div>
      <div className="">
        <Image
          className="h-12 w-12 rounded-full object-cover"
          src={user.image || '/images/1.jpg'}
          alt="Your profile image"
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}
