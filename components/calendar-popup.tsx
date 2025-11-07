"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface CalendarEvent {
  date: string // YYYY-MM-DD 형식
  memo: string
}

export function CalendarPopup({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [memo, setMemo] = useState<string>('')
  const [events, setEvents] = useState<Record<string, string>>({})
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    if (open) {
      // localStorage에서 저장된 이벤트 불러오기
      const saved = localStorage.getItem('whiskey.calendar.events')
      if (saved) {
        try {
          setEvents(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to load calendar events', e)
        }
      }
    }
  }, [open])

  useEffect(() => {
    // 선택된 날짜의 메모 불러오기
    if (events[selectedDate]) {
      setMemo(events[selectedDate])
    } else {
      setMemo('')
    }
  }, [selectedDate, events])

  const saveMemo = () => {
    const updated = { ...events, [selectedDate]: memo }
    setEvents(updated)
    localStorage.setItem('whiskey.calendar.events', JSON.stringify(updated))
  }

  const deleteMemo = () => {
    const updated = { ...events }
    delete updated[selectedDate]
    setEvents(updated)
    localStorage.setItem('whiskey.calendar.events', JSON.stringify(updated))
    setMemo('')
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    // 빈 칸 추가 (이전 달의 마지막 날들)
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // 현재 달의 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    setSelectedDate(today.toISOString().split('T')[0])
  }

  const handleDateClick = (day: number) => {
    if (day === null) return
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(date.toISOString().split('T')[0])
  }

  const days = getDaysInMonth(currentMonth)
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const isToday = (day: number) => {
    if (day === null) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date.toISOString().split('T')[0] === todayStr
  }
  const isSelected = (day: number) => {
    if (day === null) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date.toISOString().split('T')[0] === selectedDate
  }
  const hasEvent = (day: number) => {
    if (day === null) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return !!events[date.toISOString().split('T')[0]]
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 transition" style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}>
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4">
        <div className="bento p-6 md:rounded-2xl md:shadow-xl bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-foreground dark:text-foreground">캘린더</h3>
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-sm">닫기</Button>
          </div>

          {/* 캘린더 */}
          <div className="mb-6">
            {/* 월 네비게이션 */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={goToPreviousMonth} className="h-8 w-8 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground dark:text-foreground">
                  {formatMonthYear(currentMonth)}
                </span>
                <Button variant="ghost" onClick={goToToday} className="h-7 px-2 text-xs">
                  오늘
                </Button>
              </div>
              <Button variant="ghost" onClick={goToNextMonth} className="h-8 w-8 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-amber-900/60 dark:text-white/60 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => {
                if (day === null) {
                  return <div key={idx} className="aspect-square" />
                }
                const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0]
                return (
                  <button
                    key={idx}
                    onClick={() => handleDateClick(day)}
                    className={`
                      aspect-square rounded-lg text-sm transition-colors
                      ${isSelected(day) 
                        ? 'bg-amber-600 text-white dark:bg-amber-600' 
                        : isToday(day)
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100'
                        : 'hover:bg-amber-50 dark:hover:bg-white/5 text-foreground dark:text-foreground'
                      }
                      ${hasEvent(day) ? 'font-semibold' : ''}
                    `}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span>{day}</span>
                      {hasEvent(day) && (
                        <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected(day) ? 'bg-white' : 'bg-amber-600 dark:bg-amber-400'}`} />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 메모 영역 */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground dark:text-foreground">
              {selectedDate === todayStr ? '오늘' : new Date(selectedDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} 메모
            </div>
            <Textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요..."
              className="min-h-[100px]"
            />
            <div className="flex items-center gap-2 justify-end">
              {events[selectedDate] && (
                <Button variant="outline" onClick={deleteMemo} className="text-sm">
                  삭제
                </Button>
              )}
              <Button onClick={saveMemo} className="text-sm">
                저장
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

