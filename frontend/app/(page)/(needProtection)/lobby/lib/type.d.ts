export interface IWaitingRoom {
  roomTitle: string
  roomOwnerName: string
  roomCurUserNum: number
  roomMaxUserNum: number
  roomId: number
  isGameStart: boolean
  isRoomFull: boolean
  probCategory: ProblemCategoryType[]
  hasPassword: boolean
  curRound: number
  totalRound: number
  roomMode: gameMode
}

type ProblemCategoryType = '개발' | '과학' | '컴퓨터' | '한국사' | '근현대사'

interface ICreatedRoom {
  roomTitle: string
  roomPW: string
  probCategory: ProblemCategoryType[]
  maxUserNum: number
  roomMode: 'BASIC' | 'YOOT'
  probNum: number
}

interface RoomListResponse {
  msg: string
  data: {
    roomList: Room[]
  }
}

export type gameMode = 'BASIC' | 'YOOT'

interface IRoom {
  roomTitle: string | null
  roomOwnerName: string | null
  roomCurUserNum: number | null
  roomMaxUserNum: number | null
  roomId: number | null
  isGameStart: boolean | null
  isRoomFull: boolean | null
  probCategory: ProblemCategoryType[] | null
  hasPassword: boolean | null
  roomPW?: string | null
  curRound: number | null
  totalRound: number | null
  roomMode: gameMode | null
}

interface IEditRoom {
  roomTitle: string
  roomPW: string
  probCategory: ProblemCategoryType[]
  roomMode: gameMode
  maxUserNum: number
  probNum: number
}
