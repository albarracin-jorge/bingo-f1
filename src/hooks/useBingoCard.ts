import { useState, useEffect } from 'react'
import type { BingoGrid, AppMode } from '../types'
import { CELL_COUNT, STORAGE_KEY } from '../constants'
import { getWinningCells } from '../utils/bingo'
import { encodeCardToHash, decodeHashToCard } from '../utils/share'

function defaultGrid(): BingoGrid {
  return Array.from({ length: CELL_COUNT }, (_, i) => ({
    id: i,
    text: '',
    marked: false,
  }))
}

function initState(): { cells: BingoGrid; isSharedPreview: boolean } {
  const shared = decodeHashToCard(window.location.hash)
  if (shared) {
    const cells: BingoGrid = shared.texts.map((text, i) => ({
      id: i,
      text,
      marked: shared.marked[i],
    }))
    return { cells, isSharedPreview: true }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as BingoGrid
      if (Array.isArray(parsed) && parsed.length === CELL_COUNT) {
        return { cells: parsed, isSharedPreview: false }
      }
    }
  } catch {
    void 0
  }

  return { cells: defaultGrid(), isSharedPreview: false }
}

export function useBingoCard() {
  const [{ cells, isSharedPreview }] = useState(initState)
  const [localCells, setLocalCells] = useState<BingoGrid>(cells)
  const [mode, setMode] = useState<AppMode>('edit')

  const winningCells = getWinningCells(localCells.map(c => c.marked))

  useEffect(() => {
    if (isSharedPreview) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localCells))
  }, [localCells, isSharedPreview])

  function toggleMode() {
    setMode(m => (m === 'edit' ? 'play' : 'edit'))
  }

  function updateCellText(id: number, text: string) {
    if (text.length > 80) return
    setLocalCells(prev =>
      prev.map(c => (c.id === id ? { ...c, text } : c))
    )
  }

  function deleteCell(id: number) {
    setLocalCells(prev =>
      prev.map(c => (c.id === id ? { ...c, text: '', marked: false } : c))
    )
  }

  function toggleCellMarked(id: number) {
    if (mode !== 'play') return
    setLocalCells(prev =>
      prev.map(c => (c.id === id ? { ...c, marked: !c.marked } : c))
    )
  }

  function shareCard() {
    encodeCardToHash(localCells)
  }

  return {
    cells: localCells,
    mode,
    winningCells,
    isSharedPreview,
    toggleMode,
    updateCellText,
    deleteCell,
    toggleCellMarked,
    shareCard,
  }
}
