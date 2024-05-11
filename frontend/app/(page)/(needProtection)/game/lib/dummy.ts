import { AnswerEnum, playerMoveStateEnum, teamEnum } from "./store-type"
import { IUserInfo, IWonUser } from "./type"


// 퀴즈 정답자 더미 데이터
export const wonUserList: IWonUser[] = [
  {
    nickname: 'user1s-3we',
    team: teamEnum.RED,
    userId: 1,
    rank: 1,
    time: 2.012,
  },
  {
    nickname: 'wnatdsoi',
    team: teamEnum.BLUE,
    userId: 2,
    rank: 2,
    time: 2.012,
  },
  {
    nickname: 'woosss',
    team: teamEnum.RED,
    userId: 3,
    rank: 3,
    time: 2.012,
  },
]

// 대기시 방 내부 유저 리스트 더미데이터
// export const userList: IUserInfo[] = [
//   {
//     userNickname: 'user1',
//     position: { x: 0, y: 0, z: 0 },
//     team: teamEnum.RED,
//     userScore: 0,
//     moveState: playerMoveStateEnum.IDLE,
//     characterType: 0,
//     direction: 'right',
//   },
//   {
//     userNickname: 'user2',
//     position: { x: 0, y: 0, z: 0 },
//     team: teamEnum.RED,
//     userScore: 0,
//   },
//   {
//     userNickname: 'user3',
//     position: { x: 0, y: 0, z: 0 },
//     team: teamEnum.BLUE,
//     userScore: 0,
//   },
//   {
//     userNickname: 'user4',
//     position: { x: 0, y: 0, z: 0 },
//     team: teamEnum.BLUE,
//     userScore: 120,
//   },
//   {
//     userNickname: 'user5',
//     position: { x: 0, y: 0, z: 0 },
//     team: teamEnum.NONE,
//     userScore: 0,
//   },
//   {
//     userNickname: 'user6',
//     position: { x: 0, y: 0, z: 0 },
//     team: teamEnum.BLUE,
//     userScore: 200,
//   },
//   {
//     userNickname: 'user7',
//     position: { x: 0, y: 0, z: 0 },
//     team: teamEnum.BLUE,
//     userScore: 0,
//   },
//   {
//     userNickname: 'user8',
//     position: { x: 0, y: 0, z: 0 },
//     team: teamEnum.RED,
//     userScore: 930,
//   },
//   {
//     userNickname: 'user9',
//     position: { x: 0, y: 0, z: 0 },
//     team: teamEnum.NONE,
//     userScore: 0,
//   },
//   {
//     userNickname: 'user10',
//     position: { x: 0, y: 0, z: 0 },
//     team: teamEnum.RED,
//     userScore: 10,
//   },
// ]

// 퀴즈 정답 리스트 더미 데이터
export const QuizAnswerList = [
  {
    answer: 'A',
    content: '신라',
  },
  {
    answer: 'B',
    content: '고구려',
  },
  {
    answer: 'C',
    content: '백제',
  },
  {
    answer: 'D',
    content: '조선',
  },
]