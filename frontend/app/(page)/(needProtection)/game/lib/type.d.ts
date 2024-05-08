import { teamEnum } from './store'

// 퀴즈 정답자
export interface IWonUser {
  nickname: string
  team: teamEnum
  userId: number
  rank: number
  time: number
}

// 팀 정보 props
export interface ITeamInfoProps {
  teamName: string
  teamColor: teamEnum
  userList: IUserInfo[]
  handleOutUser: (userId: number) => void
}

// 게임방 내 유저 정보
export interface IUserInfo {
  nickname: string
  userId: number
  position: {
    x: number
    y: number
    z: number
  }
  team: teamEnum
  score: number
  moveState?: playerMoveStateEnum.IDLE
  characterType?: number
  direction?: 'right'
}

// 캐릭터 선택 타입
export interface ICarouselItemProp {
  modelPath: string
  position: [number, number, number]
  index: number
  rotation: number
}

// 캐릭터 선택 캐러셀 타입
export interface ICarouselProp {
  numItems?: number
  radius?: number
  rotation: number
}
