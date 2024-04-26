import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// :: 게임 중인 방 내 유저 정보 리스트
interface onGameUserInfo {
	userNickname: string
	userCoordX: number
	userCoordY: number
	userTeam: '' | 'red' | 'blue'
	winRate: number
	escapeHistory: number
	winCnt: number
}

interface GameRoomState {
	gameUserList: onGameUserInfo[] | null
	setGameUserList: (users: onGameUserInfo[] | null) => void
}

export const useGameRoomStore = create<GameRoomState>()(
	devtools(
		immer((set) => ({
			gameUserList: [], // initial state
			setGameUserList: (users: onGameUserInfo[] | null) =>
				set((state: GameRoomState) => {
					state.gameUserList = users
				}),
		})),
		{ name: 'RoomStore' } // This name will appear in Redux DevTools
	)
)
