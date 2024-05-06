// 방 내부 유저 리스트
// - 유저 닉네임
// - 유저 초기 위치
// - 팀 정보 (default: null)
// - 점수 정보 (default: 0)

import { teamEnum } from '../../lib/store'
import TeamInfo from './TeamInfo'

export interface IUserInfo {
  nickname: string
  userId: number
  position: number[]
  team: teamEnum
  score: number
}

// 더미 데이터
const userList: IUserInfo[] = [
  {
    nickname: 'user1',
    userId: 1,
    position: [0, 0, 0],
    team: teamEnum.RED,
    score: 0,
  },
  {
    nickname: 'user2',
    userId: 2,
    position: [0, 0, 0],
    team: teamEnum.RED,
    score: 0,
  },
  {
    nickname: 'user3',
    userId: 3,
    position: [0, 0, 0],
    team: teamEnum.BLUE,
    score: 0,
  },
  {
    nickname: 'user4',
    userId: 4,
    position: [0, 0, 0],
    team: teamEnum.BLUE,
    score: 120,
  },
  {
    nickname: 'user5',
    userId: 5,
    position: [0, 0, 0],
    team: teamEnum.NONE,
    score: 0,
  },
  {
    nickname: 'user6',
    userId: 6,
    position: [0, 0, 0],
    team: teamEnum.BLUE,
    score: 200,
  },
  {
    nickname: 'user7',
    userId: 7,
    position: [0, 0, 0],
    team: teamEnum.BLUE,
    score: 0,
  },
  {
    nickname: 'user8',
    userId: 8,
    position: [0, 0, 0],
    team: teamEnum.RED,
    score: 930,
  },
  {
    nickname: 'user9',
    userId: 9,
    position: [0, 0, 0],
    team: teamEnum.NONE,
    score: 0,
  },
  {
    nickname: 'user10',
    userId: 10,
    position: [0, 0, 0],
    team: teamEnum.RED,
    score: 10,
  },
]
const TeamSetBoard = () => {
  const handleOutUser = (userId: number) => {
    alert(`유저 ${userId} 너 강퇴임`)
  }

  return (
    <div className="board flex flex-col items-start gap-3 p-4">
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
