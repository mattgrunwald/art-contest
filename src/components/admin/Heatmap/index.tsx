import { DAO } from '@/db/dao'
import { ClientHeatMap } from './client'
export const HeatMap = async () => {
  const { data, error } = await DAO.countSubmissionsByDate()
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="h-full w-full [&>*>text]:text-neutral-400">
      <ClientHeatMap counts={data} />
    </div>
  )
}
