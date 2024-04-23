import { postEnterRoom } from '../api'
import { canEnterRoom } from '../util'

// 1. api를 통해서 옳바른 방입장인지 확인
// 2. socket 연결을 통해서 방과 connect -> 아마 hook으로 작성될 것
export const enterRoom = async (
	room: Room,
	password?: string
): Promise<onGameUserInfo[] | null> => {
	if (!canEnterRoom(room)) {
		return null
	}

	// 성공하면 소켓 연결 및 방정보 리턴, 실패하면 alert
	try {
		const enterRoomRes = await postEnterRoom(room.roomId, password)
		return enterRoomRes.data
	} catch (error) {
		alert(error)
		return null
	}
}
