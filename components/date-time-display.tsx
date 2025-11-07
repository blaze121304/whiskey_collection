"use client"
import { useState, useEffect } from 'react'

export function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date())
    }, 1000) // 1초마다 업데이트

    return () => clearInterval(timer)
  }, [])

  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()
  const weekday = dateTime.toLocaleDateString('ko-KR', { weekday: 'short' })
  const hours = dateTime.getHours().toString().padStart(2, '0')
  const minutes = dateTime.getMinutes().toString().padStart(2, '0')
  const seconds = dateTime.getSeconds().toString().padStart(2, '0')

  return (
    <div className="bar-time-display-card">
      <div className="digital-date-section">
        <div className="digital-year">{year}</div>
        <div className="digital-date">
          {month.toString().padStart(2, '0')}.{day.toString().padStart(2, '0')}
        </div>
        <div className="digital-weekday">{weekday}</div>
      </div>
      <div className="digital-time-section">
        <div className="digital-time">
          <span className="digital-digit">{hours[0]}</span>
          <span className="digital-digit">{hours[1]}</span>
          <span className="digital-separator">:</span>
          <span className="digital-digit">{minutes[0]}</span>
          <span className="digital-digit">{minutes[1]}</span>
          <span className="digital-separator">:</span>
          <span className="digital-digit">{seconds[0]}</span>
          <span className="digital-digit">{seconds[1]}</span>
        </div>
      </div>
    </div>
  )
}
