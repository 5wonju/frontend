import { tokenInstance } from '@/app/axios'

type onGameUserInfo = {
	userNickname: string
	userCoordX: number
	userCoordY: number
	userTeam: '' | 'red' | 'blue'
	winRate: number
	escapeHistory: number
	winCnt: number
}

interface EnterRoomRes {
	msg: string
	data: onGameUserInfo[]
}

interface EnterRoomError {
	error: {
		msg: string
		status: number
	}
}

// Todo : 함수 반환 타입 실제 api와 테스트 필요
// Todo : 실패할 경우 경우에 따라서 axios 실패 처리 함수 수정
export const postEnterRoom = async (roomId: number, password?: string): Promise<EnterRoomRes> => {
	const enterRoomRes = await tokenInstance.post(`games/rooms/${roomId}`, {
		roomPW: password ?? null,
	})
	// const enterRoomRes = await axios.get(
	// 	`${process.env.NEXT_PUBLIC_BASE_URL}/games/rooms/${roomId}`,
	// 	{
	// 		withCredentials: true,
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	}
	// )
	return enterRoomRes.data
}
