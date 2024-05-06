import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface GameSocket {
  gameSocket: WebSocket | null
  setGameSocket: (socket: WebSocket | null) => void
  removeGameSocket: () => void
  reconnectAttempts: number // 현재 재연결 시도 횟수
  maxReconnectAttempts: number // 최대 재연결 시도 횟수
  setConnectAttempts: (attempts: number) => void
}

export const useGameSocketStore = create<GameSocket>()(
  devtools(
    (set, get) => ({
      gameSocket: null, // 초기 소켓 상태는 null
      reconnectAttempts: 0,
      maxReconnectAttempts: 5,
      setGameSocket: (socket: WebSocket | null) => {
        set((state) => {
          state.gameSocket?.close() // 기존 소켓이 있으면 닫고 새로운 소켓으로 교체
          return { gameSocket: socket }
        })
      },
      removeGameSocket: () => {
        set((state) => {
          state.gameSocket?.close() // 소켓이 있으면 닫음
          return { gameSocket: null }
        })
      },
      setConnectAttempts: (attempts: number) => {
        set({ reconnectAttempts: attempts })
      },
    }),
    { name: 'GameSocketStore' } // Redux DevTools에서 볼 수 있는 스토어의 이름
  )
)

interface ChatSocket {
  chatSocket: WebSocket | null
  setChatSocket: (socket: WebSocket | null) => void
  removeChatSocket: () => void
  reconnectAttempts: number // 현재 재연결 시도 횟수
  maxReconnectAttempts: number // 최대 재연결 시도 횟수
  setConnectAttempts: (attempts: number) => void
}

export const useChatSocketStore = create<ChatSocket>()(
  devtools(
    (set, get) => ({
      chatSocket: null, // 초기 소켓 상태는 null
      reconnectAttempts: 0,
      maxReconnectAttempts: 5,
      setChatSocket: (socket: WebSocket | null) => {
        set((state) => {
          state.chatSocket?.close() // 기존 소켓이 있으면 닫고 새로운 소켓으로 교체
          return { chatSocket: socket }
        })
      },
      removeChatSocket: () => {
        set((state) => {
          state.chatSocket?.close() // 소켓이 있으면 닫음
          return { chatSocket: null }
        })
      },
      setConnectAttempts: (attempts: number) => {
        set({ reconnectAttempts: attempts })
      },
    }),
    { name: 'ChatSocketStore' } // Redux DevTools에서 볼 수 있는 스토어의 이름
  )
)
