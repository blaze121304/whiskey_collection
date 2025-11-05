"use client"
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Filters({
  nameSearch,
  onNameSearchChange,
}: {
  nameSearch: string
  onNameSearchChange: (v: string) => void
}) {
  const [tempNameSearch, setTempNameSearch] = useState<string>(nameSearch)

  useEffect(() => {
    setTempNameSearch(nameSearch)
  }, [nameSearch])

  const handleNameSearchApply = () => {
    onNameSearchChange(tempNameSearch)
  }

  return (
    <div className="bento p-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <div className="text-xs text-amber-900/60 dark:text-white/60 mb-2">이름 검색</div>
          <div className="flex gap-2">
            <Input
              value={tempNameSearch}
              onChange={(e) => setTempNameSearch(e.target.value)}
              placeholder="위스키 이름 검색"
              className="flex-1"
            />
            <Button onClick={handleNameSearchApply} size="md">확인</Button>
          </div>
        </div>
      </div>
    </div>
  )
}



