"use client"
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Whiskey, WhiskeyCategory } from '@/lib/types'
import { upsertWhiskey, getAllWhiskeys } from '@/lib/storage'

const categories: WhiskeyCategory[] = ['Single Malt', 'Blended Malt', 'World Whiskey', 'Gin & Vodka', 'Wine & Liqueur', 'Sake & Traditional', 'Beer']

const categoryLabels: Record<WhiskeyCategory, string> = {
  'Single Malt': '싱글몰트',
  'Blended Malt': '블렌디드몰트',
  'World Whiskey': '월드위스키',
  'Gin & Vodka': '진&보드카',
  'Wine & Liqueur': '와인&리큐어',
  'Sake & Traditional': '사케/전통주',
  'Beer': '맥주',
}

export function WhiskeyForm({ open, onOpenChange, onSaved }: { open: boolean; onOpenChange: (v: boolean) => void; onSaved: (list: Whiskey[]) => void }) {
  const [name, setName] = useState('')
  const [englishName, setEnglishName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState<WhiskeyCategory | ''>('')
  const [notes, setNotes] = useState('')
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(undefined)
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!open) {
      setName(''); setEnglishName(''); setBrand(''); setCategory(''); setNotes(''); setImageDataUrl(undefined)
    }
  }, [open])

  const handleFile = async (file: File) => {
    const reader = new FileReader()
    return await new Promise<string>((resolve) => {
      reader.onload = () => resolve(String(reader.result))
      reader.readAsDataURL(file)
    })
  }

  const onSubmit = () => {
    if (!name.trim()) {
      alert('위스키명을 입력해주세요.')
      return
    }
    if (!category || category === '') {
      alert('종류를 선택해주세요.')
      return
    }
    const now = Date.now()
    const whiskey: Whiskey = {
      id: String(now),
      name,
      englishName: englishName || undefined,
      brand,
      category: category as WhiskeyCategory,
      purchaseDate: '',
      price: 0,
      imageDataUrl,
      notes,
      createdAt: now,
      updatedAt: now,
    }
    const list = upsertWhiskey(whiskey)
    onSaved(list)
    onOpenChange(false)
  }

  return (
    <div className={"fixed inset-0 z-50 transition " + (open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />
      <div className="absolute bottom-0 left-0 right-0 md:left-auto md:right-6 md:bottom-6 md:w-[520px]">
        <div className="bento p-5 md:p-6 md:rounded-2xl md:shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">등록</h3>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>닫기</Button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <Label>위스키명</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="더 맥캘란 12" />
            </div>
            <div>
              <Label>영문명</Label>
              <Input value={englishName} onChange={(e) => setEnglishName(e.target.value)} placeholder="The Macallan 12" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>브랜드</Label>
                <Input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Macallan" />
              </div>
              <div>
                <Label>종류 <span className="text-red-400">*</span></Label>
                <Select value={category} onChange={(e) => setCategory(e.target.value as WhiskeyCategory | '')}>
                  <option value="">선택해주세요</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{categoryLabels[c]}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <Label>사진</Label>
              <div className="flex items-center gap-3">
                <Input ref={inputFileRef} type="file" accept="image/*" onChange={async (e) => {
                  const f = e.target.files?.[0]
                  if (!f) return
                  const url = await handleFile(f)
                  setImageDataUrl(url)
                }} />
              </div>
              {imageDataUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageDataUrl} alt="preview" className="mt-3 w-full rounded-xl object-cover" style={{ aspectRatio: '3/2' }} />
              )}
            </div>
            <div>
              <Label>테이스팅 노트 (선택)</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="노트, 향, 맛, 피니쉬 등" />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>취소</Button>
              <Button onClick={onSubmit}>저장</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



