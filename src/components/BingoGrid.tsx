import type { BingoGrid as BingoGridType, AppMode } from '../types'
import { BingoCell } from './BingoCell'

interface BingoGridProps {
  cells: BingoGridType
  mode: AppMode
  winningCells: Set<number>
  isSharedPreview: boolean
  onTextChange: (id: number, text: string) => void
  onDelete: (id: number) => void
  onToggleMark: (id: number) => void
}

export function BingoGrid({
  cells,
  mode,
  winningCells,
  isSharedPreview,
  onTextChange,
  onDelete,
  onToggleMark,
}: BingoGridProps) {
  return (
    <div className="bingo-grid">
      {cells.map(cell => (
        <BingoCell
          key={cell.id}
          id={cell.id}
          text={cell.text}
          marked={cell.marked}
          winner={winningCells.has(cell.id)}
          mode={mode}
          isSharedPreview={isSharedPreview}
          onTextChange={onTextChange}
          onDelete={onDelete}
          onToggleMark={onToggleMark}
        />
      ))}
    </div>
  )
}
