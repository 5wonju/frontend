import { useGameRoomStore } from '@/app/(page)/(needProtection)/game/lib/store'
import { useGame } from '@/app/hooks/useSocket'
import React from 'react'

const ExitGameButton = () => {
  const { exitRoom } = useGame()
  const { gameState } = useGameRoomStore()

  const handleExitGame = () => {
    exitRoom()
  }

  return (
    <button onClick={handleExitGame} disabled={gameState !== 'READY'} className="nav-btn">
      게임 나가기
    </button>
  )
}

export default ExitGameButton
