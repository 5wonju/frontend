import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// :: 게임 상태
export enum gameStateEnum {
	READY,
	GAME,
	DONE,
}

export enum playerStateEnum {
	IDLE = 'Idle',
	RUN = 'Run',
}

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
	gameState: gameStateEnum
	gameUserList: onGameUserInfo[] | null
	setGameUserList: (users: onGameUserInfo[] | null) => void
	startGame: () => void
	playerState: playerStateEnum
	setPlayerState: (state: playerStateEnum) => void
}

export const useGameRoomStore = create<GameRoomState>()(
	devtools(
		immer((set) => ({
			// room 내 유저 정보 리스트
			gameUserList: [], // initial state
			setGameUserList: (users: onGameUserInfo[] | null) =>
				set((state: GameRoomState) => {
					state.gameUserList = users
				}),

			// game 상태
			gameState: gameStateEnum.READY,
			startGame: () =>
				set((state: GameRoomState) => {
					state.gameState = gameStateEnum.GAME
				}),

			// player 상태
			playerState: playerStateEnum.IDLE,
			setPlayerState: (playerState: playerStateEnum) =>
				set({
					playerState,
				}),
		})),
		{ name: 'RoomStore' } // This name will appear in Redux DevTools
	)
)
