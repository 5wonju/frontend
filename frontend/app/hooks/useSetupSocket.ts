import { usePathname, useRouter } from 'next/navigation'
import { useGameRoomStore } from '../(page)/(needProtection)/game/lib/store'
import { useWaitingRoomStore } from '../(page)/(needProtection)/lobby/lib/store'
import { SOCKET_RES_CODE, onGameUserInfo } from '../lib/type.d'
import { useChatLogsStore } from '../(page)/(needProtection)/channel/lib/store'
import { useEffect } from 'react'

// 채팅 관련 소켓 셋팅
// - 대기방 + 게임방 공통으로 사용
const useSetUpChat = () => {
  const { addChatLogs } = useChatLogsStore()

  const successReceiveChat = (message: string) => {
    console.log('Received message:', message)
    addChatLogs(message)
  }

  return { successReceiveChat }
}

// 대기방 관련 소켓 셋팅
const useSetUpRoom = (socket: WebSocket | null) => {
  const { successReceiveChat } = useSetUpChat()
  const { setRoomList } = useWaitingRoomStore()
  const { setGameUserList } = useGameRoomStore()
  const router = useRouter()

  // :: Handler Functions
  // Todo : 게임 입장 시 url에 roomId를 반영할지 말지 결정하고 추후 반영
  const successCreateRoom = (roomId: number) => {
    router.push(`/game`)
    // router.push(`/game/${roomId}`)
  }

  const successGetRoomList = (rooms: WaitingRoom[]) => {
    console.log('Received rooms:', rooms)
    setRoomList(rooms)
  }

  // Todo : 게임 입장 시 url에 roomId를 반영할지 말지 결정하고 추후 반영
  const successEnterRoom = (userList: onGameUserInfo[]) => {
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
        console.log('socket 응답 데이터를 확인하세요.', error)
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
  const { successReceiveChat } = useSetUpChat()

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
        // 추가적인 이벤트 핸들러 등록..
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