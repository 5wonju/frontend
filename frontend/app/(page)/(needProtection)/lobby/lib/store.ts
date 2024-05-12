import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { IRoomOfLobby } from './type'

// :: 대기방 리스트
interface WaitingRoomListState {
  roomList: IRoomOfLobby[]
  setRoomList: (roomList: IRoomOfLobby[]) => void
}

export const useWaitingRoomStore = create<WaitingRoomListState>()(
  devtools(
    immer((set) => ({
      roomList: [], // initial state
      setRoomList: (roomList: IRoomOfLobby[]) =>
        set((state: WaitingRoomListState) => {
          state.roomList = roomList
        }),
    })),
    { name: 'WaitingRoomStore' } // This name will appear in Redux DevTools
  )
)

// :: 현재방 정보
interface IRoomState {
  room: IRoomOfLobby
  setRoom: (room: IRoomOfLobby) => void
}

export const useCurrentRoomStore = create<IRoomState>()(
  devtools(
    immer((set) => ({
      room: {
        roomTitle: null,
        roomOwnerName: null,
        roomCurUserNum: null,
        roomMaxUserNum: 2,
        roomId: null,
        roomPW: null,
        isGameStart: null,
        isRoomFull: null,
        probCategory: ['개발'],
        hasPassword: null,
        curRound: null,
        totalRound: 10,
        roomMode: 'BASIC',
      },
      setRoom: (room: IRoomOfLobby) =>
        set((state: IRoomState) => {
          state.room = room
        }),
    })),
    { name: 'CurrentRoom' }
  )
)
