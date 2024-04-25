import { Socket, io } from 'socket.io-client'
import { getSocketToken } from './api'
import useGameSocketStore from './store'

export const createSocket = (socketToken: string) => {
	const socket = io('http://your-server.com', {
		autoConnect: false,
		reconnectionAttempts: 5, // 최대 재연결 시도 횟수
		reconnectionDelay: 3000, // 재연결 시도 간격
		auth: {
			token: socketToken, // 인증을 위한 임시 토큰을 포함하여 소켓 연결
		},
	})

	return socket
}

// 중요 로직과 관련 없는 유틸리티 함수들을 관리하는 파일
export const connectSocketWithToken = async () => {
	const socketToken = await getSocketToken()
	const newSocket = createSocket(socketToken)
	newSocket.connect() // autoConnect가 false로 설정되어 있으므로 수동으로 연결
}

export const disconnectSocket = (connectedSocket: Socket, removeSocket: () => void) => {
	connectedSocket?.disconnect()
	removeSocket()
}

// 생성된 소켓에 대한 초기 설정을 하는 함수
export const useSocketInitialSetting = (socket: Socket) => {
	const { setGameSocket, removeGameSocket } = useGameSocketStore()

	socket.on('connect', () => {
		console.log('소켓 연결됨:', socket.id)
		setGameSocket(socket)
	})

	socket.on('disconnect', (reason) => {
		if (reason === 'io server disconnect') {
			socket.connect()
		}
		console.log('소켓 연결 끊김:', reason)
		removeGameSocket()
	})
}
