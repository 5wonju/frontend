import { Dispatch } from 'react'

type ProblemCategoryType = '개발' | '과학' | '컴퓨터' | '한국사' | '근현대사'

interface IRoomInfo {
  roomId: number | null
  roomTitle: string | null
  roomPW: string | null
  probCategory: ProblemCategoryType[]
  roomMode: gameMode
  maxUserNum: number
  probNum: number
}

interface RoomListResponse {
  msg: string
  data: {
    roomList: Room[]
  }
}

type gameMode = 'BASIC' | 'YOOT'

interface IRoomOfLobby {
  roomTitle: string | null
  roomOwnerName: string | null
  roomCurUserNum: number | null
  roomMaxUserNum: number
  roomId: number | null
  isGameStart: boolean | null
  isRoomFull: boolean | null
  probCategory: ProblemCategoryType[]
  hasPassword: boolean | null
  roomPW: string | null
  curRound: number | null
  totalRound: number
  roomMode: gameMode
}

interface RoomEditProps {
  roomInfo: IRoomInfo
  setRoomInfo: React.Dispatch<React.SetStateAction<IRoomInfo>>
}
