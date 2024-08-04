'use client'
import { SubCount } from '@/db/types'
import ReactHeatMap from '@uiw/react-heat-map'

export const ClientHeatMap = ({ counts }: { counts: SubCount[] }) => {
  // const startDate = counts.length > 0 ? counts[0].date : new Date('2024/08/01')
  const startDate = new Date('2024/08/01')

  return (
    <ReactHeatMap
      value={counts.map(({ count, date }) => ({
        count: count,
        date: date.toString(),
      }))}
      weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
      startDate={startDate}
      rectSize={20}
      legendCellSize={20}
      space={4}
      width={300}
      height={210}
    />
  )
}
