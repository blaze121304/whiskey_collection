"use client"
import { Whiskey } from './types'

const STORAGE_KEY = 'whiskey.collection.v1'

export function getAllWhiskeys(): Whiskey[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const list = JSON.parse(raw) as Whiskey[]
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function saveAllWhiskeys(list: Whiskey[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function upsertWhiskey(item: Whiskey): Whiskey[] {
  const list = getAllWhiskeys()
  const idx = list.findIndex((w) => w.id === item.id)
  if (idx >= 0) list[idx] = item
  else list.unshift(item)
  saveAllWhiskeys(list)
  return list
}

export function getWhiskeyById(id: string): Whiskey | undefined {
  return getAllWhiskeys().find((w) => w.id === id)
}

export function deleteWhiskey(id: string): Whiskey[] {
  const next = getAllWhiskeys().filter((w) => w.id !== id)
  saveAllWhiskeys(next)
  return next
}



