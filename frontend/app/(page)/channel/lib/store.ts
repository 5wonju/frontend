import { create } from 'zustand'

interface SocketState {
	socket: WebSocket | null
	isConnected: boolean
	region: string | null
	reconnectAttempts: number
	maxReconnectAttempts: number
	setSocket: (socket: WebSocket | null) => void
	setRegion: (region: string | null) => void
	connect: (region: string, socketToken: string) => void
	disconnect: () => void
	sendMessage: (message: string) => void
	messages: string[] // 메시지 배열
	addMessage: (message: string) => void // 메시지 추가 함수
}

export const useSocketStore = create<SocketState>((set, get) => ({
	socket: null,
	isConnected: false,
	region: null,
	reconnectAttempts: 0,
	maxReconnectAttempts: 5, // 최대 재연결 시도 횟수
	messages: [],
	addMessage: (message) => {
		set((state) => ({ messages: [...state.messages, message] }))
	},
	sendMessage: (message: string) => {
		get().socket?.send(message)
	},
	setSocket: (socket) => {
		set({ socket })
	},
	setRegion: (region) => {
		set({ region })
	},
	connect: (region: string, socketToken: string) => {
		const ws = new WebSocket(`wss://localhost:3000/ws/${region}`, [socketToken])
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
			get().addMessage(event.data)
		}
		set({ socket: ws, region })
	},
	disconnect: () => {
		get().socket?.close()
		set({ isConnected: false, socket: null, reconnectAttempts: 0 })
	},
}))
