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
