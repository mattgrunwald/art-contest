import { User } from '@/db/types'
import Image from 'next/image'

export const UserInfo = ({
  user,
  large = false,
}: {
  user: User | null
  large?: boolean
}) => {
  if (!user) {
    return <div className="mb-4 h-8"></div>
  }
  return (
    <div className={`${large ? 'mb-8' : 'mb-4'} flex w-full justify-between`}>
      <div>
        <div className="text-lg">{user.name}</div>
        <div className="text-sm">{user.email}</div>
      </div>
      {large && (
        <div>
          <Image
            className={`${large ? 'h-12 w-12' : 'h-8 w-8'} rounded-full object-cover`}
            src={user.image || '/images/1.jpg'}
            alt="Your profile image"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  )
}
