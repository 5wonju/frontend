import { tokenInstance } from '@/app/axios'

export const getSocketToken = async () => {
	try {
		const response = await tokenInstance.get('/api/socketToken')
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const connectServerSocket = async (region: string, socketToken: string) => {
	const ws = new WebSocket(`wss://yourdomain.com/ws/${region}`, [socketToken])
	return ws
}

export const getChannelData = async (): Promise<IChannelData[]> => {
	try {
		const response = await fetch('http://localhost:3000/api/channel')
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
		throw error
	}
}
