export type WhiskeyCategory = 'Single Malt' | 'Blended Malt' | 'World Whiskey' | 'Gin & Vodka' | 'Wine & Liqueur' | 'Sake & Traditional' | 'Beer'

export type WhiskeySubCategory = 'Sherry' | 'Peat' | 'Bourbon'

export interface Whiskey {
  id: string
  name: string
  englishName?: string
  brand: string
  category: WhiskeyCategory
  subCategories?: WhiskeySubCategory[] // 위스키 카테고리(싱글몰트, 블렌디드 몰트, 월드위스키)의 경우: 셰리, 피트, 버번 (여러 개 선택 가능)
  // 하위 호환성을 위해 subCategory도 유지 (deprecated)
  subCategory?: WhiskeySubCategory
  purchaseDate: string
  price: number
  imageDataUrl?: string
  notes?: string
  nose?: string
  palate?: string
  finish?: string
  personalNote?: string // 개인 소감
  pairings?: { icon: string; name: string }[] // 페어링 추천
  flavorTags?: string[] // 테이스팅 프로파일 태그
  createdAt: number
  updatedAt: number
}



