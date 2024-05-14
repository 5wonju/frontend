import TeamInfo from './TeamInfo'
import { FaCaretDown } from 'react-icons/fa'
import { useGameRoomStore, useGameScoreStore, useTeamSetBoardStore } from '../../lib/store'
import { teamEnum } from '../../lib/store-type'

const TeamSetBoard = () => {
  const { isTeamSetBoardOpen, setTeamSetBoardOpen } = useTeamSetBoardStore()
  const { gameUserList } = useGameRoomStore((state) => ({
    gameUserList: state.gameUserList,
  }))
  const { gameScore } = useGameScoreStore()
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
      {/* 접기 버튼 */}
      <button onClick={toggleOpen} className="self-end absolute top-2 text-darkGray1">
        <FaCaretDown className="text-black size-5" />
      </button>
      {/* RED 팀 */}
      <TeamInfo
        teamName="RED TEAM"
        teamColor={teamEnum.RED}
        userList={gameUserList}
        gameUserScore={gameScore?.redTeamUsers ?? null}
        handleOutUser={handleOutUser}
        teamScore={gameScore?.redTeamPoint}
      />
      {/* BLUE 팀 */}
      <TeamInfo
        teamName="BLUE TEAM"
        teamColor={teamEnum.BLUE}
        userList={gameUserList}
        gameUserScore={gameScore?.blueTeamUsers ?? null}
        handleOutUser={handleOutUser}
        teamScore={gameScore?.blueTeamPoint}
      />
      {/* NO 팀 */}
      <TeamInfo
        teamName="NONE TEAM"
        teamColor={teamEnum.NONE}
        userList={gameUserList}
        handleOutUser={handleOutUser}
        teamScore={0}
      />
    </div>
  )
}

export default TeamSetBoard
