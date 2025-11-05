export type WhiskeyCategory = 'Single Malt' | 'Blended Malt' | 'World Whiskey' | 'Gin & Vodka' | 'Wine & Liqueur' | 'Sake & Traditional' | 'Beer'

export interface Whiskey {
  id: string
  name: string
  englishName?: string
  brand: string
  category: WhiskeyCategory
  purchaseDate: string
  price: number
  imageDataUrl?: string
  notes?: string
  createdAt: number
  updatedAt: number
}



