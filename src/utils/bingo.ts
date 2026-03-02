const LINES: number[][] = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
]

export function getWinningCells(marked: boolean[]): Set<number> {
  const winners = new Set<number>()
  for (const line of LINES) {
    if (line.every(i => marked[i])) {
      for (const i of line) winners.add(i)
    }
  }
  return winners
}
