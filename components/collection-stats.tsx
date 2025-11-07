"use client"
import { Whiskey } from '@/lib/types'
import { useMemo } from 'react'

export function CollectionStats({ whiskeys }: { whiskeys: Whiskey[] }) {
  const stats = useMemo(() => {
    const total = whiskeys.length
    const totalValue = whiskeys.reduce((sum, w) => sum + (w.price || 0), 0)
    const uniqueBrands = new Set(whiskeys.map(w => w.brand)).size
    
    // 이번 달 추가된 위스키 수 계산
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
    const addedThisMonth = whiskeys.filter(w => w.createdAt >= thisMonth).length
    
    // 이전 달 가치 계산 (간단한 추정)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime()
    const lastMonthWhiskeys = whiskeys.filter(w => w.createdAt < thisMonth && w.createdAt >= lastMonth)
    const lastMonthValue = lastMonthWhiskeys.reduce((sum, w) => sum + (w.price || 0), 0)
    const valueChange = lastMonthValue > 0 ? ((totalValue - lastMonthValue) / lastMonthValue * 100) : 0

    return {
      total,
      totalValue,
      uniqueBrands,
      addedThisMonth,
      valueChange,
    }
  }, [whiskeys])

  return (
    <div className="collection-stats mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card bento p-4">
          <h3 className="text-xs font-medium text-amber-900/70 dark:text-white/70 mb-2">Total Collection</h3>
          <p className="value text-2xl font-bold text-foreground dark:text-foreground mb-1">{stats.total} 병</p>
          {stats.addedThisMonth > 0 && (
            <p className="trend text-xs text-amber-600 dark:text-amber-400">+{stats.addedThisMonth} this month</p>
          )}
        </div>
        <div className="stat-card bento p-4">
          <h3 className="text-xs font-medium text-amber-900/70 dark:text-white/70 mb-2">Collection Value</h3>
          <p className="value text-2xl font-bold text-foreground dark:text-foreground mb-1">
            ₩{stats.totalValue.toLocaleString()}
          </p>
          {stats.valueChange !== 0 && (
            <p className={`trend text-xs ${stats.valueChange > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {stats.valueChange > 0 ? '↑' : '↓'} {Math.abs(stats.valueChange).toFixed(1)}%
            </p>
          )}
        </div>
        <div className="stat-card bento p-4">
          <h3 className="text-xs font-medium text-amber-900/70 dark:text-white/70 mb-2">Regions</h3>
          <p className="value text-2xl font-bold text-foreground dark:text-foreground">{stats.uniqueBrands} 지역</p>
        </div>
      </div>
    </div>
  )
}

