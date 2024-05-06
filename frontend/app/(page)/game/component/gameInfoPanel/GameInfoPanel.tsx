import GameBoard from './GameBoard'
import QuizResult from './QuizResult'
import TeamInfo from './TeamInfo'

const GameInfoPanel = () => {
  return (
    <div className="h-[calc(100vh-3.5rem)] px-4 absolute top-10 left-0 right-0 grid grid-cols-6 gap-10">
      <TeamInfo />
      <GameBoard />
      <QuizResult />
    </div>
  )
}

export default GameInfoPanel
