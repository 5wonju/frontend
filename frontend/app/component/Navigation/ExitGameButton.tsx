import { useGame } from '@/app/hooks/useSocket'
import React from 'react'

const ExitGameButton = () => {
  const { exitRoom } = useGame()

  const handleExitGame = () => {
    exitRoom()
  }

  return (
    <button onClick={handleExitGame} className="nav-btn">
      게임 나가기
    </button>
  )
}

export default ExitGameButton
