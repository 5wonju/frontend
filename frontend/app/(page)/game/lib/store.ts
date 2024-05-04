import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// :: 게임 상태
export enum gameStateEnum {
	READY,
	GAME,
	DONE,
}

export enum playerMoveStateEnum {
	IDLE = 'Idle',
	RUN = 'FastRun',
	JUMP = 'Jump',
}

export enum teamEnum {
	NONE = 'none',
	RED = 'red',
	BLUE = 'blue',
}

// :: 게임 중인 방 내 유저 정보 리스트
interface IOnGameUserInfo {
	userNickname: string
	userCoordX: number
	userCoordY: number
	userTeam: '' | 'red' | 'blue'
	winRate: number
	escapeHistory: number
	winCnt: number
}

interface IGameRoomState {
	gameState: gameStateEnum
	gameUserList: IOnGameUserInfo[] | null
	setGameUserList: (users: IOnGameUserInfo[] | null) => void
	startGame: () => void
}

interface IPlayerState {
	playerMoveState: playerMoveStateEnum
	setPlayerMoveState: (state: playerMoveStateEnum) => void
	playerTeamState: teamEnum
	setPlayerTeamState: (state: teamEnum) => void
}

export const useGameRoomStore = create<IGameRoomState>()(
	devtools(
		immer((set) => ({
			// room 내 유저 정보 리스트
			gameUserList: [], // initial state
			setGameUserList: (users: IOnGameUserInfo[] | null) =>
				set((state: IGameRoomState) => {
					state.gameUserList = users
				}),

			// game 상태
			gameState: gameStateEnum.READY,
			startGame: () =>
				set((state: IGameRoomState) => {
					state.gameState = gameStateEnum.GAME
				}),
		})),
		{ name: 'RoomStore' } // This name will appear in Redux DevTools
	)
)

export const usePlayerStore = create<IPlayerState>()(
	devtools(
		immer((set) => ({
			// 플에이어 움직임 상태
			playerMoveState: playerMoveStateEnum.IDLE,
			setPlayerMoveState: (playerMoveState: playerMoveStateEnum) =>
				set({
					playerMoveState,
				}),

			// 플에이어 팀 정보
			playerTeamState: teamEnum.NONE,
			setPlayerTeamState: (playerTeamState: teamEnum) =>
				set({
					playerTeamState,
				}),
		})),
		{ name: 'PlayerStore' }
	)
)
