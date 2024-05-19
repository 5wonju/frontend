import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import {
  AnswerEnum,
  gameStateEnum,
  IAnswerState,
  ICharacterSelectState,
  IGameResultState,
  IGameRoomState,
  IGameScoreState,
  IModalState,
  IPlayerState,
  IQuizState,
  IRespawnButtonState,
  IRoundResultState,
  ITeamSetBoardState,
  playerMoveStateEnum,
  teamEnum,
} from './store-type'
import { IQuiz, IUserInfo, IUserRoundResult } from './type'

// :: RoomStore
export const useGameRoomStore = create<IGameRoomState>()(
  devtools(
    immer((set) => ({
      // 내가 방장인지 여부
      isRoomOwner: false,
      setIsRoomOwner: (isRoomOwner: boolean) =>
        set((state: IGameRoomState) => {
          state.isRoomOwner = isRoomOwner
        }),

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
      countdownGame: () =>
        set((state: IGameRoomState) => {
          state.gameState = gameStateEnum.COUNTDOWN
        }),

      // 방 정보 상태
      roomInfo: {
        roomId: null,
        roomTitle: '',
        roomPW: '',
        probCategory: ['개발'],
        roomMode: 'BASIC',
        maxUserNum: 2,
        probNum: 10,
      },
      setRoomInfo: (roomInfo) =>
        set((state: IGameRoomState) => {
          state.roomInfo = roomInfo
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
      playerHandle: null,
      setPlayerHandle: (playerHandle: number) =>
        set({
          playerHandle,
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

// :: 현재 퀴즈 정보
export const useQuizStore = create<IQuizState>()(
  devtools(
    immer((set) => ({
      quiz: {
        currentRound: 0,
        questionId: null,
        question: '',
        options: [],
        timeLimit: 0,
        roomStatus: gameStateEnum.READY,
      },
      setQuiz: (quiz: IQuiz) =>
        set((state) => {
          state.quiz = quiz
        }),
    })),
    { name: 'QuizStore' }
  )
)

// :: 점수 정보
export const useGameScoreStore = create<IGameScoreState>()(
  devtools(
    immer((set) => ({
      gameScore: null,
      setGameScore: (gameScore) =>
        set((state) => {
          state.gameScore = gameScore
        }),
    })),
    { name: 'GameScoreStore' }
  )
)

// :: 게임 결과 (우승 팀 및 유저별 획득 포인트)
export const useGameResultStore = create<IGameResultState>()(
  devtools(
    immer((set) => ({
      gameResult: null,
      setGameResult: (gameResult) =>
        set((state) => {
          state.gameResult = gameResult
        }),
    })),
    { name: 'GameResultStore' }
  )
)

// :: 매 라운드 결과 (정답 팀, 정답자 순위, 정답 팀의 획득 포인트)
export const useRoundResultStore = create<IRoundResultState>()(
  devtools(
    immer((set) => ({
      answer: null,
      roundResults: null,
      setAnswer: (answer: AnswerEnum | null) =>
        set((state) => {
          state.answer = answer
        }),
      setRoundResults: (roundResults: IUserRoundResult[]) =>
        set((state) => {
          state.roundResults = roundResults
        }),
    })),
    { name: 'RoundResultStore' }
  )
)

// :: 리스폰 버튼 클릭 여부
export const useRespawnButtonStore = create<IRespawnButtonState>()(
  devtools(
    immer((set) => ({
      letRespawn: false,
      setRespawnButton: (letRespawn: boolean) =>
        set((state) => {
          state.letRespawn = letRespawn
        }),
    })),
    { name: 'RespawnButtonStore' }
  )
)
