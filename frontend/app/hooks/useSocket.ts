import { useEffect } from 'react'
import { getSocketToken } from '../lib/api'
import { useWaitingRoomStore } from '../(page)/(needProtection)/lobby/lib/store'
import { IChat, useChatLogsStore, useMainSocketStore } from '../lib/store'
import { AnswerEnum, teamEnum } from '../(page)/(needProtection)/game/lib/store-type'
import { IRoomInfo } from '../(page)/(needProtection)/lobby/lib/type'
import { useAuth } from './useAuth'
import { useGameRoomStore } from '../(page)/(needProtection)/game/lib/store'

// :: Waiting Room
// 대기방과 관련된 처리를 담당하는 hook
const useWaitingRoom = () => {
  const { socket } = useMainSocketStore()
  const { roomList } = useWaitingRoomStore()

  const createWaitingRoom = (roomInfo: IRoomInfo) => {
    if (!socket) {
      alert('Socket이 비어있습니다.')
      return
    }
    console.log('createWaitingRoom:', roomInfo)
    socket.send(JSON.stringify({ eventType: 'CREATE_ROOM', data: roomInfo }))
  }

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

  return {
    createWaitingRoom,
    enterRoom,
    getInitialRoomList,
    roomList,
  }
}

const useGame = () => {
  const { socket } = useMainSocketStore()
  const { userInfo } = useAuth()
  const { gameUserList } = useGameRoomStore()

  const exitRoom = () => {
    if (!socket) {
      alert('Socket이 비어있습니다.')
      return
    }
    console.log('exitRoom:')
    socket.send(JSON.stringify({ eventType: 'EXIT_ROOM' }))
  }

  const editRoom = (roomInfo: IRoomInfo) => {
    if (!socket) {
      alert('Socket이 비어있습니다.')
      return
    }
    console.log('editRoom:', roomInfo)
    socket.send(JSON.stringify({ eventType: 'UPDATE_ROOM_INFO', data: roomInfo }))
  }

  const selectTeam = (team: teamEnum) => {
    if (!socket) {
      console.log('Socket이 비어있습니다.')
      return
    }
    const { nickname } = userInfo

    console.log('------selectTeam:', team, nickname)
    socket.send(
      JSON.stringify({
        eventType: 'TEAM_SELECT',
        data: { team: team, nickname: nickname },
      })
    )
  }

  const getRoomInfo = (roomId: number) => {
    if (!socket) {
      console.log('소켓이 비었어')
      return
    }

    socket.send(JSON.stringify({ eventType: 'SEARCH_ROOM_BY_ID', data: { roomId } }))
  }

  const startGame = () => {
    if (!socket) {
      console.log('소켓이 비었어')
      return
    }

    socket.send(JSON.stringify({ eventType: 'START_GAME' }))
  }

  const selectAnswer = (answer: AnswerEnum) => {
    if (!socket) {
      console.log('소켓이 비었어')
      return
    }

    const myInfo = gameUserList?.find((user) => user.userNickname === userInfo.nickname)
    const data = {
      pos: {
        x: myInfo?.position.x,
        y: myInfo?.position.y,
        z: myInfo?.position.z,
      },
      linvel: {
        x: myInfo?.linvel.x,
        y: myInfo?.linvel.y,
        z: myInfo?.linvel.z,
      },
      moveState: myInfo?.moveState,
      characterType: myInfo?.characterType,
      direction: myInfo?.direction,
      zone: answer,
    }
    socket.send(JSON.stringify({ eventType: 'CHANGE_ZONE', data: data }))
  }

  return { selectTeam, getRoomInfo, editRoom, exitRoom, startGame, selectAnswer }
}

// :: Chat
// 채팅과 관련된 처리를 담당하는 hook
const useChat = () => {
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

    console.log('보내지는 채팅', message)
    socket.send(JSON.stringify({ eventType: 'CHATTING', data: { message: message } }))
  }

  return { sendChat, chatLogs }
}

// :: Socket
// - 소켓 연결 및 종료 처리를 담당
const useSocket = () => {
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

    // 에러 발생
    newSocket.onerror = (error) => {
      console.log('WebSocket error:', error)
    }
  }

  return { connectSocket, isConnected, socket }
}

export { useWaitingRoom, useGame, useChat, useSocket }
