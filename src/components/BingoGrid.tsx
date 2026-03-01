import type { BingoGrid as BingoGridType, AppMode } from '../types'
import { BingoCell } from './BingoCell'

interface BingoGridProps {
  cells: BingoGridType
  mode: AppMode
  winningCells: Set<number>
  isSharedPreview: boolean
  onTextChange: (id: number, text: string) => void
  onImageChange: (id: number, image: string) => void
  onImageDelete: (id: number) => void
  onDelete: (id: number) => void
  onToggleMark: (id: number) => void
}

export function BingoGrid({
  cells,
  mode,
  winningCells,
  isSharedPreview,
  onTextChange,
  onImageChange,
  onImageDelete,
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
          image={cell.image}
          marked={cell.marked}
          winner={winningCells.has(cell.id)}
          mode={mode}
          isSharedPreview={isSharedPreview}
          onTextChange={onTextChange}
          onImageChange={onImageChange}
          onImageDelete={onImageDelete}
          onDelete={onDelete}
          onToggleMark={onToggleMark}
        />
      ))}
    </div>
  )
}
