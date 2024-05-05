import { useEffect } from 'react'
import { useWaitingRoomStore } from '../(page)/lobby/lib/store'
import { getSocketToken } from '../lib/api'
import { useChatSocketStore, useGameSocketStore } from '../lib/store'
import { useChatLogsStore, useMainSocketStore } from '../(page)/channel/lib/store'

// :: Setting Waiting Room
// Todo: 이 코드는 작성 시(or 완료) util이나 services로 빼서 작성
// Todo : 게임 진행 중에 필요한 동작을 정의
// gameSocket에 필요한 설정을 수행하는 함수
// export const useSetUpWaitingRoom = (socket: WebSocket | null) => {
//   // const { gameSocket } = useGameSocketStore()
//   const { setRoomList } = useWaitingRoomStore()

//   useEffect(() => {
//     return () => {
//       console.log('clean up waiting room list!')
//       setRoomList([])
//     }
//   }, [])

//   if (!socket) {
//     alert('Socket이 비어있습니다.')
//     return
//   }

//   socket.onmessage = (event) => {
//     const data = JSON.parse(event.data)
//     switch (data.type) {
//       case 'waiting_room':
//         console.log('new room list!')
//         setRoomList(data.roomList as WaitingRoom[])
//         break
//       default:
//         break
//     }
//   }

//   const setWaitingRoomSettings = (roomList: WaitingRoom[]) => {
//     setRoomList(roomList as WaitingRoom[])
//   }

//   return { setWaitingRoomSettings }
// }

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
// 소켓 관련 채팅 셋팅
export const useSetUpChat = () => {
  const { addChatLogs } = useChatLogsStore()

  const receiveChat = (message: string) => {
    console.log('Received message:', message)
    addChatLogs(message)
  }

  return { receiveChat }
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
  const { receiveChat } = useSetUpChat()

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
        console.log('WebSocket closed: ', event.reason)
        socket?.close() // 소켓이 있으면 닫음
        setConnectedStatus(false)
        removeSocket()
      }
    }

    // 핸들링 로직 처리
    newSocket.onmessage = (event) => {
      switch (event.type) {
        case 'message':
          console.log('new chat!')
          receiveChat(event.data)
          break
        default:
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
