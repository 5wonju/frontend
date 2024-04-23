import create, { StateCreator, StoreApi } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface onGameUserInfo {
	userNickname: string
	userCoordX: number
	userCoordY: number
	userTeam: '' | 'red' | 'blue'
	winRate: number
	escapeHistory: number
	winCnt: number
}

interface RoomState {
	gameUserList: onGameUserInfo[] | null
	setGameUserList: (users: onGameUserInfo[] | null) => void
}

export const useRoomStore = create<RoomState>()(
	devtools(
		immer((set) => ({
			gameUserList: [], // initial state
			setGameUserList: (users: onGameUserInfo[] | null) =>
				set((state: RoomState) => {
					state.gameUserList = users
				}),
		})),
		{ name: 'RoomStore' } // This name will appear in Redux DevTools
	)
)
export default useRoomStore
