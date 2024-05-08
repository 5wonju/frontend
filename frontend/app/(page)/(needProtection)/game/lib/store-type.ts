// :: 게임 상태
export enum gameStateEnum {
  READY,
  GAME,
  DONE,
}

// :: 플레이어 액션 종류
export enum playerMoveStateEnum {
  IDLE = 'Idle',
  RUN = 'Run',
  JUMP = 'Jump',
}

// :: 팀 종류
export enum teamEnum {
  NONE = 'none',
  RED = 'red',
  BLUE = 'blue',
}

// :: 정답 선택 종류
export enum AnswerEnum {
  A,
  C,
  D,
  B,
  NONE,
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
  gameState: gameStateEnum
  gameUserList: IOnGameUserInfo[] | null
  setGameUserList: (users: IOnGameUserInfo[] | null) => void
  startGame: () => void
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
