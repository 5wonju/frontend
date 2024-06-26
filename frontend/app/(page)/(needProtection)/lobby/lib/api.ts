import { tokenInstance } from '@/app/axios'
import { onGameUserInfo } from '@/app/lib/type'

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
  // 	`${process.env.NEXT_PUBLIC_BASE_URL}/games/rooms/${roomId}`, {roomPW: password ?? null}
  // 	{
  // 		withCredentials: true,
  // 		headers: {
  // 			'Content-Type': 'application/json',
  // 		},
  // 	}
  // )
  return enterRoomRes.data
}

// 소켓 통신을 위한 소켓 전용 토큰을 받아오는 함수
export const getSocketToken = async (): Promise<string> => {
  const socketTokenRes = await tokenInstance.get('games/socket-token')
  if (socketTokenRes.status === 200) {
    return socketTokenRes.data
  } else {
    throw new Error('Failed to fetch socket token')
  }
}
