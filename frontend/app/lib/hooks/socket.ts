import { useWaitingRoomStore } from '@/app/lobby/lib/store'
import { getSocketToken } from '../api'
import { useChatSocketStore, useGameSocketStore } from './../store'
import WaitingRoom from './../../lobby/ui/WaitingRoom'

// Todo: 이 코드는 작성 시(or 완료) util이나 services로 빼서 작성
// Todo : 게임 진행 중에 필요한 동작을 정의
// gameSocket에 필요한 설정을 수행하는 함수
export const useSetUpGameSocket = () => {
	const { gameSocket } = useGameSocketStore()
	const { setRoomList } = useWaitingRoomStore()

	if (!gameSocket) {
		alert('Socket이 비어있습니다.')
		return
	}

	gameSocket.onmessage = (event) => {
		const data = JSON.parse(event.data)
		switch (data.type) {
			case 'waiting_room':
				console.log('new room list!')
				setRoomList(data.roomList as WaitingRoom[])
				break
			default:
				break
		}
	}
}

// 소캣을 수행하는 함수를 리턴하는 커스텀 훅
export const useConnectSocket = (type: 'game' | 'chat') => {
	const {
		gameSocket,
		setGameSocket,
		removeGameSocket,
		reconnectAttempts: gameReconnectAttempts,
		maxReconnectAttempts: gameMaxReconnectAttempts,
		setConnectAttempts: setGameConnectAttempts,
	} = useGameSocketStore()

	const {
		chatSocket,
		setChatSocket,
		removeChatSocket,
		reconnectAttempts: chatReconnectAttempts,
		maxReconnectAttempts: chatMaxReconnectAttempts,
		setConnectAttempts: setChatConnectAttempts,
	} = useChatSocketStore()

	// 사용할 소켓 정보 설정
	const socket = type === 'game' ? gameSocket : chatSocket
	const setSocket = type === 'game' ? setGameSocket : setChatSocket
	const removeSocket = type === 'game' ? removeGameSocket : removeChatSocket
	const reconnectAttempts = type === 'game' ? gameReconnectAttempts : chatReconnectAttempts
	const maxReconnectAttempts = type === 'game' ? gameMaxReconnectAttempts : chatMaxReconnectAttempts
	const setConnectAttempts = type === 'game' ? setGameConnectAttempts : setChatConnectAttempts

	const connectSocket = async () => {
		const socketToken = await getSocketToken()

		// WebSocket 생성 및 연결
		const url = `wss://localhost:3000/socket`
		const newSocket = new WebSocket(url, [socketToken])

		// 연결 성공
		newSocket.onopen = () => {
			console.log('WebSocket connection established.')
			socket?.close() // 기존 소켓이 있으면 닫음
			setConnectAttempts(0) // 연결 성공 시 재연결 시도 횟수 초기화
			setSocket(socket)
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
						connectSocket()
					}
				}, delay)
			}
			// 연결이 깨끗하게 종료되었거나 최대 재연결 횟수에 도달했을 때
			else {
				console.log('WebSocket closed: ', event.reason)
				socket?.close() // 소켓이 있으면 닫음
				removeSocket()
			}
		}

		// 에러 발생
		newSocket.onerror = (error) => {
			console.log('WebSocket error:', error)
		}
	}

	return { useConnectSocket }
}
