import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import {
  AnswerEnum,
  gameStateEnum,
  IAnswerState,
  ICharacterSelectState,
  IGameRoomState,
  IModalState,
  IOnGameUserInfo,
  IPlayerState,
  ITeamSetBoardState,
  playerMoveStateEnum,
  teamEnum,
} from './store-type'
import { IUserInfo } from './type'


// :: RoomStore
export const useGameRoomStore = create<IGameRoomState>()(
  devtools(
    immer((set) => ({
      // room 내 유저 정보 리스트
      gameUserList: [], // initial state
      setGameUserList: (users: IUserInfo[] | null) =>
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

// :: PlayerStore
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

// :: 모달 상태
export const useModalStore = create<IModalState>()(
  devtools(
    immer((set) => ({
      isModalOpen: false,
      setModalOpen: (isOpen: boolean) =>
        set((state: IModalState) => {
          state.isModalOpen = isOpen
        }),
    })),
    { name: 'ModalStore' }
  )
)

// :: 캐릭터 선택 상태
export const useCharacterSelectStore = create<ICharacterSelectState>()(
  devtools(
    immer((set) => ({
      characterIndex: 0,

      setCharacterIndex: (character: number) =>
        set((state: ICharacterSelectState) => {
          console.log('selected characterIndex:', character)
          state.characterIndex = character
        }),
    })),
    { name: 'CharacterSelectStore' }
  )
)

// :: TeamSetBoard 확장/축소 상태
export const useTeamSetBoardStore = create<ITeamSetBoardState>()(
  devtools(
    immer((set) => ({
      isTeamSetBoardOpen: true,
      setTeamSetBoardOpen: (isOpen: boolean) =>
        set((state: ITeamSetBoardState) => {
          state.isTeamSetBoardOpen = isOpen
        }),
    })),
    { name: 'TeamSetBoardStore' }
  )
)

// :: 정답 선택 상태 (어떤 보기를 선택했는지)
export const useAnswerSelectStore = create<IAnswerState>()(
  devtools(
    immer((set) => ({
      selectAnswer: AnswerEnum.NONE,
      setSelectAnswer: (selectAnswer: AnswerEnum) =>
        set((state) => {
          state.selectAnswer = selectAnswer
        }),
    })),
    { name: 'AnswerSelectStore' }
  )
)
