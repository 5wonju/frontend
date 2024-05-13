// 타입 정보를 관리하는 파일
type onGameUserInfo = {
  userNickname: string
  userCoordX: number
  userCoordY: number
  userTeam: '' | 'red' | 'blue'
  winRate: number
  escapeHistory: number
  winCnt: number
}

export enum SOCKET_RES_CODE {
  CREATE_ROOM = 10, // "방 생성 성공",
  GET_ROOM_LIST = 20, // null,
  ENTER_ROOM_OWNER = 30, // "방 입장 성공",
  ENTER_ROOM_OTHER = 31, // "방에 다른 사람 입장",
  EXIT_ROOM_OWNER = 40, // "방 나가기 성공",
  EXIT_ROOM_OTHER = 41, // "방 유저 퇴장",
  QUICK_ENTER_ROOM = 50, // null,
  CHATTING = 60, // "메세지 수신 성공",
  TEAM_SELECT_OWNER = 70, // "팀 선택 성공",
  TEAM_SELECT_OTHER = 71, // "다른 사람 팀 선택 성공",
  UPDATE_ROOM_INFO_OWNER = 80, // null,
  UPDATE_ROOM_INFO_OTHER = 81, // null,
  START_GAME = 90, // "게임 시작 성공",
  RESPAWN_CHARACTER = 100, // null,
  MOVE_CHARACTER = 110, // "유저 이동",
  CHANGE_ZONE_OWNER = 120, // null,
  CHANGE_ZONE_OTHER = 121, // null,
  ANSWER_TOP = 130, // null,
  NEXT_QUESTION = 140, // "다음 문제 출제",
  GAME_RESULT_INFO = 150, // "게임 결과(우승팀 및 유저별 획득 포인트)",
  ONE_PROBLEM_END_GET_TEAM_POINT = 160, // "현재 팀 별 총 점수와 개인 점수 응답",
}
