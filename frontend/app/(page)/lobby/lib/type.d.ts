interface WaitingRoom {
  roomTitle: string
  roomOwnerName: string
  roomCurUserNum: number
  roomMaxUserNum: number
  roomId: number
  isGameStart: boolean
  isRoomFull: boolean
  probCategory: '수학' | '과학' | '역사' | '국어' | '개발'
  isHavePW: boolean
  curRound: number
  totalRound: number
  roomMode: 'basic' | 'yoot'
}

type ProblemCategoryType = '수학' | '과학' | '역사' | '국어' | '개발'

interface ICreatedRoom {
  roomTitle: string
  roomPW: string
  probCategory: '수학' | '과학' | '역사' | '국어' | '개발'
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
