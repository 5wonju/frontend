import { useEffect } from 'react'
import { useGameRoomStore } from '../../lib/store'
import { gameStateEnum } from '../../lib/store-type'
import CountdownContent from '../boardContent/CountContent'
import IntroductionContent from '../boardContent/IntroductionContent'
import QuizContent from '../boardContent/QuizContent'

const GameBoard = () => {
  const { gameState, countdownGame } = useGameRoomStore((state) => ({
    gameState: state.gameState,
    countdownGame: state.countdownGame,
  }))

  // useEffect(() => {
  //   countdownGame()
  // }, [])

  const getCurrentContent = () => {
    switch (gameState) {
      case gameStateEnum.READY:
        return <IntroductionContent />
      case gameStateEnum.COUNTDOWN:
        return <CountdownContent />
      case gameStateEnum.GAME:
        return <QuizContent />
      // case gameStateEnum.DONE:
      //   return <GameEndContent />
    }
  }

  return (
    <div className="board flex items-center justify-center col-span-4 mt-2 p-4 ring-2 ring-indigo-300 ring-offset-indigo-500 ring-offset-[6px]">
      {getCurrentContent()}
    </div>
  )
}

export default GameBoard
