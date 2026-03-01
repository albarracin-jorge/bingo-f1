import type { AppMode } from '../types'

interface BingoCellProps {
  id: number
  text: string
  marked: boolean
  winner: boolean
  mode: AppMode
  isSharedPreview: boolean
  onTextChange: (id: number, text: string) => void
  onDelete: (id: number) => void
  onToggleMark: (id: number) => void
}

export function BingoCell({
  id,
  text,
  marked,
  winner,
  mode,
  isSharedPreview,
  onTextChange,
  onDelete,
  onToggleMark,
}: BingoCellProps) {
  if (isSharedPreview) {
    const cls = [
      'bingo-cell',
      marked ? 'bingo-cell--marked' : '',
      winner ? 'bingo-cell--winner' : '',
    ]
      .filter(Boolean)
      .join(' ')
    return <div className={cls}><span>{text}</span></div>
  }

  if (mode === 'edit') {
    return (
      <div className="bingo-cell bingo-cell--edit">
        <textarea
          className="bingo-cell__textarea"
          value={text}
          onChange={e => onTextChange(id, e.target.value)}
          placeholder="Add event..."
          maxLength={80}
        />
        {text && (
          <button
            className="bingo-cell__delete"
            onClick={() => onDelete(id)}
            aria-label="Clear cell"
          >
            X
          </button>
        )}
      </div>
    )
  }

  const cls = [
    'bingo-cell',
    marked ? 'bingo-cell--marked' : '',
    winner ? 'bingo-cell--winner' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={cls} onClick={() => onToggleMark(id)}>
      <span>{text}</span>
    </button>
  )
}
