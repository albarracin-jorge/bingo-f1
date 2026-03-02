import { useState } from 'react'
import type { AppMode, BingoGrid } from '../types'
import { CELL_COUNT } from '../constants'
import f1Logo from '../assets/f1.svg'

interface HeaderProps {
  mode: AppMode
  isSharedPreview: boolean
  onToggleMode: () => void
  onShare: () => void
  onExport: () => void
  onImport: (cells: BingoGrid) => void
}

function isValidGrid(data: unknown): data is BingoGrid {
  if (!Array.isArray(data) || data.length !== CELL_COUNT) return false
  return (data as unknown[]).every((c) => {
    if (typeof c !== 'object' || c === null) return false
    const cell = c as Record<string, unknown>
    return (
      typeof cell.id === 'number' &&
      typeof cell.text === 'string' &&
      (cell.image === undefined || typeof cell.image === 'string') &&
      typeof cell.marked === 'boolean'
    )
  })
}

export function Header({ mode, isSharedPreview, onToggleMode, onShare, onExport, onImport }: HeaderProps) {
  const [copied, setCopied] = useState(false)

  function handleShare() {
    onShare()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const result = reader.result
      if (typeof result !== 'string') return
      try {
        const parsed: unknown = JSON.parse(result)
        console.log(parsed);
        console.log(isValidGrid(parsed));
        
        if (isValidGrid(parsed)) onImport(parsed)
      } catch {
        void 0
      }
    })
    reader.readAsText(file)
  }

  return (
    <header className="header">
      <h1 className="header__title">
        <img src={f1Logo} className="header__logo" alt="F1" />
        <span className="header__title-bingo">BINGO</span> 2026
      </h1>
      {!isSharedPreview && (
        <div className="header__actions">
          <button className="btn btn--outline" onClick={onToggleMode}>
            {mode === 'edit' ? 'PLAY MODE' : 'EDIT MODE'}
          </button>
          <button className="btn btn--primary" onClick={handleShare}>
            {copied ? 'LINK COPIED' : 'SHARE CARD'}
          </button>
          <button className="btn btn--outline" onClick={onExport}>
            EXPORT
          </button>
          <label htmlFor="header-import-input" className="btn btn--outline">
            IMPORT
          </label>
          <input
            id="header-import-input"
            type="file"
            accept="application/json,.json"
            className="header__file-input"
            onChange={handleFileChange}
          />
        </div>
      )}
    </header>
  )
}
