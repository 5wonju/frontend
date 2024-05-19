import { usePathname, useRouter } from 'next/navigation'
import {
  useGameResultStore,
  useGameRoomStore,
  useGameScoreStore,
  useQuizStore,
  useRoundResultStore,
} from '../(page)/(needProtection)/game/lib/store'
import { useWaitingRoomStore } from '../(page)/(needProtection)/lobby/lib/store'
import {
  IGameResult,
  IGameScore,
  IQuiz,
  IUserInfo,
  IUserRoundResult,
} from '../(page)/(needProtection)/game/lib/type'
import { IRoomInfo, IRoomOfLobby } from '../(page)/(needProtection)/lobby/lib/type'
import { SOCKET_RES_CODE } from '../lib/type.d'
import { useEffect } from 'react'
import { IChat, useChatLogsStore } from '../lib/store'
import { setUserScores } from '../lib/util'
import { IOtherStatus } from '../(page)/(needProtection)/game/component/OtherPlayers'
import {
  AnswerEnum,
  playerMoveStateEnum,
  teamEnum,
} from '../(page)/(needProtection)/game/lib/store-type'
import { ContactShadows } from '@react-three/drei'

// 채팅 관련 소켓 셋팅
// - 대기방 + 게임방 공통으로 사용
const useSetUpChat = () => {
  const { addChatLogs } = useChatLogsStore()

  const successReceiveChat = (message: string | IChat) => {
    console.log('Received message:', message)

    if (typeof message === 'string') {
      message = {
        nickname: '닉네임 null',
        message: message,
        timestamp: '시간 null',
      }

      addChatLogs(message)
    } else {
      addChatLogs(message)
    }
  }

  return { successReceiveChat }
}

// 대기방 관련 소켓 셋팅
const useSetUpRoom = (socket: WebSocket | null) => {
  const { successReceiveChat } = useSetUpChat()
  const { setRoomList } = useWaitingRoomStore()
  const { setGameUserList, setRoomInfo } = useGameRoomStore((state) => ({
    setGameUserList: state.setGameUserList,
    setRoomInfo: state.setRoomInfo,
    gameUserList: state.gameUserList,
  }))

  const router = useRouter()

  // :: Handler Functions
  // Todo : 게임 입장 시 url에 roomId를 반영할지 말지 결정하고 추후 반영
  const successCreateRoom = (roomInfo: IRoomInfo) => {
    router.push(`/game`)
    setRoomInfo(roomInfo)
    // router.push(`/game/${roomId}`)
  }

  const successGetRoomList = (rooms: IRoomOfLobby[]) => {
    console.log('Received rooms:', rooms)
    setRoomList(rooms)
  }

  // Todo : 게임 입장 시 url에 roomId를 반영할지 말지 결정하고 추후 반영
  const successEnterRoom = (userList: IUserInfo[]) => {
    setGameUserList(userList)
    router.push(`/game`)
    // router.push(`/game/${room.roomId}`)
  }

  const setUpRoom = () => {
    if (socket === null || socket.readyState !== WebSocket.OPEN) {
      console.log('Socket is null or not connected.')
      return
    }

    socket.onmessage = (event) => {
      let responseData = undefined
      let eventType = undefined

      // Todo : 채팅 부분 응답 변경되면 try-catch 제거
      try {
        responseData = JSON.parse(event.data)
        eventType = parseInt(responseData.code)
      } catch (error) {
        responseData = event.data
        eventType = SOCKET_RES_CODE.CHATTING
        // console.log('socket 응답 데이터를 확인하세요.', error)
      }
      // const { eventType, data } = JSON.parse(event.data)

      switch (eventType) {
        case SOCKET_RES_CODE.CHATTING:
          console.log('채팅 수신 응답')
          successReceiveChat(event.data)
          break
        case SOCKET_RES_CODE.GET_ROOM_LIST:
          console.log('방 목록 조회 응답')
          successGetRoomList(responseData.data.roomList)
          break
        case SOCKET_RES_CODE.CREATE_ROOM:
          console.log('방 생성 성공 응답', responseData.data)
          successCreateRoom(responseData.data)
          break
        case SOCKET_RES_CODE.ENTER_ROOM_OWNER:
          console.log('방 입장 성공시 받아오는 데이터', responseData.data)
          successEnterRoom(responseData.data.userList)
          break

        default:
          console.log('이벤트 코드가 없습니다. 현재는 채팅에 대한 이벤트 코드가 없습니다.')
          console.log(responseData)
          break
      }
    }
  }
  return { setUpRoom }
}

// 게임방 관련 소켓 셋팅
const useSetUpGame = (socket: WebSocket | null) => {
  // const { setRoomInfo, gameUserList, setGameUserList, countdownGame, startGame } =
  //   useGameRoomStore()
  const { setRoomInfo } = useGameRoomStore((state) => ({ setRoomInfo: state.setRoomInfo }))
  const { gameUserList } = useGameRoomStore((state) => ({ gameUserList: state.gameUserList }))
  const { setGameUserList } = useGameRoomStore((state) => ({
    setGameUserList: state.setGameUserList,
  }))
  const { countdownGame } = useGameRoomStore((state) => ({ countdownGame: state.countdownGame }))
  const { startGame } = useGameRoomStore((state) => ({ startGame: state.startGame }))

  const { successReceiveChat } = useSetUpChat()
  const { setQuiz } = useQuizStore()
  const { setGameScore } = useGameScoreStore()
  const { setGameResult } = useGameResultStore()
  const { setAnswer, setRoundResults } = useRoundResultStore((state) => ({
    setAnswer: state.setAnswer,
    setRoundResults: state.setRoundResults,
  }))
  const router = useRouter()

  const successOtherUserMove = (otherStatus: {
    nickname: string
    position: { x: number; y: number; z: number }
    linvel: { x: number; y: number; z: number }
    moveState: playerMoveStateEnum
    characterType: number
    team: teamEnum
    direction: string
  }) => {
    if (!gameUserList || gameUserList.length === 0) return

    const newUserList = gameUserList.map((user: IUserInfo) => {
      return user.userNickname === otherStatus.nickname
        ? ({
            ...user,
            position: otherStatus.position,
            linvel: otherStatus.linvel,
            moveState: otherStatus.moveState,
            characterType: otherStatus.characterType,
            team: otherStatus.team ?? teamEnum.NONE,
            direction: otherStatus.direction,
          } as IUserInfo)
        : user
    })

    // console.log('newUserList after move: ', newUserList)
    setGameUserList(newUserList)
  }

  const successUpdateRoomInfo = (roomInfo: IRoomOfLobby) => {
    console.log('방 정보 업데이트 성공 응답', roomInfo)
    setRoomInfo({
      roomId: roomInfo.roomId,
      roomTitle: roomInfo.roomTitle,
      roomPW: roomInfo.roomPW,
      probCategory: roomInfo.probCategory,
      roomMode: roomInfo.roomMode,
      maxUserNum: roomInfo.roomMaxUserNum,
      probNum: roomInfo.totalRound,
    })
  }

  const successNextQuestion = (quiz: IQuiz) => {
    console.log('다음 문제 출제 성공')
    setQuiz(quiz)
    startGame()
  }

  const successStartGame = () => {
    console.log('게임 시작 성공')

    if (gameUserList === null) return
    const redTeams = setUserScores(gameUserList.filter((user) => user.team === teamEnum.RED))
    const blueTeams = setUserScores(gameUserList.filter((user) => user.team === teamEnum.BLUE))

    // 게임 시작 시
    // 1. 유저 스코어 초기화
    setGameScore({
      redTeamPoint: 0,
      blueTeamPoint: 0,
      redTeamUsers: redTeams,
      blueTeamUsers: blueTeams,
    })

    // 2. 게임 상태 변경
    countdownGame()
  }

  const successGetTeamPoint = (gameScore: IGameScore) => {
    console.log('현재 팀 별 총 점수와 개인 점수 응답', gameScore)
    setGameScore(gameScore)
    countdownGame()
    // setTimeout(() => {
    //   countdownGame()
    // }, 3000)
  }

  const successGameResultInfo = (gameResult: IGameResult) => {
    console.log('게임 결과 응답')
    setGameResult(gameResult)
  }

  const successOtherUserExit = (newUserList: IUserInfo[]) => {
    console.log('다른 유저 방 나갔음 응답')
    setGameUserList(newUserList)
  }

  const successQuizAnswerRank = (data: { answer: AnswerEnum; userRank: IUserRoundResult[] }) => {
    console.log('매 라운드 퀴즈 정답 및 정답자 순위 발표', data.userRank)
    setAnswer(data.answer)
    setRoundResults(data.userRank)
  }

  const successEnterRoom = (userList: IUserInfo[]) => {
    // console.log('유저 리스트 정보 업데이트 newUserList: ', userList)
    setGameUserList(userList)
  }

  const setUpGame = () => {
    if (socket === null || socket.readyState !== WebSocket.OPEN) {
      console.log('Socket is null or not connected.')
      return
    }

    socket.onmessage = (event) => {
      // Todo : 채팅 부분 응답 변경되면 try-catch 제거
      const responseData = JSON.parse(event.data)
      const eventType = parseInt(responseData.code)

      switch (eventType) {
        case SOCKET_RES_CODE.CHATTING:
          console.log('채팅 수신 응답')
          successReceiveChat(event.data)
          break
        case SOCKET_RES_CODE.ENTER_ROOM_OWNER:
          successEnterRoom(responseData.data.userList)
          console.log('유저 입장 성공 응답')
          break
        case SOCKET_RES_CODE.TEAM_SELECT_OWNER:
          console.log('팀 선택 성공 응답')
          break
        case SOCKET_RES_CODE.UPDATE_ROOM_INFO_OWNER:
        case SOCKET_RES_CODE.UPDATE_ROOM_INFO_OTHER:
          console.log('방 정보 업데이트 성공 응답', responseData.data)
          successUpdateRoomInfo(responseData.data)
          break
        case SOCKET_RES_CODE.NEXT_QUESTION:
          console.log('다음 문제 출제 응답', responseData.data)
          successNextQuestion(responseData.data)
          break
        case SOCKET_RES_CODE.START_GAME:
          console.log('게임 시작 응답')
          successStartGame()
          break
        case SOCKET_RES_CODE.ONE_PROBLEM_END_GET_TEAM_POINT:
          console.log('현재 팀 별 총 점수와 개인 점수 응답')
          successGetTeamPoint(responseData.data)
          break
        case SOCKET_RES_CODE.GAME_RESULT_INFO:
          console.log('게임 결과 응답')
          successGameResultInfo(responseData.data)
          break
        case SOCKET_RES_CODE.EXIT_ROOM_OWNER:
          console.log('방 나가기 성공 응답')
          router.push('/lobby')
          break
        case SOCKET_RES_CODE.EXIT_ROOM_OTHER:
          console.log('다른 유저 방 나갔음 응답')
          successOtherUserExit(responseData.data.userList)
          break
        case SOCKET_RES_CODE.ANSWER_TOP:
          console.log('매 라운드 퀴즈 정답 및 정답자 순위 발표', responseData.data)
          successQuizAnswerRank(responseData.data)
          break
        case SOCKET_RES_CODE.MOVE_CHARACTER:
          // console.log('유저 이동', responseData.data)
          successOtherUserMove(responseData.data)
          break
        default:
          console.log('이벤트 코드가 없습니다. 게임 소켓')
          console.log(responseData)
          break
      }
    }
  }
  return { setUpGame }
}

// 페이지별 소켓 셋팅***
const useSetupSocket = (socket: WebSocket | null) => {
  const currentPath = usePathname()
  const { gameUserList } = useGameRoomStore((state) => ({ gameUserList: state.gameUserList }))
  const { setUpRoom } = useSetUpRoom(socket)
  const { setUpGame } = useSetUpGame(socket)

  // 소켓 수신 로직 셋팅
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (currentPath === '/lobby') {
        setUpRoom()
      } else if (currentPath === '/game') {
        setUpGame()
      }
    }
  }, [socket, currentPath, gameUserList])
}

export { useSetupSocket }
