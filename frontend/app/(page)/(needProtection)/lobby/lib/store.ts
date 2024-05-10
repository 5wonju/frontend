import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// :: 대기방 리스트
interface WaitingRoomListState {
  roomList: WaitingRoom[]
  setRoomList: (roomList: WaitingRoom[]) => void
}

export const useWaitingRoomStore = create<WaitingRoomListState>()(
  devtools(
    immer((set) => ({
      roomList: [], // initial state
      setRoomList: (roomList: WaitingRoom[]) =>
        set((state: WaitingRoomListState) => {
          state.roomList = roomList
        }),
    })),
    { name: 'WaitingRoomStore' } // This name will appear in Redux DevTools
  )
)

// :: 현재방 정보
interface IRoomState {
  room: IRoom
  setRoom: (room: IRoom) => void
}

export const useCurrentRoomStore = create<IRoomState>()(
  devtools(
    immer((set) => ({
      room: {
        roomTitle: null,
        roomOwnerName: null,
        roomCurUserNum: null,
        roomMaxUserNum: null,
        roomId: null,
        isGameStart: null,
        isRoomFull: null,
        probCategory: null,
        isHavePW: null,
        curRound: null,
        totalRound: null,
        roomMode: null,
      },
      setRoom: (room: IRoom) =>
        set((state: IRoomState) => {
          state.room = room
        }),
    })),
    { name: 'CurrentRoom' }
  )
)
