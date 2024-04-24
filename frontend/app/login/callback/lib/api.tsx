import { instance } from '@/app/axios'

export const handleLogin = async ({ code, state }: { code: string; state: string }) => {
	try {
		const response = await instance.post('/api/login', { code: code, state: state })
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}
