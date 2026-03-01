export type AppMode = 'edit' | 'play'

export interface BingoCell {
  id: number
  text: string
  marked: boolean
}

export type BingoGrid = BingoCell[]

export interface SharePayload {
  texts: string[]
  marked: boolean[]
}
