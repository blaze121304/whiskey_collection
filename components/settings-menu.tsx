"use client"
import { useState, useRef, useEffect, useId } from 'react'
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
  const gridGradientId = useId()

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
        className="bar-icon-button h-8 w-8 md:h-9 md:w-9 p-0 flex items-center justify-center"
        aria-label="설정"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <defs>
            <linearGradient id={gridGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8893E" stopOpacity="1" />
              <stop offset="50%" stopColor="#D4A574" stopOpacity="1" />
              <stop offset="100%" stopColor="#B87A2E" stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle cx="6" cy="6" r="1.5" fill={`url(#${gridGradientId})`} />
          <circle cx="12" cy="6" r="1.5" fill={`url(#${gridGradientId})`} />
          <circle cx="18" cy="6" r="1.5" fill={`url(#${gridGradientId})`} />
          <circle cx="6" cy="12" r="1.5" fill={`url(#${gridGradientId})`} />
          <circle cx="12" cy="12" r="1.5" fill={`url(#${gridGradientId})`} />
          <circle cx="18" cy="12" r="1.5" fill={`url(#${gridGradientId})`} />
          <circle cx="6" cy="18" r="1.5" fill={`url(#${gridGradientId})`} />
          <circle cx="12" cy="18" r="1.5" fill={`url(#${gridGradientId})`} />
          <circle cx="18" cy="18" r="1.5" fill={`url(#${gridGradientId})`} />
        </svg>
      </Button>

      {isOpen && (
        <div className="bar-menu-dropdown absolute right-0 top-12 z-50 w-48 rounded-lg shadow-lg border overflow-hidden backdrop-blur-sm">
          <div className="py-1">
            <button
              onClick={() => {
                onRegister()
                setIsOpen(false)
              }}
              className="bar-menu-item w-full text-left px-4 py-2 text-sm transition-colors"
            >
              위스키 등록
            </button>
            <button
              onClick={() => {
                onEdit()
                setIsOpen(false)
              }}
              className="bar-menu-item w-full text-left px-4 py-2 text-sm transition-colors"
            >
              위스키 정보 수정
            </button>
            <button
              onClick={() => {
                onDelete()
                setIsOpen(false)
              }}
              className="bar-menu-item w-full text-left px-4 py-2 text-sm transition-colors"
            >
              위스키 삭제
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

