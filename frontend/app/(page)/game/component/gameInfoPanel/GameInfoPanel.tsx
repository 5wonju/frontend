import GameBoard from './GameBoard'
import QuizResult from './QuizResult'
import TeamSetBoard from './TeamSetBoard'

const GameInfoPanel = () => {
  return (
    <div className="h-1/3 px-4 absolute top-10 left-0 right-0 grid grid-cols-6 gap-10 items-start">
      <TeamSetBoard />
      <GameBoard />
      <QuizResult />
    </div>
  )
}

export default GameInfoPanel
