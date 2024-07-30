'use client'

import { useEffect, useState } from 'react'

export const Countdown = ({ endDate }: { endDate: Date }) => {
  // Set the date we're counting down to
  var end = endDate.getTime()

  const [time, setTime] = useState('')

  // Update the count down every 1 second
  useEffect(() => {
    const countdown = () => {
      // Get today's date and time
      const now = new Date().getTime()

      // Find the distance between now and the count down date
      var distance = end - now

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTime(`${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`)

      if (distance < 0) {
        clearInterval(secondInt)
        setTime('expired')
      }
    }
    countdown()
    const secondInt = setInterval(countdown, 1000)
  }, [])

  return <span>{time}</span>
}

const pad = (num: number) => (num < 10 ? `0${num}` : `${num}`)
