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
