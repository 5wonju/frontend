import { usePathname, useRouter } from 'next/navigation'
import {
  useGameResultStore,
  useGameRoomStore,
  useGameScoreStore,
  useQuizStore,
} from '../(page)/(needProtection)/game/lib/store'
import { useWaitingRoomStore } from '../(page)/(needProtection)/lobby/lib/store'
import { IGameResult, IGameScore, IQuiz, IUserInfo } from '../(page)/(needProtection)/game/lib/type'
import { IRoomInfo, IRoomOfLobby } from '../(page)/(needProtection)/lobby/lib/type'
import { SOCKET_RES_CODE } from '../lib/type.d'
import { useEffect } from 'react'
import { IChat, useChatLogsStore } from '../lib/store'
import { setUserScores } from '../lib/util'
import { gameStateEnum } from '../(page)/(needProtection)/game/lib/store-type'

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
          console.log('방 생성 성공 응답')
          successCreateRoom(responseData.data.roomId)
          break
        case SOCKET_RES_CODE.ENTER_ROOM_OWNER:
          console.log('방 입장 성공 응답')
          console.log('방 입장 성공시 받아오는 데이터', responseData.data)
          successEnterRoom(responseData.data.userList)
          break

        default:
          console.log('이벤트 코드가 없습니다. 현재는 채팅에 대한 이벤트 코드가 없습니다.')
          break
      }
    }
  }
  return { setUpRoom }
}

// 게임방 관련 소켓 셋팅
const useSetUpGame = (socket: WebSocket | null) => {
  const { setRoomInfo, gameUserList, setGameUserList, setGameState } = useGameRoomStore(
    (state) => ({
      setGameUserList: state.setGameUserList,
      setRoomInfo: state.setRoomInfo,
      gameUserList: state.gameUserList,
      setGameState: state.setGameState,
    })
  )
  const { successReceiveChat } = useSetUpChat()
  const { setQuiz } = useQuizStore()
  const { setGameScore } = useGameScoreStore()
  const { setGameResult } = useGameResultStore()
  const router = useRouter()

  const successUpdateRoomInfo = (roomInfo: IRoomOfLobby) => {
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
  }

  const successStartGame = () => {
    console.log('게임 시작 성공')

    if (gameUserList === null) return
    const redTeams = setUserScores(gameUserList.filter((user) => user.team === 'red'))
    const blueTeams = setUserScores(gameUserList.filter((user) => user.team === 'blue'))

    // 게임 시작 시
    // 1. 유저 스코어 초기화
    setGameScore({
      redTeamPoint: 0,
      blueTeamPoint: 0,
      redTeamUsers: redTeams,
      blueTeamUsers: blueTeams,
    })

    // 2. 게임 상태 변경
  }

  const successGetTeamPoint = (gameScore: IGameScore) => {
    console.log('현재 팀 별 총 점수와 개인 점수 응답')
    setGameScore(gameScore)
  }

  const successGameResultInfo = (gameResult: IGameResult) => {
    console.log('게임 결과 응답')
    setGameResult(gameResult)
  }

  const successOtherUserExit = (newUserList: IUserInfo[]) => {
    console.log('다른 유저 방 나갔음 응답')
    setGameUserList(newUserList)
  }

  // Todo: 자리 다시 랜덤 배치 필요(서버에서 새로운 자리를 받아오는지 확인해서 처리 필요)
  const successEndGame = () => {
    console.log('한 세트 게임이 종료됨')
    setGameScore(null)
    setGameState(gameStateEnum.READY)
  }

  const setUpGame = () => {
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
        console.log('socket 응답 데이터를 확인하세요.', error)
      }
      // const { eventType, data } = JSON.parse(event.data)

      switch (eventType) {
        case SOCKET_RES_CODE.CHATTING:
          console.log('채팅 수신 응답')
          successReceiveChat(event.data)
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
        case SOCKET_RES_CODE.ONE_PROBLEM_END_GET_TEAM_POINT:
          console.log('한 세트 게임이 종료됨')
          // Todo: 게임 종료 시 처리 작성 필요
          successEndGame()
          break
        default:
          console.log('이벤트 코드가 없습니다. 현재는 채팅에 대한 이벤트 코드가 없습니다.')
          break
      }
    }
  }
  return { setUpGame }
}

// 페이지별 소켓 셋팅***
const useSetupSocket = (socket: WebSocket | null) => {
  const currentPath = usePathname()
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
  }, [socket, currentPath])
}

export { useSetupSocket }
