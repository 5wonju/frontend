// api api 관련 함수를 관리하는 파일

import { tokenInstance } from '../axios'

export const verifyToken = async () => {
	try {
		const response = await tokenInstance.get('/api/verifyToken')
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const handleLogout = async () => {
	try {
		await tokenInstance.get('/api/logout')
	} catch (error) {
		console.error(error)
		throw error
	}
}
