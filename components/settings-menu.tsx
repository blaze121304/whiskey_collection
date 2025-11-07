"use client"
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function SettingsMenu({ 
  onRegister, 
  onDelete, 
  onEdit 
}: { 
  onRegister: () => void
  onDelete: () => void
  onEdit: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 p-0 flex items-center justify-center hover:bg-white/5 dark:hover:bg-white/5"
        aria-label="설정"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-foreground dark:text-foreground"
        >
          <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          <circle cx="12" cy="6" r="1.5" fill="currentColor" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" />
          <circle cx="6" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="18" cy="12" r="1.5" fill="currentColor" />
          <circle cx="6" cy="18" r="1.5" fill="currentColor" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
          <circle cx="18" cy="18" r="1.5" fill="currentColor" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-white/10 dark:border-white/10 border-amber-900/20 overflow-hidden">
          <div className="py-1">
            <button
              onClick={() => {
                onRegister()
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-foreground dark:text-foreground hover:bg-amber-50 dark:hover:bg-white/5 transition-colors"
            >
              위스키 등록
            </button>
            <button
              onClick={() => {
                onEdit()
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-foreground dark:text-foreground hover:bg-amber-50 dark:hover:bg-white/5 transition-colors"
            >
              위스키 정보 수정
            </button>
            <button
              onClick={() => {
                onDelete()
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-foreground dark:text-foreground hover:bg-amber-50 dark:hover:bg-white/5 transition-colors"
            >
              위스키 삭제
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

