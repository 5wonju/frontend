import { useRouter } from 'next/navigation'
import React from 'react'

const ExitGameButton = () => {
  const router = useRouter()

  const handleExitGame = () => {
    router.push('/lobby')
  }

  return (
    <button onClick={handleExitGame} className="nav-btn">
      게임 나가기
    </button>
  )
}

export default ExitGameButton
