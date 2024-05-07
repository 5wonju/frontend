import { useEffect } from 'react'
import { getSocketToken } from '../lib/api'
import { useChatSocketStore, useGameSocketStore } from '../lib/store'
import { SOCKET_RES_CODE, onGameUserInfo } from '../lib/type.d'
import { useRouter } from 'next/navigation'
import { useChatLogsStore, useMainSocketStore } from '../(page)/(needProtection)/channel/lib/store'
import { useWaitingRoomStore } from '../(page)/(needProtection)/lobby/lib/store'
import { useGameRoomStore } from '../(page)/(needProtection)/game/lib/store'

// :: Waiting Room
// 대기방과 관련된 처리를 담당하는 hook
export const useWaitingRoom = () => {
  const { socket } = useMainSocketStore()
  const { roomList } = useWaitingRoomStore()

  const createWaitingRoom = (roomInfo: ICreatedRoom) => {
    if (!socket) {
      alert('Socket이 비어있습니다.')
      return
    }
    console.log('createWaitingRoom:', roomInfo)
    socket.send(JSON.stringify({ eventType: 'CREATE_ROOM', data: roomInfo }))
  }

  // Todo : 서버랑 예기해서 소켓 연결 끊기는 문제 해결 필요.
  const getInitialRoomList = () => {
    if (!socket) {
      alert('Socket이 비어있습니다.')
      return
    }
    socket.send(
      JSON.stringify({
        eventType: 'GET_ROOM_LIST',
        data: {
          // offset: 1, // 추후 pagination 구현 시 사용 예정
          limit: 10,
        },
      })
    )
  }

  const enterRoom = (roomId: number, roomPw?: string) => {
    if (!socket) {
      alert('Socket이 비어있습니다.')
      return
    }
    console.log('enterRoom:', roomId, roomPw)
    socket.send(JSON.stringify({ eventType: 'ENTER_ROOM', data: { roomId, roomPw } }))
  }

  return { createWaitingRoom, enterRoom, getInitialRoomList, roomList }
}

// :: Chat
// 채팅과 관련된 처리를 담당하는 hook
export const useChat = () => {
  const { socket } = useMainSocketStore()
  const { setChatLogs, chatLogs } = useChatLogsStore()

  useEffect(() => {
    return () => {
      console.log('clean up chat logs!')
      setChatLogs([])
    }
  }, [])

  const sendChat = (message: string) => {
    if (!socket) {
      alert('Socket이 연결되어 있지 않습니다. in useChat.tsx')
      return
    }

    socket.send(JSON.stringify({ eventType: 'CHATTING', data: { message: message } }))
  }

  return { sendChat, chatLogs }
}

// :: Socket
// 대기방 관련 소켓 셋팅
export const useSetUpRoom = () => {
  const { setRoomList } = useWaitingRoomStore()
  const { setGameUserList } = useGameRoomStore()
  const router = useRouter()

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

  return { successCreateRoom, successGetRoomList, successEnterRoom }
}
// 채팅 관련 소켓 셋팅
export const useSetUpChat = () => {
  const { addChatLogs } = useChatLogsStore()

  const successReceiveChat = (message: string) => {
    console.log('Received message:', message)
    addChatLogs(message)
  }

  return { successReceiveChat }
}
// 소캣을 수행하는 함수를 리턴하는 커스텀 훅
export const useSocket = () => {
  const {
    socket,
    setSocket,
    isConnected,
    setConnectedStatus,
    removeSocket,
    reconnectAttempts,
    maxReconnectAttempts,
    setConnectAttempts,
  } = useMainSocketStore()
  // 소켓으로 데이터 처리
  const { successReceiveChat } = useSetUpChat()
  const { successGetRoomList, successCreateRoom, successEnterRoom } = useSetUpRoom()

  const connectSocket = async (region: string) => {
    // Todo : region을 사용하여 소켓 연결 예정
    console.log('소켓 연결에 region 반영 예정', region)

    const socketToken = await getSocketToken()
    localStorage.setItem('socketToken', socketToken)

    // WebSocket 생성 및 연결
    const url = `wss://dummy.mo-or-do.net/ws?Authorization=${socketToken}`
    const newSocket = new WebSocket(url)

    // 연결 성공
    newSocket.onopen = () => {
      console.log('Connected to WebSocket in useSocket.tsx')
      socket?.close() // 기존 소켓이 있으면 닫음
      setConnectAttempts(0) // 연결 성공 시 재연결 시도 횟수 초기화
      setConnectedStatus(true)
      setSocket(newSocket)
    }

    // 연결 종료
    newSocket.onclose = (event) => {
      // 의도치 않은 연결 종료 시 재연결 시도
      if (!event.wasClean && reconnectAttempts < maxReconnectAttempts) {
        console.log(`Connection lost, attempting to reconnect... (${reconnectAttempts + 1})`)
        // 재시도 횟수에 비례하여 지연 시간을 늘림 + 재시도
        let delay = Math.pow(2, reconnectAttempts) * 1000 // 지수 백오프 계산
        setTimeout(() => {
          if (reconnectAttempts < maxReconnectAttempts) {
            setConnectAttempts(reconnectAttempts + 1) // 연결 성공 시 재연결 시도 횟수 초기화
            connectSocket(region)
          }
        }, delay)
      }
      // 연결이 깨끗하게 종료되었거나 최대 재연결 횟수에 도달했을 때
      else {
        console.log('WebSocket closed: ', event)
        socket?.close() // 소켓이 있으면 닫음
        setConnectedStatus(false)
        removeSocket()
      }
    }

    // 핸들링 로직 처리
    newSocket.onmessage = (event) => {
      let responseData = undefined
      let eventType = undefined

      // Todo : 채팅 부분 응답 변경되면 try-catch 제거
      try {
        responseData = JSON.parse(event.data)
        eventType = parseInt(responseData.code)
      } catch (error) {
        console.log('socket 응답 데이터를 확인하세요.', error)
      }

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
          console.log('이벤트 코드가 없습니다. 현재는 채팅에 이벤트 코드가 없습니다.')
          break
      }
    }

    // 에러 발생
    newSocket.onerror = (error) => {
      console.log('WebSocket error:', error)
    }
  }

  return { connectSocket, isConnected, socket }
}
