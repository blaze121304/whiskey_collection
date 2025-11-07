"use client"
import { ThemeToggle } from '@/components/theme-toggle'
import { useEffect, useState, useId } from 'react'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const calendarGradientId = useId()

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`}>
        <div className="container mx-auto px-4 md:px-6">
          {/* 헤더 바 - 반투명 유리 카드 */}
          <div className="header-glass-bar rounded-xl px-3 md:px-5 py-2 md:py-2.5">
            <div className="w-full flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
              {/* 왼쪽: 로고 씰 + 텍스트 스택 */}
              <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-shrink-0">
                {/* 바지앵 로고 */}
                <div className={`relative flex-shrink-0 transition-all duration-300 ${isScrolled ? 'w-12 h-12' : 'w-16 h-16'}`}>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 64 64"
                    className="bar-seal-logo"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(200, 137, 62, 0.3))',
                    }}
                  >
                  {/* 외곽 원형 테두리 */}
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    fill="none"
                    stroke="url(#bronzeGradient)"
                    strokeWidth="1.5"
                    className="opacity-80"
                  />
                  {/* 중앙 텍스트 영역 배경 */}
                  <circle
                    cx="32"
                    cy="32"
                    r="22"
                    fill="url(#bronzeGradient)"
                    className="opacity-10"
                  />
                  {/* 그라데이션, 필터 및 텍스트 경로 정의 */}
                  <defs>
                    <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C8893E" stopOpacity="1" />
                      <stop offset="50%" stopColor="#D4A574" stopOpacity="1" />
                      <stop offset="100%" stopColor="#B87A2E" stopOpacity="1" />
                    </linearGradient>
                    {/* 노이즈 필터 */}
                    <filter id="noise">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.9"
                        numOctaves="3"
                        result="noise"
                      />
                      <feColorMatrix
                        in="noise"
                        type="saturate"
                        values="0"
                      />
                      <feComponentTransfer>
                        <feFuncA type="discrete" tableValues="0 0.02 0.01 0.03 0.02 0.01 0.02 0.01" />
                      </feComponentTransfer>
                      <feComposite operator="in" in2="SourceGraphic" />
                    </filter>
                    {/* 원형 텍스트 경로 */}
                    <path id="topTextPath" d="M 16,32 A 16,16 0 0,1 48,32" fill="none" />
                    <path id="bottomTextPath" d="M 48,32 A 16,16 0 0,1 16,32" fill="none" />
                  </defs>
                  {/* 외곽 텍스트 경로 (위쪽) - 원형 경로 */}
                  <text className="bar-seal-text-outer" fill="url(#bronzeGradient)" fontSize="6.5" letterSpacing="2">
                    <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
                      WHISKEY COLLECTION
                    </textPath>
                  </text>
                  {/* 외곽 텍스트 경로 (아래쪽) - 원형 경로 */}
                  <text className="bar-seal-text-outer" fill="url(#bronzeGradient)" fontSize="5.5" letterSpacing="1.5">
                    <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
                      SINCE 2025
                    </textPath>
                  </text>
                  {/* 중앙 타이틀 */}
                  <text
                    x="32"
                    y="35"
                    textAnchor="middle"
                    className="bar-seal-text-main"
                    fill="url(#bronzeGradient)"
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="0.5"
                  >
                    RUSTY'S
                  </text>
                  <text
                    x="32"
                    y="42"
                    textAnchor="middle"
                    className="bar-seal-text-main"
                    fill="url(#bronzeGradient)"
                    fontSize="8"
                    fontWeight="400"
                    letterSpacing="1"
                  >
                    HOME BAR
                  </text>
                  </svg>
                </div>
                
                {/* 텍스트 스택 (2줄) */}
                <div className="min-w-0 flex-shrink-0">
                  <h1 className={`bar-title-main font-bold tracking-wide mb-0 transition-all duration-300 ${isScrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>
                    Rusty's Home Bar
                  </h1>
                  <p className={`bar-subtitle text-amber-900/70 dark:text-amber-200/70 font-light tracking-wider transition-all duration-300 ${isScrolled ? 'text-[10px]' : 'text-xs'}`}>
                    Curated Whiskies, Slow & Certain.
                  </p>
                </div>
              </div>
              
              {/* 오른쪽: 검색/시계/설정 */}
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                {/* 검색창 */}
                <div className={`min-w-0 transition-all duration-300 ${isScrolled ? 'w-48 md:w-56' : 'w-56 md:w-72'}`}>
                  <Input
                    value={nameSearch}
                    onChange={(e) => onNameSearchChange(e.target.value)}
                    placeholder="이름/브랜드 검색 — Macallan, Lagavulin, Yamazaki…"
                    className="w-full font-inter h-8 md:h-9 text-xs md:text-sm placeholder:text-amber-900/40 dark:placeholder:text-amber-200/40"
                  />
                </div>
                {/* 시계 */}
                <DateTimeDisplay />
                {/* 캘린더 버튼 */}
                <Button
                  variant="ghost"
                  onClick={() => setIsCalendarOpen(true)}
                  className="bar-icon-button h-8 w-8 md:h-9 md:w-9 p-0 flex items-center justify-center"
                  aria-label="캘린더"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={`url(#${calendarGradientId})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <defs>
                      <linearGradient id={calendarGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C8893E" stopOpacity="1" />
                        <stop offset="50%" stopColor="#D4A574" stopOpacity="1" />
                        <stop offset="100%" stopColor="#B87A2E" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                </Button>
                {/* 설정 메뉴 */}
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
        </div>
      </header>
      
      {/* 헤더 높이만큼 여백 추가 */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-16 md:h-18' : 'h-20 md:h-24'}`} />

      {/* 히어로 섹션 */}
      <div className="w-full">
        <div className="container mx-auto px-4 md:px-6 pb-4">
          <div
            className="hero-bar-section relative w-full h-36 md:h-48 rounded-2xl overflow-hidden border border-amber-900/20 dark:border-amber-900/30"
            style={{
              backgroundImage: "url('/hero/whiskey-bar.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* 암버 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/10 to-[#0A0A0A]/70" />
            {/* 필름 그레인 */}
            <div className="absolute inset-0 hero-grain opacity-20" />
            
            <div className="absolute inset-0 p-4 md:p-6 flex items-end">
              <div className="hero-toast-card backdrop-blur-sm rounded-xl px-4 py-3 md:px-5 md:py-3.5 shadow-lg border">
                <div className="hero-bar-quote text-sm md:text-base font-medium">
                  {quote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalendarPopup open={isCalendarOpen} onOpenChange={setIsCalendarOpen} />
    </>
  )
}



