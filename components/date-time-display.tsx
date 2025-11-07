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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber-600 dark:text-amber-400 flex-shrink-0"
      >
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      <div className="flex flex-col min-w-0">
        <div className="text-xs font-medium text-foreground dark:text-foreground whitespace-nowrap">
          {formatDate(dateTime)}
        </div>
        <div className="text-xs text-amber-900/70 dark:text-amber-100/70 font-mono">
          {formatTime(dateTime)}
        </div>
      </div>
    </div>
  )
}

