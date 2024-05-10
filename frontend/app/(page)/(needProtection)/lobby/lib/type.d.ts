interface WaitingRoom {
  roomTitle: string
  roomOwnerName: string
  roomCurUserNum: number
  roomMaxUserNum: number
  roomId: number
  isGameStart: boolean
  isRoomFull: boolean
  probCategory: '수학' | '과학' | '역사' | '국어' | '개발'
  hasPassword: boolean
  curRound: number
  totalRound: number
  roomMode: 'basic' | 'yoot'
}

type ProblemCategoryType = '수학' | '과학' | '역사' | '국어' | '개발'

interface ICreatedRoom {
  roomTitle: string
  roomPW: string
  probCategory: ProblemCategoryType[]
  maxUserNum: number
  roomMode: 'basic' | 'yoot'
  probNum: number
}

interface RoomListResponse {
  msg: string
  data: {
    roomList: Room[]
  }
}

export type gameCategory = '수학' | '과학' | '역사' | '국어' | '개발'
export type gameMode = 'basic' | 'yoot'

interface IRoom {
  roomTitle: string | null
  roomOwnerName: string | null
  roomCurUserNum: number | null
  roomMaxUserNum: number | null
  roomId: number | null
  isGameStart: boolean | null
  isRoomFull: boolean | null
  probCategory: gameCategory | null
  hasPassword: boolean | null
  roomPW?: string | null
  curRound: number | null
  totalRound: number | null
  roomMode: gameMode | null
}

interface IEditRoom {
  roomTitle: string
  roomPW: string
  probCategory: gameCategory
}
