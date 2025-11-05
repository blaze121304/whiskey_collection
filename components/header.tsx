"use client"
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'

export function Header({ onAdd, nameSearch, onNameSearchChange }: { onAdd: () => void; nameSearch: string; onNameSearchChange: (v: string) => void }) {
  const [quote, setQuote] = useState<string>("오늘도 한 잔의 여유를.")

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
      <header className="w-full flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="h-9 w-9 rounded-xl accent-gradient flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold tracking-tight truncate text-foreground dark:text-foreground">Whiskey Collection</h1>
            <p className="text-xs text-amber-900/60 dark:text-white/60 truncate">Rusty's whiskey collection</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 w-full md:w-auto flex-1 md:flex-none">
            <Input
              value={nameSearch}
              onChange={(e) => onNameSearchChange(e.target.value)}
              placeholder="이름/브랜드 검색"
              className="w-full md:w-64"
            />
          </div>
          <Button onClick={onAdd} className="whitespace-nowrap flex-shrink-0">등록</Button>
        <div className="flex-shrink-0 hidden">
          <ThemeToggle />
        </div>
        </div>
      </header>

      <div
        className="mt-4 relative w-full h-36 md:h-48 rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 border-amber-900/20"
        style={{
          backgroundImage:
            "url('/hero/whiskey-bar.jpg')",
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
    </>
  )
}



