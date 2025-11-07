"use client"
import { ThemeToggle } from '@/components/theme-toggle'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { SettingsMenu } from '@/components/settings-menu'
import { CalendarPopup } from '@/components/calendar-popup'
import { Button } from '@/components/ui/button'
import { DateTimeDisplay } from '@/components/date-time-display'

export function Header({ 
  onRegister, 
  onDelete, 
  onEdit,
  nameSearch, 
  onNameSearchChange 
}: { 
  onRegister: () => void
  onDelete: () => void
  onEdit: () => void
  nameSearch: string
  onNameSearchChange: (v: string) => void
}) {
  const [quote, setQuote] = useState<string>("오늘도 한 잔의 여유를.")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  useEffect(() => {
    let aborted = false
    const load = async () => {
      try {
        const res = await fetch('/api/quote', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (!aborted && data?.content) setQuote(String(data.content))
      } catch {}
    }
    load()
    return () => { aborted = true }
  }, [])
  return (
    <>
      <header className="w-full">
        <div className="container mx-auto px-4 md:px-6 pt-6 pb-0">
          {/* 상단: 로고, 검색창, 설정 버튼 */}
          <div className="w-full flex items-center justify-between gap-4 mb-4 flex-wrap md:flex-nowrap">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="h-9 w-9 rounded-xl accent-gradient flex-shrink-0" />
              <div className="min-w-0 flex-shrink-0">
                <h1 className="text-xl font-semibold tracking-tight truncate text-foreground dark:text-foreground">Whiskey Collection</h1>
                <p className="text-xs text-amber-900/60 dark:text-white/60 truncate">Rusty's whiskey collection</p>
              </div>
              {/* 검색창 - 제목 바로 옆, 네 번째 카드까지, 버튼 추가 시 줄어듦 */}
              <div className="flex-1 min-w-0 max-w-2xl ml-4" style={{ minWidth: '200px' }}>
                <Input
                  value={nameSearch}
                  onChange={(e) => onNameSearchChange(e.target.value)}
                  placeholder="이름/브랜드 검색"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* 현재 날짜/시간 표시 */}
              <DateTimeDisplay />
              {/* 캘린더 버튼 */}
              <Button
                variant="ghost"
                onClick={() => setIsCalendarOpen(true)}
                className="h-10 w-10 p-0 flex items-center justify-center hover:bg-white/5 dark:hover:bg-white/5"
                aria-label="캘린더"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-foreground dark:text-foreground"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                  <line x1="16" x2="16" y1="2" y2="6"/>
                  <line x1="8" x2="8" y1="2" y2="6"/>
                  <line x1="3" x2="21" y1="10" y2="10"/>
                </svg>
              </Button>
              <SettingsMenu 
                onRegister={onRegister}
                onDelete={onDelete}
                onEdit={onEdit}
              />
              <div className="flex-shrink-0 hidden">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full">
        <div className="container mx-auto px-4 md:px-6 pb-4">
          <div
            className="relative w-full h-36 md:h-48 rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 border-amber-900/20"
            style={{
              backgroundImage: "url('/hero/whiskey-bar.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent dark:from-black/60" />
            <div className="absolute inset-0 p-4 md:p-6 flex items-end">
              <div className="backdrop-blur-sm bg-white/10 dark:bg-white/10 rounded-xl px-3 py-2 md:px-4 md:py-2.5 shadow-sm">
                <div className="text-xs md:text-sm text-amber-50/90 dark:text-amber-100/90">Rusty's Home Bar</div>
                <div className="text-sm md:text-base font-semibold text-white">{quote}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalendarPopup open={isCalendarOpen} onOpenChange={setIsCalendarOpen} />
    </>
  )
}



