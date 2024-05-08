import { useGameRoomStore } from '../../lib/store'
import { gameStateEnum } from '../../lib/store-type'
import IntroductionContent from '../boardContent/IntroductionContent'
import QuizContent from '../boardContent/QuizContent'

const GameBoard = () => {
  const { gameState } = useGameRoomStore((state) => ({
    gameState: state.gameState,
  }))

  return (
    <div className="board col-span-4 mt-2 p-4 ring-2 ring-indigo-300 ring-offset-indigo-500 ring-offset-[6px]">
      {gameState === gameStateEnum.READY ? <IntroductionContent /> : <QuizContent />}
    </div>
  )
}

export default GameBoard
