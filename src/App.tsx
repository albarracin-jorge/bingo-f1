import './App.css'
import { useBingoCard } from './hooks/useBingoCard'
import { Header } from './components/Header'
import { BingoGrid } from './components/BingoGrid'
import { ShareBanner } from './components/ShareBanner'

function App() {
  const {
    cells,
    mode,
    winningCells,
    isSharedPreview,
    toggleMode,
    updateCellText,
    updateCellImage,
    deleteCellImage,
    deleteCell,
    toggleCellMarked,
    shareCard,
  } = useBingoCard()

  return (
    <>
      <Header
        mode={mode}
        isSharedPreview={isSharedPreview}
        onToggleMode={toggleMode}
        onShare={shareCard}
      />
      {isSharedPreview && <ShareBanner />}
      <BingoGrid
        cells={cells}
        mode={mode}
        winningCells={winningCells}
        isSharedPreview={isSharedPreview}
        onTextChange={updateCellText}
        onImageChange={updateCellImage}
        onImageDelete={deleteCellImage}
        onDelete={deleteCell}
        onToggleMark={toggleCellMarked}
      />
    </>
  )
}

export default App
