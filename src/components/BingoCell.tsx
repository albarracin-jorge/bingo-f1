import { useState, type DragEvent } from 'react'
import type { AppMode } from '../types'
import { resizeImageFile } from '../utils/image'

interface BingoCellProps {
  id: number
  text: string
  image: string
  marked: boolean
  winner: boolean
  mode: AppMode
  isSharedPreview: boolean
  onTextChange: (id: number, text: string) => void
  onImageChange: (id: number, image: string) => void
  onImageDelete: (id: number) => void
  onDelete: (id: number) => void
  onToggleMark: (id: number) => void
}

function ImagePreview({ src }: { src: string }) {
  return <img className="bingo-cell__image" src={src} alt="" draggable={false} />
}

export function BingoCell({
  id,
  text,
  image,
  marked,
  winner,
  mode,
  isSharedPreview,
  onTextChange,
  onImageChange,
  onImageDelete,
  onDelete,
  onToggleMark,
}: BingoCellProps) {
  const [dragging, setDragging] = useState(false)

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return
    const file = files[0]
    if (!file.type.startsWith('image/')) return
    try {
      const dataUrl = await resizeImageFile(file)
      onImageChange(id, dataUrl)
    } catch {
      void 0
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
  }

  async function handleDrop(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    await handleFiles(e.dataTransfer.files)
  }

  if (isSharedPreview) {
    const cls = [
      'bingo-cell',
      image ? 'bingo-cell--has-image' : '',
      marked ? 'bingo-cell--marked' : '',
      winner ? 'bingo-cell--winner' : '',
    ]
      .filter(Boolean)
      .join(' ')
    return (
      <div className={cls}>
        {image && <ImagePreview src={image} />}
        <span className={image ? 'bingo-cell__text-overlay' : ''}>{text}</span>
      </div>
    )
  }

  if (mode === 'edit') {
    return (
      <div
        className={`bingo-cell bingo-cell--edit ${dragging ? 'bingo-cell--dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <div className="bingo-cell__image-wrap">
            <ImagePreview src={image} />
            <button
              className="bingo-cell__image-delete"
              onClick={() => onImageDelete(id)}
              aria-label="Remove image"
            >
              X
            </button>
          </div>
        ) : (
          <label className="bingo-cell__drop-zone">
            <span className="bingo-cell__drop-hint">IMG</span>
            <input
              type="file"
              accept="image/*"
              className="bingo-cell__file-input"
              onChange={e => handleFiles(e.target.files)}
            />
          </label>
        )}
        <textarea
          className="bingo-cell__textarea"
          value={text}
          onChange={e => onTextChange(id, e.target.value)}
          placeholder="Add event..."
          maxLength={80}
        />
        {(text || image) && (
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
    image ? 'bingo-cell--has-image' : '',
    marked ? 'bingo-cell--marked' : '',
    winner ? 'bingo-cell--winner' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={cls} onClick={() => onToggleMark(id)}>
      {image && <ImagePreview src={image} />}
      <span className={image ? 'bingo-cell__text-overlay' : ''}>{text}</span>
    </button>
  )
}
