import { Countdown } from '@/components/homepage/Countdown'

const contestStartDate = new Date('2024-10-14T00:00:00.000-05:00')

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="text-6xl font-bold">GEM Project Art Contest 2024</div>
      <div className="my-8 text-5xl">
        <Countdown endDate={contestStartDate} />
      </div>
    </div>
  )
}
