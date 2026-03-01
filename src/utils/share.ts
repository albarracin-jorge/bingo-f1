import type { BingoGrid, SharePayload } from '../types'

export function encodeCardToHash(cells: BingoGrid): void {
  const payload: SharePayload = {
    texts: cells.map(c => c.text),
    images: cells.map(c => c.image),
    marked: cells.map(c => c.marked),
  }
  const encoded = btoa(encodeURIComponent(JSON.stringify(payload)))
  window.location.hash = `share=${encoded}`
  navigator.clipboard.writeText(window.location.href)
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
      payload.texts.length === 25 &&
      payload.marked.length === 25
    ) {
      return payload
    }
    return null
  } catch {
    return null
  }
}
