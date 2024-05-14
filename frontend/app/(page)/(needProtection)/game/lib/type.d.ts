import { teamEnum } from './store'

// 퀴즈 정답자
interface IWonUser {
  nickname: string
  team: teamEnum
  userId: number
  rank: number
  time: number
}

// 팀 정보 props
interface ITeamInfoProps {
  teamName: string
  teamColor: teamEnum
  userList: IUserInfo[] | null
  gameUserScore?: IUserScore[] | null
  handleOutUser: (userNickname: string) => void
  teamScore?: number
}

// 게임방 내 유저 정보
interface IUserInfo {
  userNickname: string
  position: {
    x: number
    y: number
    z: number
  }
  linvel: {
    x: number
    y: number
    z: number
  }
  team: teamEnum
  userScore: number
<<<<<<< HEAD
  moveState: playerMoveStateEnum.IDLE
  characterType: number
  direction: 'right'
  escapeHistory: number
  winRate: number
  winCnt: number
=======
  moveState?: playerMoveStateEnum.IDLE
  characterType?: number
  direction?: 'right'
  escapeHistory?: number
  winRate?: number
  winCnt?: number
  roomOwner: boolean
>>>>>>> 077bfa4d7a34dd6508c7cd29d913d6db8441d51b
}

// 캐릭터 선택 타입
interface ICarouselItemProp {
  modelPath: string
  position: [number, number, number]
  index: number
  rotation: number
}

// 캐릭터 선택 캐러셀 타입
interface ICarouselProp {
  numItems?: number
  radius?: number
  rotation: number
}

interface IQuiz {
  currentRound: number
  questionId: number | null
  question: string
  options: string[]
  timeLimit: number
}

interface IUserScore {
  nickname: string
  point: number
}

interface IGameScore {
  redTeamPoint: number
  blueTeamPoint: number
  redTeamUsers: IUserScore[]
  blueTeamUsers: IUserScore[]
}

interface IUserResult {
  userId: number
  username: string
  earnPoint: number
  amIMe: boolean
}

interface IGameResult {
  winTeam: teamEnum
  redTeamTotalPoint: number
  blueTeamTotalPoint: number
  redTeam: IUserResult[]
  blueTeam: IUserResult[]
}

interface TeamResultProps {
  team: teamEnum
  isWin: boolean
  teamPoint: number
  teamResult: IUserResult[]
}
