import { IRoomInfo } from '../../lobby/lib/type'
import { IGameResult, IGameScore, IQuiz, IUserInfo, IUserRoundResult } from './type'

// :: 게임 상태
export enum gameStateEnum {
  READY = 'READY',
  COUNTDOWN = 'COUNTDOWN',
  GAME = 'GAME',
  DONE = 'DONE',
}

// :: 플레이어 액션 종류
export enum playerMoveStateEnum {
  IDLE = 'Idle',
  RUN = 'Run',
  JUMP = 'Jump',
}

// :: 팀 종류
export enum teamEnum {
  NONE = 'NONE',
  RED = 'RED',
  BLUE = 'BLUE',
}

// :: 정답 선택 종류
export enum AnswerEnum {
  A = 'A',
  C = 'C',
  D = 'D',
  B = 'B',
  NONE = 'none', // none -> N으로 수정하기
}

// ------------------------------------------------

// :: 게임 중인 방 내 유저 정보 리스트
export interface IOnGameUserInfo {
  userNickname: string
  userCoordX: number
  userCoordY: number
  userTeam: '' | 'red' | 'blue'
  winRate: number
  escapeHistory: number
  winCnt: number
}

export interface IGameRoomState {
  isRoomOwner: boolean
  setIsRoomOwner: (isRoomOwner: boolean) => void
  gameUserList: IUserInfo[] | null
  setGameUserList: (users: IUserInfo[] | null) => void
  gameState: gameStateEnum
  startGame: () => void
  countdownGame: () => void
  roomInfo: IRoomInfo
  setRoomInfo: (roomInfo: IRoomInfo) => void
}

export interface IPlayerState {
  playerMoveState: playerMoveStateEnum
  setPlayerMoveState: (state: playerMoveStateEnum) => void
  playerTeamState: teamEnum
  setPlayerTeamState: (state: teamEnum) => void
}

// :: 모달 상태
export interface IModalState {
  isModalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
}

// :: 캐릭터 선택 상태
export interface ICharacterSelectState {
  characterIndex: number
  setCharacterIndex: (character: number) => void
}

// :: TeamSetBoard 확장/축소 상태
export interface ITeamSetBoardState {
  isTeamSetBoardOpen: boolean
  setTeamSetBoardOpen: (isOpen: boolean) => void
}

// :: 정답 선택 상태
export interface IAnswerState {
  selectAnswer: AnswerEnum
  setSelectAnswer: (selectAnswer: AnswerEnum) => void
}

export interface IQuizState {
  quiz: IQuiz
  setQuiz: (quiz: IQuiz) => void
}

export interface IGameScoreState {
  gameScore: IGameScore | null
  setGameScore: (gameScore: IGameScore) => void
}

export interface IGameResultState {
  gameResult: IGameResult | null
  setGameResult: (gameResult: IGameResult) => void
}

export interface IRoundResultState {
  answer: AnswerEnum | null
  roundResults: IUserRoundResult[] | null
  setAnswer: (answer: AnswerEnum | null) => void
  setRoundResults: (gameResults: IUserRoundResult[]) => void
}