import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ISocketState {
  socket: WebSocket | null
  isConnected: boolean
  region: string | null
  reconnectAttempts: number
  maxReconnectAttempts: number
  setSocket: (socket: WebSocket | null) => void
  setRegion: (region: string | null) => void
  connect: (region: string, socketToken: string) => void
  disconnect: () => void
  sendMessage: (eventType: string, message: string) => void
  messages: string[] // 메시지 배열
  addMessage: (message: string) => void // 메시지 추가 함수
  chatLogs: string[] // 채팅 로그 배열
  addChatLogs: (message: string) => void // 채팅 로그 추가 함수
}

export const useSocketStore = create<ISocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  region: null,
  reconnectAttempts: 0,
  maxReconnectAttempts: 5, // 최대 재연결 시도 횟수
  messages: [],
  chatLogs: [],
  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }))
  },
  sendMessage: (eventType: string, message: string) => {
    console.log('Sending message:', message)
    get().socket?.send(JSON.stringify({ eventType: eventType, data: { message: message } }))
  },
  setSocket: (socket) => {
    set({ socket })
  },
  setRegion: (region) => {
    set({ region })
  },
  connect: (region: string, socketToken: string) => {
    // const ws = new WebSocket(`wss://localhost:3000/ws/${region}?Authorization=${socketToken}`)
    // const ws = new WebSocket(`wss://localhost:8080/ws?Authorization=${socketToken}`)
    const ws = new WebSocket(`wss://dummy.mo-or-do.net/ws?Authorization=${socketToken}`)
    // const ws = new WebSocket(`ws://localhost:8080/ws`)

    ws.onopen = () => {
      console.log('Connected to WebSocket')
      set({ isConnected: true, reconnectAttempts: 0 })
    }
    ws.onclose = () => {
      console.log('Disconnected from WebSocket')
      set({ isConnected: false, socket: null })
      if (get().reconnectAttempts < get().maxReconnectAttempts) {
        let delay = Math.pow(2, get().reconnectAttempts) * 1000 // 지수 백오프 계산
        setTimeout(() => {
          if (get().reconnectAttempts < get().maxReconnectAttempts) {
            set((state) => ({ reconnectAttempts: state.reconnectAttempts + 1 }))
            get().connect(region, socketToken)
          }
        }, delay)
      }
    }
    ws.onmessage = (event) => {
      console.log('Received message:', event.data)
      // TODO: event.data를 파싱하여 채팅 로그에 추가하는 로직 필요
      get().addChatLogs(event.data)
      // get().addMessage(event.data)
    }
    set({ socket: ws, region })
  },
  addChatLogs: (message) => {
    // TODO: sender 받아서 IChat으로 바꿀 것
    set((state) => ({ chatLogs: [...state.chatLogs, message] }))
    const maxLenth = 3
    if (get().chatLogs.length > maxLenth) {
      set((state) => ({ chatLogs: state.chatLogs.slice(-1 * maxLenth) }))
    }
    console.log(get().chatLogs)
  },
  disconnect: () => {
    get().socket?.close()
    set({ isConnected: false, socket: null, reconnectAttempts: 0 })
  },
}))

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

// Todo : Chat은 sender 포함한 형식으로 변경 필요(API 문서 참고)
interface IChat {
  nickname: string
  message: string
  timestamp: string
}

interface IChatLogsState {
  chatLogs: string[]
  setChatLogs: (chatLogs: string[]) => void
  addChatLogs: (message: string) => void
}

export const useChatLogsStore = create<IChatLogsState>()(
  devtools((set, get) => ({
    chatLogs: [],
    setChatLogs: (chatLogs) => {
      set({ chatLogs })
    },
    addChatLogs: (message) => {
      set((state) => ({ chatLogs: [...state.chatLogs, message] }))
      const maxLenth = 3
      if (get().chatLogs.length > maxLenth) {
        set((state) => ({ chatLogs: state.chatLogs.slice(-1 * maxLenth) }))
      }
      console.log(get().chatLogs)
    },
  }))
)
