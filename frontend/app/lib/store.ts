import { Socket, io } from 'socket.io-client'
import create, { StateCreator, StoreApi } from 'zustand'
import { devtools } from 'zustand/middleware'

interface GameSocket {
	gameSocket: Socket | null
	setGameSocket: (socket: Socket) => void
	removeGameSocket: () => void
}

export const useGameSocketStore = create<GameSocket>()(
	devtools(
		(set) => ({
			gameSocket: null, // 초기 소켓 상태는 null
			setGameSocket: (socket: Socket) => {
				set({ gameSocket: socket })
			},
			removeGameSocket: () => {
				set((state) => {
					return { gameSocket: null }
				})
			},
		}),
		{ name: 'GameSocketStore' } // Redux DevTools에서 볼 수 있는 스토어의 이름
	)
)
export default useGameSocketStore
