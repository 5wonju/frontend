import { tokenInstance } from '@/app/axios'
import axios from 'axios'

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

export const getChannelData = async (accessToken?: string): Promise<IChannelData[]> => {
	try {
		if (accessToken === undefined) throw new Error('accessToken is undefined')

		const response = await axios.get('http://localhost:3000/api/channel', {
			headers: {
				Cookie: `access-token=${accessToken}`,
			},
		})
		console.log(response)

		return response.data // axios의 응답 데이터는 data 속성에 저장됩니다.
	} catch (error) {
		console.error(error)
		throw error
	}
}
