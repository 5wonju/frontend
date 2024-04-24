import { getSocketToken } from './api'

// 중요 로직과 관련 없는 유틸리티 함수들을 관리하는 파일
export const connectSocketWithToken = async (connectSocketFn: (socketToken: string) => void) => {
	const socketToken = await getSocketToken()
	connectSocketFn(socketToken)
}
