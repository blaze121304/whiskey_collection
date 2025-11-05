"use client"
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { CategorySidebar } from '@/components/category-sidebar'
import { BentoGrid } from '@/components/bento-grid'
import { useEffect, useMemo, useState } from 'react'
import { Whiskey } from '@/lib/types'
import { ensureSeeded } from '@/lib/seed'
import { WhiskeyForm } from '@/components/whiskey-form'

export default function HomePage() {
  const [whiskeys, setWhiskeys] = useState<Whiskey[]>([])
  const [typeFilter, setTypeFilter] = useState<string | 'all'>('all')
  const [nameSearch, setNameSearch] = useState<string>('')
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    setWhiskeys(ensureSeeded())
  }, [])

  const filtered = useMemo(() => {
    return whiskeys.filter((w) => {
      const inType = typeFilter === 'all' ? true : w.category === typeFilter
      const inName = nameSearch.trim() === '' 
        ? true 
        : w.name.toLowerCase().includes(nameSearch.toLowerCase()) || 
          w.brand.toLowerCase().includes(nameSearch.toLowerCase())
      return inType && inName
    })
  }, [whiskeys, typeFilter, nameSearch])

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-6">
        <Header onAdd={() => setIsFormOpen(true)} nameSearch={nameSearch} onNameSearchChange={setNameSearch} />
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* 왼쪽 사이드바 - 종류 필터 */}
          <aside className="w-full md:w-48 flex-shrink-0">
            <CategorySidebar
              selected={typeFilter}
              onSelect={setTypeFilter}
            />
          </aside>

          {/* 메인 컨텐츠 영역 */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <BentoGrid items={filtered} />
            </div>
          </div>
        </div>

        
      </div>

      <WhiskeyForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSaved={(list) => setWhiskeys(list)}
      />
    </motion.main>
  )
}



