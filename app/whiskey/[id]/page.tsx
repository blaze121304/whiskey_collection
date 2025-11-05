"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getWhiskeyById, upsertWhiskey, deleteWhiskey } from '@/lib/storage'
import { Whiskey } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'

export default function WhiskeyDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [item, setItem] = useState<Whiskey | null>(null)

  useEffect(() => {
    const w = getWhiskeyById(params.id)
    if (!w) router.replace('/')
    else setItem(w)
  }, [params.id, router])

  if (!item) return null

  const saveNotes = () => {
    const next: Whiskey = { ...item, updatedAt: Date.now() }
    upsertWhiskey(next)
    router.push('/')
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="container mx-auto px-4 py-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bento overflow-hidden">
          {item.imageDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageDataUrl} alt={item.name} className="w-full object-cover" style={{ aspectRatio: '3/4' }} />
          ) : (
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-amber-900/40 to-amber-700/20" />
          )}
        </div>
        <div className="bento p-5 space-y-4">
          <div>
            <div className="text-sm text-amber-900/60 dark:text-white/60">{item.brand} · {item.category}</div>
            <h1 className="text-2xl font-semibold mt-1 text-foreground dark:text-foreground">{item.name}</h1>
          </div>
          <div className="text-sm text-amber-900/70 dark:text-white/70">구매일 {item.purchaseDate || '-'} · 가격 ₩ {item.price.toLocaleString()}</div>
          <div>
            <div className="text-sm text-amber-900/60 dark:text-white/60 mb-2">테이스팅 노트</div>
            <Textarea
              value={item.notes || ''}
              onChange={(e) => setItem({ ...item, notes: e.target.value })}
              placeholder="노트, 향, 맛, 피니쉬 등"
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <Button variant="ghost" onClick={() => router.back()}>뒤로</Button>
            <Button variant="outline" onClick={() => { deleteWhiskey(item.id); router.push('/') }}>삭제</Button>
            <Button onClick={saveNotes}>저장</Button>
          </div>
        </div>
      </div>
    </motion.main>
  )
}



