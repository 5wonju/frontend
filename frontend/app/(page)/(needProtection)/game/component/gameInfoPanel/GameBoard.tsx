import QuizContent from '../boardContent/QuizContent'

const GameBoard = () => {
  return (
    <div className="board col-span-4 mt-2 p-4 ring-2 ring-indigo-300 ring-offset-indigo-500 ring-offset-[6px]">
      <QuizContent />
    </div>
  )
}

export default GameBoard
