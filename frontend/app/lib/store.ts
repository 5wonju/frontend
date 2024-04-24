import { Socket, io } from 'socket.io-client'
import create, { StateCreator, StoreApi } from 'zustand'
import { devtools } from 'zustand/middleware'

interface GameSocket {
	gameSocket: Socket | null
	connectGameSocket: (socketToken: string) => void
	disconnectGameSocket: () => void
}

export const useGameSocketStore = create<GameSocket>()(
	devtools(
		(set) => ({
			gameSocket: null, // 초기 소켓 상태는 null
			connectGameSocket: (socketToken: string) => {
				const socket = io('http://your-server.com', {
					autoConnect: false,
					reconnectionAttempts: 5, // 최대 재연결 시도 횟수
					reconnectionDelay: 3000, // 재연결 시도 간격
					auth: {
						token: socketToken, // 인증을 위한 임시 토큰을 포함하여 소켓 연결
					},
				})

				socket.connect() // autoConnect가 false로 설정되어 있으므로 수동으로 연결

				socket.on('connect', () => {
					console.log('소켓 연결됨:', socket.id)
					set({ gameSocket: socket })
				})

				socket.on('disconnect', (reason) => {
					if (reason === 'io server disconnect') {
						socket.connect()
					}
					console.log('소켓 연결 끊김:', reason)
					set({ gameSocket: null })
				})
			},
			disconnectGameSocket: () => {
				set((state) => {
					state.gameSocket?.disconnect()
					return { gameSocket: null }
				})
			},
		}),
		{ name: 'GameSocketStore' } // Redux DevTools에서 볼 수 있는 스토어의 이름
	)
)
export default useGameSocketStore
