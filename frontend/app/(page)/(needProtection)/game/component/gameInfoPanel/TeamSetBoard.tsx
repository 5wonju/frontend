import TeamInfo from './TeamInfo'
import { FaCaretDown } from 'react-icons/fa'
import { useGameRoomStore, useTeamSetBoardStore } from '../../lib/store'
import { teamEnum } from '../../lib/store-type'

const TeamSetBoard = () => {
  const teamScore = 0
  const { isTeamSetBoardOpen, setTeamSetBoardOpen } = useTeamSetBoardStore()
  const { gameUserList } = useGameRoomStore((state) => ({
    gameUserList: state.gameUserList,
  }))
  console.log(gameUserList)
  const toggleOpen = () => setTeamSetBoardOpen(!isTeamSetBoardOpen)

  const handleOutUser = (userNickname: string) => {
    alert(`유저 ${userNickname} 너 강퇴임`)
  }

  return (
    <div
      className={`board backdrop-blur-md col-span-1 flex flex-col items-start gap-3 p-4 select-none ${
        isTeamSetBoardOpen ? '' : 'invisible'
      }`}
    >
      <button onClick={toggleOpen} className="self-end absolute top-2 text-darkGray1">
        <FaCaretDown className="text-black size-5" />
      </button>
      <TeamInfo
        teamName="RED TEAM"
        teamColor={teamEnum.RED}
        userList={gameUserList}
        handleOutUser={handleOutUser}
        teamScore={teamScore}
      />
      <TeamInfo
        teamName="BLUE TEAM"
        teamColor={teamEnum.BLUE}
        userList={gameUserList}
        handleOutUser={handleOutUser}
        teamScore={teamScore}
      />
      <TeamInfo
        teamName="NONE TEAM"
        teamColor={teamEnum.NONE}
        userList={gameUserList}
        handleOutUser={handleOutUser}
        teamScore={teamScore}
      />
    </div>
  )
}

export default TeamSetBoard
