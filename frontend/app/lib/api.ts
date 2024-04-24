import { tokenInstance } from '../axios'

// api api 관련 함수를 관리하는 파일
export const getSocketToken = async (): Promise<string> => {
	const socketTokenRes = await tokenInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/socket/token`)
	return socketTokenRes.data
}
