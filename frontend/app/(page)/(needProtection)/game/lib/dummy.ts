import { playerMoveStateEnum, teamEnum } from "./store"
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
export const userList: IUserInfo[] = [
  {
    nickname: 'user1',
    userId: 1,
    position: { x: 0, y: 0, z: 0 },
    team: teamEnum.RED,
    score: 0,
    moveState: playerMoveStateEnum.IDLE,
    characterType: 0,
    direction: 'right',
  },
  {
    nickname: 'user2',
    userId: 2,
    position: { x: 0, y: 0, z: 0 },
    team: teamEnum.RED,
    score: 0,
  },
  {
    nickname: 'user3',
    userId: 3,
    position: { x: 0, y: 0, z: 0 },
    team: teamEnum.BLUE,
    score: 0,
  },
  {
    nickname: 'user4',
    userId: 4,
    position: { x: 0, y: 0, z: 0 },
    team: teamEnum.BLUE,
    score: 120,
  },
  {
    nickname: 'user5',
    userId: 5,
    position: { x: 0, y: 0, z: 0 },
    team: teamEnum.NONE,
    score: 0,
  },
  {
    nickname: 'user6',
    userId: 6,
    position: { x: 0, y: 0, z: 0 },
    team: teamEnum.BLUE,
    score: 200,
  },
  {
    nickname: 'user7',
    userId: 7,
    position: { x: 0, y: 0, z: 0 },
    team: teamEnum.BLUE,
    score: 0,
  },
  {
    nickname: 'user8',
    userId: 8,
    position: { x: 0, y: 0, z: 0 },
    team: teamEnum.RED,
    score: 930,
  },
  {
    nickname: 'user9',
    userId: 9,
    position: { x: 0, y: 0, z: 0 },
    team: teamEnum.NONE,
    score: 0,
  },
  {
    nickname: 'user10',
    userId: 10,
    position: { x: 0, y: 0, z: 0 },
    team: teamEnum.RED,
    score: 10,
  },
]

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