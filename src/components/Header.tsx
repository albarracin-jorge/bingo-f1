import { useState } from 'react'
import type { AppMode } from '../types'

interface HeaderProps {
  mode: AppMode
  isSharedPreview: boolean
  onToggleMode: () => void
  onShare: () => void
}

export function Header({ mode, isSharedPreview, onToggleMode, onShare }: HeaderProps) {
  const [copied, setCopied] = useState(false)

  function handleShare() {
    onShare()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="header">
      <h1 className="header__title">
        F1 <span className="header__title-bingo">BINGO</span> 2026
      </h1>
      {!isSharedPreview && (
        <div className="header__actions">
          <button className="btn btn--outline" onClick={onToggleMode}>
            {mode === 'edit' ? 'PLAY MODE' : 'EDIT MODE'}
          </button>
          <button className="btn btn--primary" onClick={handleShare}>
            {copied ? 'LINK COPIED' : 'SHARE CARD'}
          </button>
        </div>
      )}
    </header>
  )
}
