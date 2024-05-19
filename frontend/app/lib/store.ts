import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// :: Socket Refactoring
// 1. mainSocket으로 chatting으로 사용하고 있는 소켓 변경
// 2. chatLogs 부분을 분리해서 적용
interface MainSocket {
  socket: WebSocket | null
  setSocket: (socket: WebSocket | null) => void
  isConnected: boolean
  setConnectedStatus: (status: boolean) => void
  removeSocket: () => void
  reconnectAttempts: number // 현재 재연결 시도 횟수
  maxReconnectAttempts: number // 최대 재연결 시도 횟수
  setConnectAttempts: (attempts: number) => void
}

export const useMainSocketStore = create<MainSocket>()(
  devtools(
    (set, get) => ({
      socket: null, // 초기 소켓 상태는 null
      isConnected: false,
      setConnectedStatus: (status: boolean) => {
        set({ isConnected: status })
      },
      reconnectAttempts: 0,
      maxReconnectAttempts: 5,
      setSocket: (socket: WebSocket | null) => {
        set((state) => {
          state.socket?.close() // 기존 소켓이 있으면 닫고 새로운 소켓으로 교체
          return { socket: socket }
        })
      },
      removeSocket: () => {
        set((state) => {
          state.socket?.close() // 소켓이 있으면 닫음
          return { socket: null }
        })
      },
      setConnectAttempts: (attempts: number) => {
        set({ reconnectAttempts: attempts })
      },
    }),
    { name: 'SocketStore' } // Redux DevTools에서 볼 수 있는 스토어의 이름
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

// Todo : Chat은 sender 포함한 형식으로 변경 필요(API 문서 참고)
export interface IChat {
  nickname: string
  message: string
  timeStamp: string
}

interface IChatLogsState {
  chatLogs: IChat[]
  setChatLogs: (chatLogs: IChat[]) => void
  addChatLogs: (message: IChat) => void
}

export const useChatLogsStore = create<IChatLogsState>()(
  devtools((set, get) => ({
    chatLogs: [],
    setChatLogs: (chatLogs: IChat[]) => {
      set({ chatLogs })
    },
    addChatLogs: (message: IChat) => {
      set((state) => ({ chatLogs: [...state.chatLogs, message] }))
      const maxLenth = 100
      if (get().chatLogs.length > maxLenth) {
        set((state) => ({ chatLogs: state.chatLogs.slice(-1 * maxLenth) }))
      }
      console.log(get().chatLogs)
    },
  }))
)

interface IAudioPlayState {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
}

export const useAudioPlayStore = create<IAudioPlayState>()(
  devtools((set, get) => ({
    isPlaying: false,
    setIsPlaying: (isPlaying: boolean) => {
      set({ isPlaying })
    },
  }))
)
