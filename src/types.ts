export type AppMode = 'edit' | 'play'

export interface BingoCell {
  id: number
  text: string
  image: string
  marked: boolean
}

export type BingoGrid = BingoCell[]

export interface SharePayload {
  texts: string[]
  images: string[]
  marked: boolean[]
}
