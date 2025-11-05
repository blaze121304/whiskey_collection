"use client"
import { Button } from '@/components/ui/button'
import type { WhiskeyCategory } from '@/lib/types'

const categories: Array<{ value: WhiskeyCategory | 'all'; label: string }> = [
  { value: 'all', label: '전체' },
  { value: 'Single Malt', label: '싱글몰트' },
  { value: 'Blended Malt', label: '블렌디드몰트' },
  { value: 'World Whiskey', label: '월드위스키' },
  { value: 'Gin & Vodka', label: '진&보드카' },
  { value: 'Wine & Liqueur', label: '와인&리큐어' },
  { value: 'Sake & Traditional', label: '사케/전통주' },
  { value: 'Beer', label: '맥주' },
]

export function CategorySidebar({
  selected,
  onSelect,
}: {
  selected: 'all' | WhiskeyCategory
  onSelect: (v: 'all' | WhiskeyCategory) => void
}) {
  return (
    <div className="bento p-4">
      <div className="text-sm font-semibold mb-4 text-foreground dark:text-foreground">위스키 종류</div>
      <div className="space-y-2">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={selected === cat.value ? 'default' : 'ghost'}
            onClick={() => onSelect(cat.value)}
            className="w-full justify-start"
            size="sm"
          >
            {cat.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

