import TeamInfo from './TeamInfo'
import { FaCaretDown } from 'react-icons/fa'
import { useTeamSetBoardStore } from '../../lib/store'
import { userList } from '../../lib/dummy'
import { teamEnum } from '../../lib/store-type'

const TeamSetBoard = () => {
  const { isTeamSetBoardOpen, setTeamSetBoardOpen } = useTeamSetBoardStore()

  const toggleOpen = () => setTeamSetBoardOpen(!isTeamSetBoardOpen)

  const handleOutUser = (userId: number) => {
    alert(`유저 ${userId} 너 강퇴임`)
  }

  return (
    <div
      className={`board col-span-1 flex flex-col items-start gap-3 p-4 select-none ${
        isTeamSetBoardOpen ? '' : 'invisible'
      }`}
    >
      <button onClick={toggleOpen} className="self-end absolute top-2 text-darkGray1">
        <FaCaretDown className="text-black size-5" />
      </button>
      <TeamInfo
        teamName="RED TEAM"
        teamColor={teamEnum.RED}
        userList={userList}
        handleOutUser={handleOutUser}
      />
      <TeamInfo
        teamName="BLUE TEAM"
        teamColor={teamEnum.BLUE}
        userList={userList}
        handleOutUser={handleOutUser}
      />
      <TeamInfo
        teamName="NONE TEAM"
        teamColor={teamEnum.NONE}
        userList={userList}
        handleOutUser={handleOutUser}
      />
    </div>
  )
}

export default TeamSetBoard
