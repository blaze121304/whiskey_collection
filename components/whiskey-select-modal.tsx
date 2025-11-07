"use client"
import { useState } from 'react'
import { Whiskey } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function WhiskeySelectModal({
  open,
  onOpenChange,
  whiskeys,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  whiskeys: Whiskey[]
  onSelect: (whiskey: Whiskey) => void
}) {
  const [search, setSearch] = useState('')

  if (!open) return null

  const filtered = whiskeys.filter((w) =>
    search.trim() === '' ||
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.brand.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 transition" style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}>
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 max-h-[80vh]">
        <div className="bento p-6 md:rounded-2xl md:shadow-xl bg-white dark:bg-gray-900 overflow-y-auto max-h-[80vh]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-foreground dark:text-foreground">위스키 선택</h3>
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-sm">닫기</Button>
          </div>

          <div className="mb-4">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="위스키명 또는 브랜드로 검색..."
              className="w-full"
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-amber-900/70 dark:text-white/70">
                검색 결과가 없습니다.
              </div>
            ) : (
              filtered.map((whiskey) => (
                <Button
                  key={whiskey.id}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-amber-50/50 dark:hover:bg-amber-900/20"
                  onClick={() => {
                    onSelect(whiskey)
                    onOpenChange(false)
                  }}
                >
                  <div className="flex flex-col items-start">
                    <div className="font-semibold text-foreground dark:text-foreground">{whiskey.name}</div>
                    <div className="text-sm text-amber-900/70 dark:text-white/60">{whiskey.brand} · {whiskey.category}</div>
                  </div>
                </Button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

