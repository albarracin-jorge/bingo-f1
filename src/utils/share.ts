import type { BingoGrid, SharePayload } from '../types'
import { CELL_COUNT } from '../constants'

export function encodeCardToHash(cells: BingoGrid): void {
  const payload: SharePayload = {
    texts: cells.map(c => c.text),
    images: cells.map(c => c.image),
    marked: cells.map(c => c.marked),
  }
  const encoded = btoa(encodeURIComponent(JSON.stringify(payload)))
  const url = `${window.location.origin}${window.location.pathname}#share=${encoded}`
  navigator.clipboard.writeText(url)
}

export function decodeHashToCard(hash: string): SharePayload | null {
  const match = hash.match(/^#?share=(.+)$/)
  if (!match) return null
  try {
    const json = decodeURIComponent(atob(match[1]))
    const payload = JSON.parse(json) as SharePayload
    if (
      Array.isArray(payload.texts) &&
      Array.isArray(payload.marked) &&
      payload.texts.length === CELL_COUNT &&
      payload.marked.length === CELL_COUNT
    ) {
      return payload
    }
    return null
  } catch {
    return null
  }
}
