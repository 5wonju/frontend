import { Divide } from 'lucide-react'
import { useTeamSetBoardStore } from '../../lib/store'
import GameBoard from './GameBoard'
import QuizResult from './QuizResult'
import TeamSetBoard from './TeamSetBoard'
import { FaCaretDown } from 'react-icons/fa6'

const GameInfoPanel = () => {
  const { isTeamSetBoardOpen, setTeamSetBoardOpen } = useTeamSetBoardStore()
  return (
    <div className="h-1/4 px-10 absolute top-16 left-0 right-0 grid grid-cols-6 gap-6 items-start">
      {isTeamSetBoardOpen ? (
        <TeamSetBoard />
      ) : (
        <button onClick={() => setTeamSetBoardOpen(true)} className="w-full glass select-none flex justify-start items-center px-4 gap-5 text-black">
          <FaCaretDown className='-rotate-90 size-5'/>팀 정보 열기
        </button>
      )}
      <GameBoard />
      <QuizResult />
    </div>
  )
}

export default GameInfoPanel
