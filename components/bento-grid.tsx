"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Whiskey } from '@/lib/types'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

export function BentoGrid({ items }: { items: Whiskey[] }) {
  if (items.length === 0) {
    return (
      <div className="bento p-8 text-center text-amber-900/70 dark:text-white/70">
        아직 등록된 위스키가 없습니다. 상단의 "위스키 등록" 버튼을 눌러 추가하세요.
      </div>
    )
  }
  return (
    <div className="[column-fill:_balance] columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
      {items.map((w) => (
        <motion.div key={w.id} layoutId={`card-${w.id}`} className="break-inside-avoid">
          <Link href={`/whiskey/${w.id}`}>
            <Card className="p-0 overflow-hidden hover:scale-[1.01] transition-transform">
              <div className="relative">
                {w.imageDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={w.imageDataUrl}
                    alt={w.name}
                    className="w-full object-cover"
                    style={{ aspectRatio: '3/4' }}
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-gradient-to-br from-amber-900/40 to-amber-700/20" />
                )}
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border border-white/10 shadow-sm bg-white/70 text-amber-900 backdrop-blur-sm dark:bg-black/50 dark:text-amber-100">
                    {w.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-amber-900/70 dark:text-white/60 whitespace-normal break-words">{w.brand}</div>
                <div className="mt-1 font-semibold text-foreground dark:text-foreground whitespace-normal break-words">{w.name}</div>
                {w.englishName && (
                  <div className="mt-0.5 text-xs text-amber-900/60 dark:text-white/50 whitespace-normal break-words">{w.englishName}</div>
                )}
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}



